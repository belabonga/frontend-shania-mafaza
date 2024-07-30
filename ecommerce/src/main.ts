import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { VApp, VContainer, VRow, VCol, VCard, VCardText, VTextField, VSelect, VBtn, VDivider } from 'vuetify/components'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'

const vuetify = createVuetify({
    components: {
      VApp,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardText,
      VTextField,
      VSelect,
      VBtn,
      VDivider,
    },
  })
const app = createApp(App)


app.use(createPinia())
app.use(vuetify)
app.mount('#app')
