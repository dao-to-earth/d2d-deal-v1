import { computed, reactive } from 'vue'
import { ethers } from 'ethers'

const state = reactive<{
  deals: {
    dealID: string;
    title: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
  }[] | null;
}>({
  deals: []
})

export function useDeal() {
  function propose(
    title: String,
    creatorAmount: Number,
    approverAddr: String,
    approverAmount: Number,
  ) {
    // approve, propose
    console.log(title, creatorAmount, approverAddr, approverAmount)
    return true
  }

  function getDeals(params?: any) {
    // retrieve deals related to the DAO as arrays
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