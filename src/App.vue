<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { useApp } from '@/composables/useApp'
import { useWeb3 } from '@/composables/useWeb3'
import { useFlashNotification } from '@/composables/useFlashNotification'
import { useRoute } from 'vue-router'

const { init, ready } = useApp()
const { web3 } = useWeb3()
const { notify } = useFlashNotification()
const route = useRoute()

provide('web3', web3)
provide('notify', notify)

onMounted(async () => {
  init()
})
</script>

<template>
  <LoadingSplash v-if="!ready" />
  <q-layout v-else view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <Header headerTitle="D2D Deal" />
    <div id="modal" />
    <q-page-container>
      <q-page padding>
        <router-view :key="$route.path" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
