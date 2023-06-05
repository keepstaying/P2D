// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC721 is ERC721, Ownable {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    mapping(address => mapping(uint256 => uint256)) public myNft;
    mapping(address => uint256) public myNftCounts;

    function mint(address to, uint256 tokenId) external onlyOwner {
        uint256 myNftCount = myNftCounts[to] + 1;
        myNft[to][myNftCount] = tokenId;
        myNftCounts[to] = myNftCounts[to]+1;
        _safeMint(to, tokenId);
    }

    struct nftInfor {
        uint256 tokenId;
        string URI;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1";
    }

    function viewMyNft(address owner) public view returns (nftInfor[] memory allNftInfo) {
        uint256 myNftCount = myNftCounts[owner];
        allNftInfo = new nftInfor[](myNftCount);
        for (uint i = 1; i <= myNftCount; i++) {
            uint256 _tokenId = myNft[owner][i];
            string memory _URI = tokenURI(_tokenId);
            nftInfor memory nft = nftInfor({tokenId: _tokenId, URI: _URI});
            allNftInfo[i-1] = nft;
        }
        return allNftInfo; 
    }
}
 