<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
import { useWeb3 } from '@/composables/useWeb3'

const router = useRouter();
const { getDeals } = useDeal();
const { web3Account } = useWeb3();

const state = reactive<{
  runningDeals: {
    dealID: string;
    title: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
  }[];
}>({
  runningDeals: []
})

onMounted(async (): Promise<void> => {
  const deals = await getDeals();
  deals.forEach(el => {
    if (web3Account === el.creatorProposerAddr || web3Account === el.creatorAddr) state.runningDeals.push(el)
  })
})

function goToDetail(dealID: string): void {
  router.push({ name: 'runningDealDetail', params: { key: dealID } })
}
</script>

<template>
  <div>
    <Card
      v-for="runningDeal in state.runningDeals"
      :key="runningDeal.dealID"
      @click="goToDetail(runningDeal.dealID)"
    >
      <template #card-section>
        <h3>{{ runningDeal.title }}</h3>
      </template>
    </Card>
  </div>
</template>