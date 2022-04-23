<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'
const form = ref(null)
const dense = ref(false)
const creatorGovAddr = ref('')
const creatorTokenAddr = ref('')
const title = ref('')
const creatorAmount = ref(0)
const approverAddr = ref('')
const approverTokenAddr = ref('')
const approverAmount = ref(0)
const vestingPeriod = ref(0)
const deadline = ref(1)

const router = useRouter();
const { propose } = useDeal();
async function validate() {
  (form.value as any).validate().then(success => {
    if (success) {
      callPropose();
    } else {
      return false
    }
  })
}
async function callPropose() {
  const res = await propose(
    title.value,
    creatorGovAddr.value,
    creatorTokenAddr.value,
    creatorAmount.value,
    approverAddr.value,
    approverTokenAddr.value,
    approverAmount.value,
    vestingPeriod.value,
    deadline.value
  );
  if (res) {
    // show toast
    // do something with res
    router.push({ name: 'home' })
  }
}
function reset() {
  (form.value as any).resetValidation()
}
</script>

<template>
  <q-form ref="form">
    <q-input
      v-model="title"
      label="Deal Proposal Title"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="creatorGovAddr"
      label="Address of your Governance Contract"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="creatorTokenAddr"
      label="Address of your Token"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="creatorAmount"
      label="Token amount you send"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="approverAddr"
      label="Opponent Tresury Address"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="approverTokenAddr"
      label="Opponent Token Address"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="approverAmount"
      label="Token amount your opponent send"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="vestingPeriod"
      label="Vesting Period"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="deadline"
      label="Deadline"
      :dense="dense"
    />
    <Spacer />
    <div class="text-center mt-4">
      <Button
        @click="validate"
        class="button-outline w-40"
      >
        <span v-text="$t('propose')" />
      </Button>
    </div>
  </q-form>
</template>