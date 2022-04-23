<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
import { useWeb3 } from '@/composables/useWeb3'

const router = useRouter();
const { getDeals } = useDeal();
const { web3Account } = useWeb3();

const state = reactive<{
  proposals: {
    dealID: string;
    title: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
  }[];
}>({
  proposals: []
})

onMounted(async (): Promise<void> => {
  const deals = await getDeals();
  deals.forEach(el => {
    if (web3Account === el.creatorProposerAddr || web3Account === el.creatorAddr) state.proposals.push(el)
  })
})

function goToDetail(dealID: string): void {
  router.push({ name: 'proposalDetail', params: { key: dealID } })
}
</script>

<template>
  <div>
    <Card
      v-for="proposal in state.proposals"
      :key="proposal.dealID"
      @click="goToDetail(proposal.dealID)"
    >
      <template #card-section>
        <h3>{{ proposal.title }}</h3>
      </template>
    </Card>
  </div>
</template>