import { computed, reactive } from 'vue'
import { getAbi } from '@/helpers/getAbi'
import { getContract } from '@/helpers/contract'
import SwapperABI from '@/../abi'
import GovABI from '@/../abi'
import TokenAABI from '@/../abi'
import { getInstance } from '@dao-to-earth/lock/plugins/vue3'

const state = reactive<{
  deals: {
    dealID: string;
    title: string;
    creatorTokenAddr: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
    vestingPeriod: number;
    deadline: number;
  }[] | null;
}>({
  deals: []
})

export function useDeal() {
    console.log("SWAPPER :", process.env.VITE_SWAPPER)
    console.log("PROPOSER1 :", process.env.VITE_PROPOSER1)
    console.log("PROPOSER2 :", process.env.VITE_PROPOSER2)
  async function propose(
    // title: string,
    proposer1: string,
    creatorGovAddr: string,
    creatorTokenAddr: string,
    creatorAmount: number,
    proposer2: string,
    approverAddr: string,
    approverTokenAddr: string,
    approverAmount: number,
    vestingPeriod: number,
    deadline: number
  ) {
    console.log('provided values: ', creatorTokenAddr, creatorAmount, approverAddr, approverTokenAddr, approverAmount, vestingPeriod)
    // title should be stored in ipfs
    // console.log(auth.provider)
    const auth = getInstance();
    console.log('auth :', auth)
    
    const signer = await auth.web3.getSigner()
    console.log('signer :', signer);
    
    // const creatorTokenABI = await getAbi(creatorTokenAddr)
    const creatorTokenABI = TokenAABI.TokenAABI.abi
    console.log("creatorTokenABI :", creatorTokenABI)
    const creatorToken = await getContract(
      creatorTokenAddr,
      creatorTokenABI,
      signer
    )
    const approveCallData = creatorToken.interface.encodeFunctionData('approve', [`${process.env.VITE_SWAPPER}`, creatorAmount] )
    const swapperContract = getContract(
      `${process.env.VITE_SWAPPER}`,
      SwapperABI.SwapperABI.abi,
      signer
    )
    const proposeCallData = swapperContract.interface.encodeFunctionData('propose', [
      `${process.env.VITE_PROPOSER1}`,
      creatorTokenAddr,
      creatorAmount,
      `${process.env.VITE_PROPOSER2}`,
      approverAddr,
      approverTokenAddr,
      approverAmount,
      vestingPeriod,
      deadline
    ])
    // const creatorGovABI = await getAbi(creatorGovAddr)
    const creatorGovABI = GovABI.GovABI.abi
    const creatorGovContract = await getContract(
      creatorGovAddr,
      creatorGovABI,
      signer
    )

    const res = await creatorGovContract.propose(
      [creatorTokenAddr, swapperContract],
      [0, 0],
      [approveCallData, proposeCallData],
      `Towen swap to ${approverAddr}`
    )
    return res
  }

  function getDeals(params?: any) {
    // retrieve deals related to the DAO as arrays
    // deal title should be retrieved in ipfs
  }

  function getDeal(dealID: string): any | null {
    state.deals?.forEach(el => {
      if (dealID === el.dealID) return el
    })
  }

  return {
    propose,
    getDeals,
    getDeal,
    deals: computed(() => state.deals),
  }
}