
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')
require('@/animatedModal')
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Vue from 'vue'
import NProgress from 'vue-nprogress'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

import App from './App.vue'
import router from './router'
import store from './store'
import Avatar from 'vue-avatar'
import Popover from 'vue-js-popover'
import VuejsDialog from "vuejs-dialog"
import VueContextMenu from 'vue-context-menu'

const options = {
  latencyThreshold: 200,
  router: true,
  http: false
}

Vue.use(NProgress, options)
Vue.use(Popover)
Vue.use(VuejsDialog)
Vue.use(VueContextMenu)
Vue.component('avatar', Avatar.Avatar)

const nprogress = new NProgress()

new Vue({
	created(){
		store.dispatch('getUser')
	},
	components: { 
		App
	},
	router,
	nprogress,
	store,
	template: '<App/>'
}).$mount('#app')