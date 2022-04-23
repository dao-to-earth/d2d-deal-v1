import axios from 'axios'

// const Govaddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'

export async function getAbi(address: string) {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_APIKEY}`
  const res = await axios.get(url)
  const ABI = res.data.result

  return ABI
}
