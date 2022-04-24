<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
import { useWeb3 } from '@/composables/useWeb3'

const router = useRouter();
const { getDeals } = useDeal();
const { web3Account } = useWeb3();

const state = reactive<{
  pastDeals: {
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
  pastDeals: []
})

onMounted(async (): Promise<void> => {
  const deals = await getDeals('claimed');
  deals.forEach(el => {
    if (web3Account === el.creatorProposerAddr || web3Account === el.creatorAddr || web3Account === el.receiverProposerAddr || web3Account === el.receiverAddr) state.pastDeals.push(el)
  })
})

function goToDetail(dealID: string): void {
  router.push({ name: 'pastDealDetail', params: { key: dealID } })
}
</script>

<template>
  <div>
    <Card
      v-for="pastDeal in state.pastDeals"
      :key="pastDeal.dealID"
    >
      <template #card-section>
        <p>{{ `dealID: ${pastDeal.dealID}` }}</p>
        <h3>{{ `title: ${pastDeal.title}` }}</h3>
        <p>{{ `creatorProposerAddr: ${pastDeal.creatorProposerAddr}` }}</p>
        <p>{{ `creatorAddr: ${pastDeal.creatorAddr}` }}</p>
        <p>{{ `creatorTokenAddr: ${pastDeal.creatorTokenAddr}` }}</p>
        <p>{{ `creatorAmount: ${pastDeal.creatorAmount}` }}</p>
        <p>{{ `approverProposerAddr: ${pastDeal.approverProposerAddr}` }}</p>
        <p>{{ `approverAddr: ${pastDeal.approverAddr}` }}</p>
        <p>{{ `approverTokenAddr: ${pastDeal.approverTokenAddr}` }}</p>
        <p>{{ `approverAmount: ${pastDeal.approverAmount}` }}</p>
        <p>{{ `startDate: ${pastDeal.startDate}` }}</p>
        <p>{{ `vesting: ${pastDeal.vesting}` }}</p>
        <p>{{ `vestingPeriod: ${pastDeal.vestingPeriod}` }}</p>
        <p>{{ `deadline: ${pastDeal.deadline}` }}</p>
        <p>{{ `status: ${pastDeal.status}` }}</p>
      </template>
    </Card>
  </div>
</template>