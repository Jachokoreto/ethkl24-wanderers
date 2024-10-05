// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract nft is Ownable, ERC721URIStorage {
    uint256 public totalSupply;
    constructor(address initialOwner) Ownable(initialOwner) ERC721('Date Memories', 'DM'){
        totalSupply = 0;
    }
    function mint(
        address _to,
        string calldata _uri
    ) external {
        uint256 _tokenId = totalSupply;
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
        totalSupply++;
    }
}