import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import 'primeicons/primeicons.css'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    //   unstyled: true,
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
