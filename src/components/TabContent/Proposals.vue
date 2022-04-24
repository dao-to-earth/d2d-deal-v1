<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
import { useWeb3 } from '@/composables/useWeb3'

const router = useRouter();
const { getDeals, approve, isClaimable, claim } = useDeal();
const { web3Account } = useWeb3();

const state = reactive<{
  proposals: {
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
  proposals: [],
  approvedProposals: [],
})

onMounted(async (): Promise<void> => {
  const proposals = await getDeals('pending');
  proposals.forEach(el => {
    if (web3Account === proposal.creatorProposerAddr || web3Account === proposal.creatorAddr || web3Account === proposal.approverProposerAddr || web3Account === proposal.approverAddr) state.proposals.push(el)
  })
})

function goToDetail(dealID: string): void {
  router.push({ name: 'proposalDetail', params: { key: dealID } })
}

function callApprove() {
  approve()
}
</script>

<template>
  <div>
    <Card
      v-for="proposal in state.proposals"
      :key="proposal.dealID"
    >
      <template #card-section>
        <p>{{ `dealID: ${proposal.dealID}` }}</p>
        <h3>{{ `title: ${proposal.title}` }}</h3>
        <p>{{ `creatorProposerAddr: ${proposal.creatorProposerAddr}` }}</p>
        <p>{{ `creatorAddr: ${proposal.creatorAddr}` }}</p>
        <p>{{ `creatorTokenAddr: ${proposal.creatorTokenAddr}` }}</p>
        <p>{{ `creatorAmount: ${proposal.creatorAmount}` }}</p>
        <p>{{ `approverProposerAddr: ${proposal.approverProposerAddr}` }}</p>
        <p>{{ `approverAddr: ${proposal.approverAddr}` }}</p>
        <p>{{ `approverTokenAddr: ${proposal.approverTokenAddr}` }}</p>
        <p>{{ `approverAmount: ${proposal.approverAmount}` }}</p>
        <p>{{ `startDate: ${proposal.startDate}` }}</p>
        <p>{{ `vesting: ${proposal.vesting}` }}</p>
        <p>{{ `vestingPeriod: ${proposal.vestingPeriod}` }}</p>
        <p>{{ `deadline: ${proposal.deadline}` }}</p>
        <p>{{ `status: ${proposal.status}` }}</p>
        <div
          v-if="web3Account === proposal.approverProposerAddr || web3Account === proposal.approverAddr"
          class="text-center mt-4"
        >
          <Button
            @click="callApprove"
            class="button-outline w-40"
          >
            <span v-text="$t('approve')" />
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>