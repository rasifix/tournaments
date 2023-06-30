import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Colada, { PiniaColadaPlugin } from 'colada-plugin'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
pinia.use(PiniaColadaPlugin)
app.use(Colada)
app.use(router)

pinia.use(({ store }) => {
    store.$onAction(({ after }) => {
        after(() => {
            if (store.players) {
                localStorage.setItem("kifu", JSON.stringify(store.players))
            }
        })
    });
})

app.mount('#app')