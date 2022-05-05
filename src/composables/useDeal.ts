import { computed, reactive } from 'vue'
import { getAbi } from '@/helpers/getAbi'
import { getContract } from '@/helpers/contract'
import SwapperABI from '@/../abi'
import { getInstance } from '@dao-to-earth/lock/plugins/vue3'

const state = reactive<{
  deals: {
    dealID?: string;
    title?: string;
    creatorProposerAddr: string;
    creatorAddr: string;
    creatorTokenAddr: string;
    creatorAmount: number;
    approverProposerAddr: string;
    approverAddr: string;
    approverTokenAddr: string;
    approverAmount: number;
    startDate: any;
    vestingPeriod: number;
    vesting: any;
    deadline: any;
    status: string;
  }[];
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
    const auth = getInstance();
    console.log(auth)
    // console.log(auth.provider.value)
    const signer = await auth.provider.value.getSigner()
    const creatorTokenABI = await getAbi(creatorTokenAddr)
    const creatorToken = await getContract(
      creatorTokenAddr,
      creatorTokenABI,
      signer
    )
    const approveCallData = creatorToken.interface.encodeFunctionData('approve', [creatorAmount])
    const SwapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      signer
    )
    const proposeCallData = SwapperContract.interface.encodeFunctionData('propose', [
      creatorTokenAddr,
      creatorAmount,
      approverAddr,
      approverTokenAddr,
      approverAmount,
      vestingPeriod
    ])
    const creatorGovABI = await getAbi(creatorGovAddr)
    const creatorGovContract = await getContract(
      creatorGovAddr,
      creatorGovABI,
      signer
    )
    const res = await creatorGovContract.propose(
      [creatorTokenAddr],
      [0],
      [approveCallData, proposeCallData],
      title
    )
    const { id } = res
    
    return id
  }

  async function approve(dealID: string): Promise<boolean> {
    const auth = getInstance();
    const signer = await auth.provider.value.getSigner()
    const SwapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      signer
    )

    const res = await SwapperContract.approve(dealID)
    return res
  }

  async function isClaimable(
    startDate: string,
    vesting: string,
  ): Promise<boolean> {
    const auth = getInstance();
    const blockNumber = await auth.provider.value.getBlockNumber()
    return startDate + vesting <= blockNumber
  }

  async function claim(dealID: string): Promise<boolean> {
    const auth = getInstance();
    const signer = await auth.provider.value.getSigner()
    const SwapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      signer
    )

    const res = await SwapperContract.claim(dealID)
    return res
  }

  async function getDeals(status: string): Promise<{}[]> {
    const auth = getInstance();
    setTimeout(() => {
      console.log(auth.provider.value)
    }, 5000)
    const signer = await auth.provider.value.getSigner()
    const SwapperContract = getContract(
      process.env.SwapperContractAddress,
      SwapperABI,
      signer
    )
    let eventFilter
    let events
    switch(status) {
      case 'pending':
        eventFilter = SwapperContract.filters.DealCreated()
        events = await SwapperContract.queryFilter(eventFilter)
        break;
      case 'approved':
        eventFilter = SwapperContract.filters.DealApproved()
        events = await SwapperContract.queryFilter(eventFilter)
        break;
      case 'claimed':
        eventFilter = SwapperContract.filters.DealClaimed()
        events = await SwapperContract.queryFilter(eventFilter)
        break;
    }

    console.log(events)
    events.forEach(el => {
      let event
      console.log(el)
      // @ts-ignore
      event.dealID = el.id
      // @ts-ignore
      event.creatorProposerAddr = el.proposer1
      // @ts-ignore
      event.creatorAddr = el.account1
      // @ts-ignore
      event.creatorTokenAddr = el.token1
      // @ts-ignore
      event.creatorTokenAmount = el.amount1
      // @ts-ignore
      event.approverProposerAddr = el.porposer2
      // @ts-ignore
      event.approverAddr = el.account2
      // @ts-ignore
      event.approverTokenAddr = el.token2
      // @ts-ignore
      event.approverTokenAmount = el.amount2
      // @ts-ignore
      event.startDate = el.startDate
      // @ts-ignore
      event.vesting = el.vesting
      // @ts-ignore
      event.deadline = el.deadline
      state.deals.push(event)
    })
    return state.deals
  }

  function getDeal(dealID: string): any | null {
    state.deals?.forEach(el => {
      if (dealID === el.dealID) return el
    })
  }

  return {
    propose,
    approve,
    isClaimable,
    claim,
    getDeals,
    getDeal,
    deals: computed(() => state.deals),
  }
}