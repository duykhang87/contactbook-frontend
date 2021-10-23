import { createApp } from 'vue'
import App from './App.vue' 
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { handle } from "./common/promise" ;
createApp(App)
    .mixin({
        methods: {
            handle,
        }
    })
    .mount('#app');
    createApp(App).mount('#app')
import router from  "./router";
createApp(App).use(router).mount('#app');

