<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'

const router = useRouter();
const { getDeals } = useDeal();

const state = reactive<{
  pastDeals: {
    dealID: string;
    title: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
  }[];
}>({
  pastDeals: []
})

onMounted(async (): Promise<void> => {
  const deals = await getDeals();
  // @ts-ignore
  deals.forEach(el => {
    if (el.status === 'outdated') state.pastDeals.push(el)
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
      @click="goToDetail(pastDeal.dealID)"
    >
      <template #card-section>
        <h3>{{ pastDeal.title }}</h3>
      </template>
    </Card>
  </div>
</template>