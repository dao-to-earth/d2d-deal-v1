<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  tab1: String,
  tab2: String,
  tab3: String,
})

const tab = ref(props.tab1)
</script>

<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md mx-auto">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab :name="tab1" :label="tab1" />
        <q-tab :name="tab2" :label="tab2" />
        <q-tab :name="tab3" :label="tab3" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="tab1">
          <!-- <div class="text-h6">{{ tab1.slice(0, -1) }}</div> -->
          <slot name="tab1Content" />
        </q-tab-panel>

        <q-tab-panel :name="tab2">
          <!-- <div class="text-h6">{{ tab2.slice(0, -1) }}</div> -->
          <slot name="tab2Content" />
        </q-tab-panel>

        <q-tab-panel :name="tab3">
          <!-- <div class="text-h6">{{ tab3.slice(0, -1) }}</div> -->
          <slot name="tab3Content" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>