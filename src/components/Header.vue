<script setup lang="ts">
import { ref } from 'vue'
import { useModal } from '@/composables/useModal'
import { useWeb3 } from '@/composables/useWeb3'
import { getInstance } from '@dao-to-earth/lock/plugins/vue3'
import { shortenAccount } from '@/helpers/web3'

const { modalAccountOpen } = useModal();
const auth = getInstance();
const { login, web3, web3Account } = useWeb3();

const loading = ref(false)

defineProps({
  headerTitle: String,
})

async function handleLogin(connector) {
  modalAccountOpen.value = false
  loading.value = true
  await login(connector);
  loading.value = false
}
</script>

<template>
  <q-header elevated class="bg-blue-7 py-2 px-56">
    <q-toolbar class="flex justify-between">
      <BaseLink
        :link="{ name: 'home' }"
      >
        <q-toolbar-title>{{ headerTitle }}</q-toolbar-title>
      </BaseLink>
      <div
        :key="web3Account"
        class="flex space-x-2"
      >
        <Notification v-if="web3Account" />
        <template v-if="auth.isAuthenticated.value">
          <div>
            <Button 
              @click="modalAccountOpen = true"
              :loading="web3.authLoading"
              class="flex items-center border-white"
            >
              <Avatar
                :address="web3Account"
                size="18"
                class="-mr-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2 -ml-1"
              />
              <!-- <span
                v-if="web3.profile?.name || web3.profile?.ens"
                v-text="web3.profile.name || web3.profile.ens"
                class="hidden sm:block"
              /> -->
              <span
                v-if="web3.profile?.name || web3.profile?.ens"
                v-text="web3.profile.name || web3.profile.ens"
                class="block"
              />
              <!-- <span
                v-else
                v-text="shortenAccount(web3Account)"
                class="hidden sm:block"
              /> -->
              <span
                v-else
                v-text="shortenAccount(web3Account)"
                class="block"
              />
            </Button>
          </div>
        </template>
        <Button
          v-else
          @click="modalAccountOpen = true"
          :loading="loading || web3.authLoading"
          :aria-label="$t('connectWallet')"
        >
          <!-- <span class="hidden sm:block" v-text="$t('connectWallet')" /> -->
          <span class="block" v-text="$t('connectWallet')" />
          <BaseIcon
            name="login"
            size="20"
            class="sm:hidden -ml-2 -mr-2 block align-text-bottom"
          />
        </Button>
      </div>
    </q-toolbar>
  </q-header>
  <teleport v-if="modalAccountOpen" to='#modal'>
    <ModalAccount
      :open="modalAccountOpen"
      @close="modalAccountOpen = false"
      @login="handleLogin"
    />
  </teleport>
</template>