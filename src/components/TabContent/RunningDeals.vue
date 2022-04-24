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
    isClaimable: boolean;
  }[];
}>({
  runningDeals: [],
})

onMounted(async (): Promise<void> => {
  const deals = await getDeals('approved');
  deals.forEach(el => {
    if (web3Account === el.creatorProposerAddr || web3Account === el.creatorAddr || web3Account === el.receiverProposerAddr || web3Account === el.receiverAddr) state.runningDeals.push(el)
  })

  state.runningDetails.forEach(async el => {
    el.isClaimable = await isClaimable(
      el.startDate,
      el.vesting
    )
  })
})

function goToDetail(dealID: string): void {
  router.push({ name: 'runningDealDetail', params: { key: dealID } })
}

function callClaim() {
  claim()
}
</script>

<template>
  <div>
    <Card
      v-for="runningDeal in state.runningDeals"
      :key="runningDeal.dealID"
    >
      <template #card-section>
        <p>{{ `dealID: ${runningDeal.dealID}` }}</p>
        <h3>{{ `title: ${runningDeal.title}` }}</h3>
        <p>{{ `creatorProposerAddr: ${runningDeal.creatorProposerAddr}` }}</p>
        <p>{{ `creatorAddr: ${runningDeal.creatorAddr}` }}</p>
        <p>{{ `creatorTokenAddr: ${runningDeal.creatorTokenAddr}` }}</p>
        <p>{{ `creatorAmount: ${runningDeal.creatorAmount}` }}</p>
        <p>{{ `approverProposerAddr: ${runningDeal.approverProposerAddr}` }}</p>
        <p>{{ `approverAddr: ${runningDeal.approverAddr}` }}</p>
        <p>{{ `approverTokenAddr: ${runningDeal.approverTokenAddr}` }}</p>
        <p>{{ `approverAmount: ${runningDeal.approverAmount}` }}</p>
        <p>{{ `startDate: ${runningDeal.startDate}` }}</p>
        <p>{{ `vesting: ${runningDeal.vesting}` }}</p>
        <p>{{ `vestingPeriod: ${runningDeal.vestingPeriod}` }}</p>
        <p>{{ `deadline: ${runningDeal.deadline}` }}</p>
        <p>{{ `status: ${runningDeal.status}` }}</p>
        <div
          v-if="runningDeal.isClaimable && (web3Account === proposal.creatorProposerAddr || web3Account === proposal.creatorAddr || web3Account === proposal.approverProposerAddr || web3Account === proposal.approverAddr)"
          class="text-center mt-4"
        >
          <Button
            @click="callClaim"
            class="button-outline w-40"
          >
            <span v-text="$t('claim')" />
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>