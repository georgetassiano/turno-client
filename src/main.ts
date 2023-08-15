import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import auth from './plugins/auth'

import './styles/__global.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(auth)

app.mount('#app')
