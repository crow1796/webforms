import router from '@app/router'
import Vue from 'vue'
import _ from 'lodash'

const state = {
	sidebarCollapsed: true,
	contentLoading: false
}

const mutations = {
	SIDEBAR_COLLAPSED(state, hasCollapsed){
		state.sidebarCollapsed = hasCollapsed
	},
	CONTENT_LOADING(state, isLoading){
		state.contentLoading = isLoading
	}
}

const getters = {
	sidebarCollapsed(state){
		return state.sidebarCollapsed
	},
	contentLoading(state){
		return state.contentLoading
	}
}

const actions = {
	collapseSidebar(context, collapsed){
		context.commit('SIDEBAR_COLLAPSED', collapsed)
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}
