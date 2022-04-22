import WalletConnectProvider from '@walletconnect/web3-provider'
// import Torus from "@toruslabs/torus-embed";
import Fortmatic from 'fortmatic'
import Portis from '@portis/web3'
import Authereum from 'authereum'
import ethProvider from 'eth-provider'

const customNetworkOptions = {
  rpcUrl: 'https://alpha.ethereum.matic.network/',
  chainId: 137,
}

const providerOptions = {
  injected: {
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID,
    },
  },
  // torus: {
  //   package: Torus,
  //   options: {
  //     networkParams: {
  //       host: "https://localhost:8545", // optional
  //       chainId: 1337, // optional
  //       networkId: 1337 // optional
  //     },
  //     config: {
  //       buildEnv: "development" // optional
  //     }
  //   }
  // },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.FORTMATIC_API_KEY,
      network: customNetworkOptions,
    },
  },
  portis: {
    package: Portis,
    options: {
      id: process.env.PORTIS_ID,
      // network: process.env.NODE_ENV === 'development' ? 'maticMumbai' : 'matic'
      network: 'matic',
    },
  },
  authereum: {
    package: Authereum,
  },
  frame: {
    package: ethProvider,
  },
}

export default providerOptions