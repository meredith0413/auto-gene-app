import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App);
createApp(App).mount('#app')
app.use(router)
    .use(createPinia())