import router from '@app/router'
import Vue from 'vue'
import _ from 'lodash'

const state = {
	workspaces: [],
	currentWorkspace: null,
	members: [],
	forms: []
}

const mutations = {
	WORKSPACES(state, workspaces){
		state.workspaces = workspaces
	},
	CURRENT_WORKSPACE(state, workspace){
		state.currentWorkspace = workspace
	},
	UPDATE_WORKSPACE_NAME_BY_INDEX(state, params){
		state.workspaces[params.index].name = params.name
	},
	WORKSPACE_EDITABLE_BY_INDEX(state, params){
		state.workspaces[params.index].editable = params.editable
	},
	WORKSPACE_MEMBERS(state, members){
		state.members = members
	},
	WORKSPACE_FORMS(state, forms){
		state.forms = forms
	}
}

const getters = {
	workspaces(state){
		return state.workspaces
	},
	currentWorkspace(state){
		return state.currentWorkspace
	},
	members(){
		return state.members
	},
	forms(){
		return state.forms
	}
}

const actions = {
	init(context, params){
		context.commit('CONTENT_LOADING', true)
		context.dispatch('getWorkspaces')
				.then((response) => {
					context.commit('CONTENT_LOADING', false)
				})

		///////////////////////////
		// Query Workspace Forms //
		///////////////////////////
		let forms = []
		context.commit('WORKSPACE_FORMS', forms)
	},
	workspaceEditable(context, params){
		context.commit('WORKSPACE_EDITABLE_BY_INDEX', params)
	},
	updateNameOf(context, params){
		context.commit('UPDATE_WORKSPACE_NAME_BY_INDEX', params)
	},
	createNewWorkspace(context, params){
		context.commit('CONTENT_LOADING', true)
		return Vue.http.post(`api/v1/workspaces/create`)
					.then((response) => {
						let workspace = response.data
						context.dispatch('getWorkspaces')
								.then((res) => {
									context.commit('CURRENT_WORKSPACE', workspace)
									setTimeout(() => {
										context.commit('CONTENT_LOADING', false)
									}, 1000)
								})
					})
	},
	getWorkspaces(context, params){
		return Vue.http.get(`/api/v1/workspaces/all`)
					.then((response) => {
						let workspaces = response.data
						context.commit('WORKSPACES', workspaces)
						if(workspaces.length){
							context.commit('CURRENT_WORKSPACE', workspaces[_.findIndex(workspaces, {id: parseInt(router.currentRoute.params.workspace)})])
							context.dispatch('getWorkspaceMembers')
						}
						return response
					})
	},
	getWorkspaceMembers(context, params){
		console.log(context.getters.currentWorkspace)
	},
	deleteWorkspace(context, workspace){
		return Vue.http.post(`/api/v1/workspaces/${workspace.id}/delete`, workspace)
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}
