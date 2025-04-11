import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
// const app = createApp(App);
// createApp(App).mount('#app')
// app.use(router)
//     