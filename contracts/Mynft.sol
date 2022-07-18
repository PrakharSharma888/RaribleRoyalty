//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./impl/RoyaltiesV2Impl.sol";
import "./LibPart.sol";
import "./LibRoyaltiesV2.sol";
import "./impl/AbstractRoyalties.sol";


contract MinimalERC721 is ERC721, Ownable, RoyaltiesV2Impl{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;
    constructor() ERC721("Testingggg", "TEST") {}

    function mint(address _to) public onlyOwner {
        super._mint(_to, _tokenIdTracker.current());
        _setTokenURI(_tokenIdTracker, "https://gateway.pinata.cloud/ipfs/QmZFbBnnsv9ouGp5M5EyX7xxKc81NQK8hPH4zs8GUHenLv");
        _tokenIdTracker.increment();        
    }

    function setRoyalties(uint _tokenId, address payable _royaltiesReceipientAddress, uint96 _percentageBasisPoints) public onlyOwner {
        LibPart.Part[] memory _royalties = new LibPart.Part[](1);
        _royalties[0].value = _percentageBasisPoints;
        _royalties[0].account = _royaltiesReceipientAddress;
        _saveRoyalties(_tokenId, _royalties);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        if(interfaceId == LibRoyaltiesV2._INTERFACE_ID_ROYALTIES) {
            return true;
        }
        return super.supportsInterface(interfaceId);
    } 

}
