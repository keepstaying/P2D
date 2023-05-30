// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./VicToken.sol";
import "./VicProposal.sol";

contract VicDAO {
    using SafeMath for uint256;

    uint256 public constant MIN_QUALIFICATION_LIMIT = 20000;
    uint256 public constant MAX_VOTE_DIVIDEND = 25; // 最大分红比例为 25%
    uint256 public constant BURN_RATE = 3; // 代币销毁比例为 3%

    VicToken public token;
    VicProposal public proposal;

    struct Member {
        uint8 status; // 0=非成员，1=普通成员，2=管理员
        uint256 pledgeAmount;
        uint256 pledgeStartTime;
        uint256 pledgeUnlockTime;
    }

    struct Receipt {
        uint256 startTime;
        uint256 unlockTime;
        uint256 amount;
        bool processed;
    }

    mapping(address => Member) public members;
    mapping(address => uint256) public vevicBalance;
    mapping(address => uint256) public vevicUpdateTime;
    mapping(address => Receipt[]) public receiptTable;

    event MemberPledged(address member, uint256 amount, uint256 unlockTime);
    event MemberUnlocked(address member, uint256 amount);
    event MemberApproved(address member);
    event MemberRemoved(address member);

    constructor(address _token, address _proposal) {
        token = VicToken(_token);
        proposal = VicProposal(_proposal);
    }

    function pledge(uint256 _amount, uint256 _unlockTime) public {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            token.balanceOf(msg.sender) >= _amount,
            "The user doesn't have enough tokens"
        );
        require(
            _unlockTime >= block.timestamp,
            "The unlock time must be greater than or equal to the current time"
        );
        require(
            _unlockTime <= block.timestamp + 4 * 365 days,
            "The unlock time can't be more than 4 years in the future"
        );

        Member storage member = members[msg.sender];

        if (member.status == 0) {
            member.status = 1;
            emit MemberApproved(msg.sender);
        }
        uint256 amount = _amount * (_unlockTime-block.timestamp);

        member.pledgeAmount += amount;
        member.pledgeStartTime = block.timestamp;
        member.pledgeUnlockTime = _unlockTime;

        token.transferFrom(msg.sender, address(this), _amount);

        emit MemberPledged(msg.sender, _amount, _unlockTime);

        Receipt memory receipt = Receipt({
            startTime: block.timestamp,
            unlockTime: _unlockTime,
            amount: _amount,
            processed: true
        });

        receiptTable[msg.sender].push(receipt);
    }

    function unlock(uint256 _index) public {
        Receipt storage receipt = receiptTable[msg.sender][_index];
        require(
            receipt.processed && block.timestamp >= receipt.unlockTime,
            "The receipt can't be unlocked yet"
        );

        memberBalanceOf(msg.sender); // 更新余额

        receipt.processed = false;

        vevicBalance[msg.sender] -= receipt.amount;
        token.transfer(msg.sender, receipt.amount);

        emit MemberUnlocked(msg.sender, receipt.amount);
    }

    function memberBalanceOf(address _member) public view returns (uint256) {
        Member memory member = members[_member];
        if (member.pledgeAmount == 0) {
            return 0;
        }
        uint256 burnAmount = (block.timestamp - member.pledgeStartTime)
            .mul(member.pledgeAmount)
            .mul(BURN_RATE)
            .div(365 days)
            .div(100);
        if (member.pledgeAmount <= burnAmount) {
            return 0;
        }
        uint256 balance = member.pledgeAmount - burnAmount;
        return balance;
    }

    function burnForMember(address _member) public {
        uint256 balance = memberBalanceOf(_member);
        require(balance == 0, "The member still has pledged tokens");

        members[_member].status = 0;

        emit MemberRemoved(_member);
    }

    function daoMemberVote(uint256 _proposalId, bool _voteType) public {
        uint8 memberType = members[msg.sender].status;
        require(memberType == 1 || memberType == 2);
        require(memberBalanceOf(msg.sender)>0;)
        proposal.vote(_proposalId, _voteType);
    }
}
