import { computed, reactive } from 'vue'
import { getAbi } from '@/helpers/getAbi'
import { getContract } from '@/helpers/contract'
import SwapperABI from '@/../abi'
import { getInstance } from '@dao-to-earth/lock/plugins/vue3'

const auth = getInstance();

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
  async function propose(
    title: string,
    creatorGovAddr: string,
    creatorTokenAddr: string,
    creatorAmount: number,
    approverAddr: string,
    approverTokenAddr: string,
    approverAmount: number,
    vestingPeriod: number,
    deadline: number
  ) {
    console.log('provided values: ', creatorTokenAddr, creatorAmount, approverAddr, approverTokenAddr, approverAmount, vestingPeriod)
    // title should be stored in ipfs
    console.log(auth.provider)
    const signer = await auth.provider.getSigner()
    const creatorTokenABI = await getAbi(creatorTokenAddr)
    const creatorToken = await getContract(
      creatorTokenAddr,
      creatorTokenABI,
      signer
    )
    const approveCallData = creatorToken.interface.encodeFunctionData('approve', [creatorAmount])
    const swapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      signer
    )
    const proposeCallData = swapperContract.interface.encodeFunctionData('propose', [
      creatorTokenAddr,
      creatorAmount,
      approverAddr,
      approverTokenAddr,
      approverAmount,
      vestingPeriod,
      deadline
    ])
    const creatorGovABI = await getAbi(creatorGovAddr)
    const creatorGovContract = await getContract(
      creatorGovAddr,
      creatorGovABI,
      signer
    )

    const res = await creatorGovContract.propose(
      [creatorTokenAddr, swapperContract],
      [0, 0],
      [approveCallData, proposeCallData],
      title
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