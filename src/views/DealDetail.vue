<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
import { useWeb3 } from '@/composables/useWeb3'

const route = useRoute();
const { getDeal } = useDeal();
const { web3Account } = useWeb3();

const state = reactive<{
  deal: {
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
  }
}>({
  deal: {
    title: '',
    creatorProposerAddr: '',
    creatorAddr: '',
    creatorTokenAddr: '',
    creatorAmount: 0,
    approverProposerAddr: '',
    approverAddr: '',
    approverTokenAddr: '',
    approverAmount: 0,
    startDate: '',
    vestingPeriod: '',
    vesting: '',
    deadline: '',
    status: ''
  }
})

onMounted(async (): Promise<void> => {
  const dealID = (route.params.dealID as string)
  state.deal = await getDeal(dealID)
})

function approve() {

}
</script>

<template>
  <div>
    <Card>
      <template #card-section>
        <p>{{ state.deal.dealID }}</p>
        <h3>{{ `title: ${state.deal.title}` }}</h3>
        <p>{{ `creatorProposerAddr: ${state.deal.creatorProposerAddr}` }}</p>
        <p>{{ `creatorAddr: ${state.deal.creatorAddr}` }}</p>
        <p>{{ `creatorTokenAddr: ${state.deal.creatorTokenAddr}` }}</p>
        <p>{{ `creatorAmount: ${state.deal.creatorAmount}` }}</p>
        <p>{{ `approverProposerAddr: ${state.deal.approverProposerAddr}` }}</p>
        <p>{{ `approverAddr: ${state.deal.approverAddr}` }}</p>
        <p>{{ `approverTokenAddr: ${state.deal.approverTokenAddr}` }}</p>
        <p>{{ `approverAmount: ${state.deal.approverAmount}` }}</p>
        <p>{{ `startDate: ${state.deal.startDate}` }}</p>
        <p>{{ `vesting: ${state.deal.vesting}` }}</p>
        <p>{{ `vestingPeriod: ${state.deal.vestingPeriod}` }}</p>
        <p>{{ `deadline: ${state.deal.deadline}` }}</p>
        <p>{{ `status: ${state.deal.status}` }}</p>
      </template>
      <template #card-action>
        <div
          class="text-center mt-4"
        >
          <Button
            @click="approve"
            class="button-outline w-40"
          >
            <span v-text="$t('approve')" />
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>