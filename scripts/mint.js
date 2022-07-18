const hre = require('hardhat');
const ethers = require('ethers');



const main = async  () => {

    const accountAdd = "0x5aAB360f4eEC9C823175711d22D7D0C920D4481a"
    const priKey = "884ae64d8fc43f49a0c9fbce02f9eabdabfe21cdbe8e9cddb018d2d8016076d0"

    const tokenURI = 'https://gateway.pinata.cloud/ipfs/QmSpXQB7EzifnioxoN61XKESQsaXbDpwYC8F4CDcNCEnYE';

    const NFT = await hre.ethers.getContractFactory("Mint");
    const NFTInstance = await new ethers.Contract(
        "0xB26e9E6E2831437b4Ba87f4B55822008048B61E6",
        NFT.interface
    )

    const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/4b9c34b0cf327547fb1508ca/eth/rinkeby');
    const walletMM = new ethers.Wallet(priKey, provider)
    const txn = NFTInstance.connect(walletMM).mint(
        accountAdd,
        tokenURI
    );
    console.log(`Your transaction has been successfully done! The transaction hash is ${await txn}`);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});