import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from '../router'
import store from '../store/index'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Notifications)

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')