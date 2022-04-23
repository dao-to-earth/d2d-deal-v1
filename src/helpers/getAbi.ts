// import axios from 'axios'

const Govaddress = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
const apiKey = 'RZ6MKQ2FS9ABAXED2N5VVEVA7R5IHI14A7'
const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${Govaddress}&apikey=${apiKey}`

export async function getAbi() {
    const res = await fetch(url)
    const GovAbi = res

    console.log("GovAbi :", GovAbi);
    
    return {
        GovAbi
    }
}
