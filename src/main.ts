import { Buffer } from 'buffer'
(window as any).global = window;
(window as any).Buffer = Buffer;
import { createApp, provide, h } from 'vue'
import { LockPlugin } from '@dao-to-earth/lock/plugins/vue3';
import options from '@/helpers/auth';
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/helpers/i18n'
import '@/helpers/auth';
import '@/style.scss'
import { apolloClient } from '@/helpers/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp({
  setup() {
    // provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})
  .use(i18n)
  .use(router)
  .use(LockPlugin, options)
  .use(Quasar, {
    plugins: {
      
    }
  })

app.mount('#app')

export default app
