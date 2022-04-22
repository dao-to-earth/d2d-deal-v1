<script setup lang="ts">
defineProps({
  enableSeparator: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <q-card>
    <q-card-section>
      <slot name="card-sedtion" />
    </q-card-section>
    <q-separator v-if="enableSeparator" />
    <q-card-action>
      <slot name="card-action" />
    </q-card-action>
  </q-card>
</template>