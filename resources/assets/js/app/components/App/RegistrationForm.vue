<script>
	export default {
		name: 'registration-form',
		data(){
			return {
				user: {
					fullname: null,
					email: null,
					password: null
				},
				errors: null,
				btnLoading: false
			}
		},
		methods: {
			register(){
				if(this.btnLoading) return false
				this.btnLoading = true
				this.$store.dispatch('register', this.user)
					.then((response) => {
						this.btnLoading = false
						if(response.data.errors){
							this.errors = response.data.errors
							return false
						}

						this.$store.commit('LOGIN_USER', response.data)
						this.$emit('success', response.data)
					})
			}
		}
	}
</script>

<template>
	<div class="box">
	    <div id="bp-left" class="box-part">
	        <div id="partition-register" class="partition">
	            <div class="partition-title">CREATE ACCOUNT</div>
	            <div class="partition-form">
	                <form autocomplete="false" @submit.prevent="register">
	                    <div class="autocomplete-fix">
	                        <input type="password">
	                    </div>
	                    <input id="n-fullname" v-model="user.fullname" type="text" placeholder="Full Name" autocomplete="off">
	                    <ul v-if="errors && errors['fullname']" class="_initial-font-size error-message">
	                    	<li v-for="error in errors.fullname">
	                    		{{ error }}
	                    	</li>
	                    </ul>

	                    <input id="n-email" v-model="user.email" type="text" placeholder="Email" autocomplete="off">

	                    <ul v-if="errors && errors['email']" class="_initial-font-size error-message">
	                    	<li v-for="error in errors.email">
	                    		{{ error }}
	                    	</li>
	                    </ul>

	                    <input id="n-password" v-model="user.password" type="password" placeholder="Password" autocomplete="off">

	                    <ul v-if="errors && errors['password']" class="_initial-font-size error-message">
	                    	<li v-for="error in errors.password">
	                    		{{ error }}
	                    	</li>
	                    </ul>

		                <div style="margin-top: 12px;"></div>
		                <div class="button-set text-center">
		                    <button id="register-btn" class="btn-success">
		                    	<span v-if="!btnLoading">Register</span>
		                    	<span v-if="btnLoading">
		                    		Please wait <i class="fa fa-spinner fa-spin"></i>
		                    	</span>
		                    </button>
		                </div>
	                </form>
	                <div class="_initial-font-size">
	                	<small>
	                		Already have an account?
	                		<router-link to="/login">Log in</router-link>
	                	</small>
	                </div>
	                <div class="text-center or-text">
	                	OR
	                </div>
	                <button class="large-btn google-btn">connect with <span>google+</span></button>
	                <button class="large-btn facebook-btn">connect with <span>facebook</span></button>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<style lang="scss" scoped>
	.error-message{
		font-size: 12px !important;
	    color: red;
	    padding: 0 10px;
	    list-style: none;
	}
</style>