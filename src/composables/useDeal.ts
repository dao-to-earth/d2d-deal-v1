import { computed, reactive } from 'vue'
import { ethers } from 'ethers'
import { hhEthers } from '@/helpers/hardhatEthers'
import { getContract } from '@/helpers/contract'
import SwapperABI from '@/../abi/'
import GovernorABI from '@/../abi/'
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
    vestingPeriod: number
  ) {
    console.log('provided values: ', creatorTokenAddr, creatorAmount, approverAddr, approverTokenAddr, approverAmount, vestingPeriod)
    // title should be stored in ipfs
    const creatorToken = await hhEthers.getContractAt('ERC20', creatorTokenAddr)
    const approveCallData = creatorToken.interface.encodeFunctionData('approve', [creatorAmount])
    console.log(auth.provider)
    const SwapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      auth.provider
    )
    const proposeCallData = SwapperContract.interface.encodeFunctionData('propose', [
      creatorTokenAddr,
      creatorAmount,
      approverAddr,
      approverTokenAddr,
      approverAmount,
      vestingPeriod
    ])
    const creatorGovContract = await hhEthers.getContractAt(
      creatorGovAddr,
      // @ts-ignore
      GovernorABI,
      auth.provider
    )
    const res = await creatorGovContract.propose(
      [creatorTokenAddr],
      [0],
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