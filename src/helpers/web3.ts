import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import providerOptions from './providerOptions'
import networks from '@snapshot-labs/snapshot.js/src/networks.json'
import { getUrl } from '@snapshot-labs/snapshot.js/src/utils';

const _getWeb3Modal = () => {
  // const network = process.env.NODE_ENV === 'development' ? 'testnet' : 'mainnet';
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  })

  return web3Modal
}

export async function callWeb3Modal() {
  const web3Modal = _getWeb3Modal()
  const web3ModalProvider = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(web3ModalProvider)
  const accounts = await provider.listAccounts()

  return {
    account: accounts[0],
    provider,
  }
}

export async function getEnsName(provider, account) {
  const network = await provider.getNetwork()
  if (network.chainId === 1) {
    return await provider.lookupAddress(account)
  } else {
    return null
  }
}

export function shortenAccount(account = '') {
  return `${account.slice(0, 6)}...${account.slice(account.length - 4)}`
}

export async function getExplorerUrl(
  network: string,
  type = 'address',
  str: string
): Promise<string> {
  return `${networks[network].explorer}/${type}/${str}`
}

export function getIpfsUrl(url) {
  const gateway: any =
    process.env.VITE_IPFS_GATEWAY || 'cloudflare-ipfs.com'
  return getUrl(url, gateway);
}
