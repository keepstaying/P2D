// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "./VicToken.sol";

contract VicProposal {
    using SafeMath for uint256;

    enum ProposalStatus {
        Open,
        Approved,
        Rejected
    }

    struct Proposal {
        address creator; //提案创建者也就是NFT拥有者
        address nftAddress; //NFT地址
        uint256 nftId; //NFTID
        uint256 price; //预期的价格
        uint256 startTime; //提案开始时间
        uint256 endTime; //提案结束时间
        uint256 totalAgreeVotes; //所有同意的票数
        uint256 totalDisagreeVotes; //所有拒绝的票数
        address[] votes; //所有的投票数
        uint256 repayTime; //需要偿还的时间
        ProposalStatus status; //提案状态
    }

    uint256 public constant MAX_VOTE_PERCENTAGE = 51; // 最大投票比例为 51%
    uint256 public constant MIN_VOTE_PERCENTAGE = 30; // 最小投票比例为 30%
    uint256 public constant MIN_VOTE_DURATION = 3 days; // 最短投票时间为 3 天
    uint256 public constant MAX_VOTE_DURATION = 30 days; // 最长投票时间为 30 天

    VicToken public token;

    Proposal[] public proposals;

    mapping(address => bool) public hasVoted;

    event ProposalCreated(
        uint256 proposalId,
        address creator,
        uint256 price,
        uint256 startTime,
        uint256 endTime
    );
    event ProposalApproved(uint256 proposalId);
    event ProposalRejected(uint256 proposalId);

    constructor(address _token) {
        token = VicToken(_token);
    }

    function createProposal(
        uint256 _duration,
        address _nftAddress,
        uint256 _nftId,
        uint256 _price,
        uint256 _repayTime
    ) public returns (uint256) {
        require(
            _duration >= MIN_VOTE_DURATION,
            "Vote duration is less than the minimum"
        );
        require(
            _duration <= MAX_VOTE_DURATION,
            "Vote duration exceeds the maximum"
        );
        require(_price > 0, "Required price must be greater than 0");

        IERC20 nft = IERC20(_nftAddress);

        nft.transfer(address(this), _nftId);

        uint256 proposalId = proposals.length;

        Proposal memory proposal = Proposal({
            creator: msg.sender,
            price: _price,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            nftAddress: _nftAddress,
            nftId: _nftId,
            totalDisagreeVotes: 0,
            totalAgreeVotes: 0,
            votes: new address[](10), // 假设最多只有 10 个投票,
            repayTime: _repayTime,
            status: ProposalStatus.Open
        });

        proposals.push(proposal);

        emit ProposalCreated(
            proposalId,
            msg.sender,
            _price,
            block.timestamp,
            proposal.endTime
        );

        return proposalId;
    }

    function vote(uint256 _proposalId, bool voteType) public {
        Proposal storage proposal = proposals[_proposalId];

        require(
            proposal.status == ProposalStatus.Open,
            "The proposal is not open for voting"
        );
        require(!hasVoted[msg.sender], "The voter had voted in this proposal");

        hasVoted[msg.sender] = true;

        if (voteType == true) {
            proposal.totalAgreeVotes += 1;
        } else if (voteType == false) {
            proposal.totalDisagreeVotes += 1;
        }

        proposal.votes.push(msg.sender);

        uint256 totalVotes = proposal.totalAgreeVotes +
            proposal.totalDisagreeVotes;

        address lender = proposals[_proposalId].creator;
        uint256 price = proposals[_proposalId].price;

        if (block.timestamp >= proposal.endTime || totalVotes == 10) {
            if (proposal.totalDisagreeVotes < proposal.totalAgreeVotes) {
                proposal.status = ProposalStatus.Approved;
                token.transfer(lender, price);
                emit ProposalApproved(_proposalId);
            } else {
                proposal.status = ProposalStatus.Rejected;
                emit ProposalRejected(_proposalId);
            }
        }
    }

    function clearHasVoted() public {
        delete hasVoted[msg.sender];
    }

    function repay(uint256 _proposalId) public {
        uint256 proposalRepayTime = proposals[_proposalId].repayTime;
        require(proposalRepayTime >= block.timestamp);
        uint256 repayPrice = proposals[_proposalId].price;
        address nftAddress = proposals[_proposalId].nftAddress;
        require(token.balanceOf(msg.sender) >= repayPrice);

        token.transfer(address(this), repayPrice);

        IERC721 nft = IERC721(nftAddress);
        uint256 tokenId = proposals[_proposalId].nftId;
        nft.approve(address(this), tokenId);
        nft.transferFrom(address(this), msg.sender, tokenId);
    }
}
