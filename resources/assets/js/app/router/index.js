import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/workspaces',
			component: require('@app/components/Workspace.vue'),
			alias: '/',
			children: [
				{ path: '/workspaces/:workspace/forms', component: require('@app/components/Workspace.vue') },
			]
		},
		{ 
			path: '/workspaces/:workspace/forms/:form', 
			component: require('@app/components/FormBuilder.vue'),
			children: [
				{ path: '/workspaces/:workspace/forms/:form/build', component: require('@app/components/FormBuilder.vue') }
			]
		},
		{ path: '/404', component: require('@app/components/Page404.vue') },
		{ path: '*', redirect: '/404' }
	]
})

export default router