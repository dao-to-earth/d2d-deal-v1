import 'dotenv/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
// import "hardhat-typechain";
import '@nomiclabs/hardhat-etherscan'
import { task } from 'hardhat/config'
import 'hardhat-abi-exporter'

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(await account.address)
    console.log(await (await account.getBalance()).toString())
  }
})

export default {
  solidity: {
    version: '0.8.10',
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
      metadata: {
        bytecodeHash: 'none',
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
  },
  // etherscan: {
  //   apiKey: {
  //     rinkeby: process.env.ETHERSCAN_API_KEY,
  //     bscTestnet: process.env.BSCSCAN_API_KEY,
  //     bsc: process.env.BSCSCAN_API_KEY,
  //     polygonMumbai: process.env.POLYGONSCAN_API_KEY,
  //     polygon: process.env.POLYGONSCAN_API_KEY,
  //     avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
  //     avalanche: process.env.SNOWTRACE_API_KEY,
  //   },
  // },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    pretty: true,
  },
}
