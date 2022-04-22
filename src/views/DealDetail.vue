<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDeal } from '@/composables/useDeal'

const route = useRoute();
const { getDeal } = useDeal();

const state = reactive<{
  proposal: {
    dealID: string;
    title: string;
    creatorAddr: string;
    creatorAmount: number;
    approverAddr: string;
    approverAmount: number;
    status: string;
  }
}>({
  proposal: {
    dealID: '',
    title: '',
    creatorAddr: '',
    creatorAmount: 0,
    approverAddr: '',
    approverAmount: 0,
    status: ''
  }
})

onMounted(async (): Promise<void> => {
  const dealID = (route.params.dealID as string)
  state.proposal = await getDeal(dealID)
})
</script>

<template>
  <div>
    <Card>
      <template #card-section>
        <p>{{ state.proposal.dealID }}</p>
        <h3>{{ state.proposal.title }}</h3>
        <p>{{ state.proposal.creatorAddr }}</p>
        <p>{{ state.proposal.creatorAmount }}</p>
        <p>{{ state.proposal.approverAddr }}</p>
        <p>{{ state.proposal.approverAmount }}</p>
        <p>{{ state.proposal.status }}</p>
      </template>
    </Card>
  </div>
</template>