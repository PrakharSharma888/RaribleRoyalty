const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('RaribleRoyaltyERC721 Test', () => {
let royaltyNFT
before(async () => {
        [deployer, account1, account2] = await ethers.getSigners()
const RoyaltyNFT = await ethers.getContractFactory("MinimalERC721")
royaltyNFT = await RoyaltyNFT.deploy()
await royaltyNFT.deployed()
})
describe('Mint token and set royalty', async () => {
        it('mint two tokens and set two different royalties', async () => {
            const royalty10Percent = 1000
            const royalty20Percent = 2000
            await royaltyNFT.connect(deployer).mint("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199")
            await royaltyNFT.connect(deployer).setRoyalties(0, '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', royalty10Percent)
            await royaltyNFT.connect(deployer).mint('0xdD2FD4581271e230360230F9337D5c0430Bf44C0')
            await royaltyNFT.connect(deployer).setRoyalties(1, '0xdD2FD4581271e230360230F9337D5c0430Bf44C0', royalty20Percent)
            const token0Royalty = await royaltyNFT.getRaribleV2Royalties(0)
            const token1Royalty = await royaltyNFT.getRaribleV2Royalties(1)
            expect(token0Royalty[0][1]).to.equal(royalty10Percent)
            expect(token1Royalty[0][1]).to.equal(royalty20Percent)
        })
    })
})