import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'

import 'ag-grid-enterprise';
import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';

const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')
