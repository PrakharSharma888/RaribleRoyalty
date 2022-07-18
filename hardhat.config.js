require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

API_URL = "https://eth-rinkeby.alchemyapi.io/v2/9388C1sh7jW0O67FsVRRNv7ujULq8ENY"
PRIVATE_KEY = "884ae64d8fc43f49a0c9fbce02f9eabdabfe21cdbe8e9cddb018d2d8016076d0"

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
     hardhat: {},
     rinkeby: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
  },
}
