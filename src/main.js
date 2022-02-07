import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import VueTabulator from 'vue-tabulator';

const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')
    .use(VueTabulator)
