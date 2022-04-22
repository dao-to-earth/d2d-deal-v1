import { ethers } from 'ethers'

export function getContract(address, abi, signer) {
  const contract = new ethers.Contract(
    ethers.utils.getAddress(address),
    abi,
    signer
  )

  return contract
}

export async function getETHBalance(provider, store) {
  const account = store.getters['web3/getAccount']
  const weiBalance = await provider.getBalance(account)
  const balance = ethers.utils.formatEther(weiBalance)
  const shortBalance = String(Math.round(Number(balance) * 1000) / 1000)
  return {
    balance,
    shortBalance,
  }
}

export async function getBalance(contract, signer, isWei) {
  if (isWei) {
    const weiBalance = await contract.balanceOf(signer.getAddress())
    const balance = ethers.utils.formatEther(weiBalance)
    const shortBalance = String(
      Math.round(Number(ethers.utils.formatEther(weiBalance)) * 1000) / 1000
    )
    return {
      balance,
      shortBalance,
    }
  } else {
    let balance = await contract.balanceOf(signer.getAddress())
    balance = String(Number(ethers.utils.formatEther(balance)) * 10 ** 12)
    const shortBalance = String(Math.round(Number(balance) * 1000) / 1000)
    return {
      balance,
      shortBalance,
    }
  }
}

export function formatEther(val) {
  const value = ethers.utils.formatEther(val)
  const shortValue = String(Math.round(Number(value) * 1000) / 1000)
  return {
    value,
    shortValue,
  }
}

export function parseEther(val) {
  const value = ethers.utils.parseEther(val)
  return value
}

export function hexStripZeros(val) {
  const value = ethers.utils.hexStripZeros(val)
  return value
}

export function hexlify(val) {
  const value = ethers.utils.hexlify(val)
  return value
}

export function parseUnitsToString(val, unit) {
  return ethers.utils.parseUnits(String(val), unit)
}