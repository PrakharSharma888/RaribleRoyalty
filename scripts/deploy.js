const hre = require("hardhat");

async function main() {

  const NFT = await hre.ethers.getContractFactory("MinimalERC721");
  const nft = await NFT.deploy();


  console.log("Minting : ",await nft.mint("0x5aAB360f4eEC9C823175711d22D7D0C920D4481a"))
  
  console.log("Setting royalities",await nft.setRoyalties(2,"0x5aAB360f4eEC9C823175711d22D7D0C920D4481a", 1000))

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
  console.log(await nft.getRaribleV2Royalties(2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
