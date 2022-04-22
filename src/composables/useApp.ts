import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { getInstance } from '@dao-to-earth/lock/plugins/vue3'
import { useWeb3 } from '@/composables/useWeb3'

const { login } = useWeb3()
const ready = ref(false)

export function useApp() {
  const { loadLocale } = useI18n()

  async function init() {
    await loadLocale()
    const auth = getInstance()
    ready.value = true

    if (window?.parent === window) {
      auth.getConnector().then(connector => {
        if (connector) login(connector)
      })
    } else {
      login('gnosis')
    }

    // if logged in getDeals
  }

  return {
    ready,
    init
  }
}
