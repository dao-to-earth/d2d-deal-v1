<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDeal } from '@/composables/useDeal'

const form = ref(null)
const dense = ref(false)
const title = ref('')
const creatorAmount = ref(0)
const approverAddr = ref('')
const approverAmount = ref(0)

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
  const result = await propose(
    title.value,
    creatorAmount.value,
    approverAddr.value,
    approverAmount.value,
  );
  if (result) {
    // show toast
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
      v-model="creatorAmount"
      label="Token amount you send"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="approverAddr"
      label="Opponent Address (should be on Ethereum Mainnet right now)"
      :dense="dense"
    />
    <Spacer />
    <q-input
      v-model="approverAmount"
      label="Token amount your opponent send"
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