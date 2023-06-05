// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "../VicToken.sol";
// import "../VicProposal.sol";

// interface IVicProposal {
//     function createProposal(
//         uint256 _duration,
//         address _nftAddress,
//         uint256 _nftId,
//         uint256 _price,
//         uint256 _repaytime
//     ) external returns (uint256);

//     function vote(uint256 _proposalId, VicProposal.VoteType _voteType) external;

//     function clearHasVoted() external;

//     function repay(uint256 _proposalId) external;
// }
