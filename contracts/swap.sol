// SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract uniswap {
    address private tokenB;
    address private tokenA = address(0);

    //流动性总量 k
    uint totalLiquidity = 0;

    //总手续费
    uint totalfee = 0;

    constructor(address _tokenB) {
        require(_tokenB != address(0));
        tokenB = _tokenB;
    }

    //流动性注入者的流动性
    mapping(address => uint) userLiquidity;
    //不同代币的含量
    mapping(address => uint) tokenContent;

    //增加流动性
    function addLiquidity(uint256 amountB) external payable {
        console.log(0);
        require(amountB != 0);
        uint256 myEth = msg.value;
        console.log(12);
        //若是首次注入则不需考虑按比例注入 后续注入则均需考虑
        if (totalLiquidity != 0) {
            require(
                myEth / amountB == tokenContent[tokenA] / tokenContent[tokenB],
                "The request does not meet the requirements"
            );
        }
        console.log(13);
        _addLiquidity(msg.sender, myEth, amountB);
    }

    function _addLiquidity(
        address _user,
        uint256 amountA,
        uint256 amountB
    ) internal {
        console.log(1);
        totalLiquidity += amountA * amountB;
        userLiquidity[_user] += amountA * amountB;
        tokenContent[tokenA] += amountA;
        tokenContent[tokenB] += amountB;

        // ERC20 tfA = ERC20(tokenA);
        // tfA.transferFrom(_user, address(this), amountA);

        ERC20 tfB = ERC20(tokenB);
        tfB.transferFrom(_user, address(this), amountB);
    }

    //移出流动性
    function removeLiquidity(uint256 amountA, uint256 amountB) external {
        require(
            amountA / amountB == tokenContent[tokenA] / tokenContent[tokenB],
            "The request does not meet the requirements"
        );
        require(
            userLiquidity[msg.sender] >= amountA * amountB,
            "Insufficient balance"
        );
        _removeLiquidity(payable(msg.sender), amountA, amountB);
    }

    function _removeLiquidity(
        address payable _user,
        uint256 amountA,
        uint256 amountB
    ) internal {
        uint getfee = totalfee * (userLiquidity[_user] / totalLiquidity);

        totalLiquidity -= amountA * amountB;
        userLiquidity[_user] -= amountA * amountB;
        tokenContent[tokenA] -= amountA;
        tokenContent[tokenB] -= amountB;

        // ERC20 tfA = ERC20(tokenA);
        // tfA.transfer(_user, amountA);
        _user.call{value: amountA}("");

        ERC20 tfB = ERC20(tokenB);
        tfB.transfer(_user, amountB);

        if (tokenContent[tokenA] > tokenContent[tokenB]) {
            tfB.transfer(_user, getfee);
        } else {
            _user.call{value: amountA}("");
        }

        totalfee -= getfee;
    }

    //用A交易B
    function AtoB_token() external payable {
        uint256 myEth = msg.value;
        _AtoB_token(payable(msg.sender), myEth);
    }

    function _AtoB_token(address payable _user, uint256 inAmountA) internal {
        uint256 newAmountA = tokenContent[tokenA] + inAmountA;
        uint256 newAmountB = totalLiquidity / newAmountA;
        uint256 outAmountB = tokenContent[tokenB] - newAmountB;

        uint256 tempfee = (outAmountB * 3) / 1000;

        totalfee += tempfee;

        require(
            tokenContent[tokenB] >= outAmountB,
            "The target token balance is insufficient"
        );

        tokenContent[tokenA] += inAmountA;
        tokenContent[tokenB] -= outAmountB;

        // ERC20 tfA = ERC20(tokenA);
        // tfA.transferFrom(_user, address(this), inAmountA);
        // _user.transfer(address())

        ERC20 tfB = ERC20(tokenB);
        tfB.transfer(_user, outAmountB - tempfee);
    }

    //用B交易A
    function BtoA_token(uint256 inAmountB) external {
        _BtoA_token(payable(msg.sender), inAmountB);
    }

    function _BtoA_token(address payable _user, uint256 inAmountB) internal {
        uint256 newAmountB = tokenContent[tokenB] + inAmountB;
        uint256 newAmountA = totalLiquidity / newAmountB;
        uint256 outAmountA = tokenContent[tokenA] - newAmountA;

        uint256 tempfee = (outAmountA * 3) / 1000;

        totalfee += tempfee;

        require(
            tokenContent[tokenA] >= outAmountA,
            "The target token balance is insufficient"
        );

        tokenContent[tokenB] += inAmountB;
        tokenContent[tokenA] -= outAmountA;

        ERC20 tfB = ERC20(tokenB);
        tfB.transferFrom(_user, address(this), inAmountB);

        // ERC20 tfA = ERC20(tokenA);
        // tfA.transfer(_user, outAmountA - tempfee);
        _user.call{value: outAmountA - tempfee}("");
    }

    // //获得aTob汇率
    // function getAtoBExchangeRate() view external returns (uint256) {
    //     return tokenContent[tokenA] / tokenContent[tokenB];
    // }

    // //获得bToa汇率
    // function getBtoAExchangeRate() view external returns (uint256) {
    //     return tokenContent[tokenB] / tokenContent[tokenA];
    // }

    // //获得注入流动性时的比例
    // function getLiquidityRatio() view external returns (uint256) {
    //     return tokenContent[tokenA] / tokenContent[tokenB];
    // }
}
