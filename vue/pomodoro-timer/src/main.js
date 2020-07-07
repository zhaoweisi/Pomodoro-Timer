import Vue from 'vue'
import App from './App.vue'
import GoogleSignInButton from 'vue-google-signin-button-directive'
// Use vue router
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  GoogleSignInButton,
	router: router,			// vue router used in vue instance
  render: h => h(App),
}).$mount('#app')
