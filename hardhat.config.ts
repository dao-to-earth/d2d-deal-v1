import 'dotenv/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
// import "hardhat-typechain";
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-watcher'
import { task } from 'hardhat/config'
import 'hardhat-abi-exporter'

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(await account.address)
    console.log(await (await account.getBalance()).toString())
  }
})

const privateKeys: string[] = process.env.DEPLOYER_PRIVATE_KEY ? [
  process.env.DEPLOYER_PRIVATE_KEY
] : ['']
const mnemonic: string =
  process.env.MNEMONIC || 'test test test test test test test test junk'
let accounts
if (privateKeys != ['']) {
  accounts = privateKeys
} else {
  accounts = { mnemonic }
}

export default {
  watcher: {
    compilation: {
      tasks: ['compile'],
      files: ['./contracts'],
    },
    test: {
      tasks: [
        {
          command: 'test',
          params: {
            network: 'hardhat',
          },
        },
      ],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    // fantom: {
    //   url: 'https://rpc.ftm.tools/',
    //   accounts,
    //   chainId: 250,
    //   live: true,
    //   saveDeployments: true,
    //   tags: ['staging'],
    //   gasMultiplier: 2,
    // },
    // fantomtest: {
    //   url: 'https://rpc.testnet.fantom.network/',
    //   accounts,
    //   chainId: 4002,
    //   live: true,
    //   saveDeployments: true,
    //   tags: ['staging'],
    //   gasMultiplier: 2,
    // },
    // fuji: {
    //   url: 'https://api.avax-test.network/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   gas: 4000000,
    //   chainId: 43113,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultiplier: 2,
    // },
    // avalanche: {
    //   url: 'https://api.avax.network/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   gas: 25e6,
    //   chainId: 43114,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultiplier: 2,
    // },
    // bnbTest: {
    //   url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    //   chainId: 97,
    //   gasPrice: 20000000000,
    //   gas: 25e6,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultiplier: 2,
    // },
    // bnb: {
    //   url: 'https://bsc-dataseed.binance.org/',
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   gas: 25e6,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultiplier: 2,
    // },
    // neonDev: {
    //   url: 'https://proxy.devnet.neonlabs.org/solana',
    //   chainId: 245022926,
    //   gasPrice: 20000000000,
    //   gas: 25e6,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultipliyer: 2,
    // },
    // neon: {
    //   url: 'https://proxy.mainnet.neonlabs.org/solana',
    //   chainId: 245022934,
    //   gasPrice: 20000000000,
    //   gas: 25e6,
    //   accounts,
    //   live: true,
    //   saveDeployments: true,
    //   gasMultipliyer: 2,
    // },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
    },
  },
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
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    pretty: true,
  },
}
