import router from '@app/router'
import Vue from 'vue'
import _ from 'lodash'

const state = {
	isLoggedIn: false,
	jwtToken: null,
	user: null
}

const mutations = {
	LOGIN_USER(state, loginData){
		state.isLoggedIn = true
		state.jwtToken = loginData.token
		localStorage.setItem('jwt-token', loginData.token)
		state.user = loginData.user
	},
	IS_LOGGED_IN(state, isLoggedIn){
		state.isLoggedIn = isLoggedIn
	},
	USER(state, user){
		state.user = user
	},
	JWT_TOKEN(state, token){
		localStorage.setItem('jwt-token', token)
		state.jwtToken = token
	}
}

const getters = {
	isLoggedIn(state){
		return state.isLoggedIn
	}
}

const actions = {
	register(context, user){
		return Vue.http.post(`/api/v1/register`, user)
	},
	login(context, credentials){

	},
	logout(context, params){
		localStorage.removeItem('jwt-token')
		context.commit('IS_LOGGED_IN', false)
		context.commit('user', null)
	},
	getUser(context, token){
		let token = token || localStorage.getItem('jwt-token');
		if (!token) {
		  return false;
		}
		return Vue.http.get(`/api/v1/me`)
			.then((response) => {
				let data = response.data;
				this.user = {
					id: data.id,
					fullname: data.fullname,
					email: data.email,
				};
				if(successCallback){
					successCallback(response);
				}
			}, (error) => {
				let data = error.data;
				if(!data.refreshed_token && error.status == 401){
					app.router.replace('/logout');
					return false;
				}
				MessageBox.alert('An error occured while connecting to the server.', 'Something went wrong!', {
					confirmButtonText: 'Try again',
					type: 'error',
					callback: action => {
						this.getUser(token, successCallback);
					}
				});
			});
	}
}

export default {
  state,
  getters,
  mutations,
  actions
}
