import Vue from 'vue'
import App from './App.vue'
import LoginPlugin from './login-plugin.js'
import LogoutPlugin from './logout-plugin.js'
// Use vue router
import router from './router/index'

Vue.use(LoginPlugin)
Vue.use(LogoutPlugin)

Vue.config.productionTip = false

new Vue({
  LoginPlugin,
	router: router,			// vue router used in vue instance
  render: h => h(App),
}).$mount('#app')
