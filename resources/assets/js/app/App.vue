<script>
import Editor from 'vue2-medium-editor'
import Editable from '@app/components/Editable.vue'
import ContentLoading from '@app/components/ContentLoading.vue'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import {mapGetters} from 'vuex'
import RegistrationForm from '@app/components/App/RegistrationForm.vue'
export default {
	components: {
		RegistrationForm,
		ContentLoading,
		NprogressContainer,
		Editable
	},
	created(){
		this.$store.dispatch('init')
	},
	mounted(){
		$("#loginModalBtn").animatedModal({
			animatedIn: 'bounceInUp',
			animatedOut: 'bounceOut'
		})
	},
	data(){
		return {
			workspaceContext: null
		}
	},
	computed: mapGetters({
		isLoggedIn: 'isLoggedIn',
		workspaces: 'workspaces',
		currentWorkspace: 'currentWorkspace',
		contentLoading: 'contentLoading',
		members: 'members',
		sidebarCollapsed: 'sidebarCollapsed'
	}),
	methods: {
		updateCurrentWorkspaceName(name){
			let tmpCurrentWorkspace = JSON.parse(JSON.stringify(this.currentWorkspace))
			tmpCurrentWorkspace.name = name
			this.$store.commit('CURRENT_WORKSPACE', tmpCurrentWorkspace)
		},
		workspaceEditable(index, editable){
			this.$store.dispatch('workspaceEditable', {
				index,
				editable
			})
		},
		updateNameOf(index, e){
			this.$store.dispatch('updateNameOf', {
				index,
				name: e.target.value
			})
		},
		toggleSidebar(){
			this.$store.dispatch('collapseSidebar', !this.sidebarCollapsed)
		},
		createNewWorkspace(){
			this.$store.dispatch('createNewWorkspace')
		},
		openContextMenuOf(workspace, event){
			this.workspaceContext = workspace
			this.$refs.ctx.open(event)
		},
		makeWorkspaceEditable(){
			let index = _.findIndex(this.workspaces, {id: this.workspaceContext.id})
			let editable = true
			this.$store.dispatch('workspaceEditable', { index, editable })
		},
		showDeleteWorkspaceConfirmation(){
			let message = "Are you sure?";
			 
			let options = {
			    html: false,
			    loader: true,
			    reverse: false,
			    okText: 'Continue',
			    cancelText: 'Close',
			    animation: 'bounce',
			    type: 'hard',
			    verification: this.workspaceContext.name,
			    clicksCount: 3,
			};
			 
			this.$dialog.confirm(message, options)
			    .then((dialog) => {
					this.$store.commit('CONTENT_LOADING', true)
			        this.$store.dispatch('deleteWorkspace', this.workspaceContext)
			        	.then((response) => {
			        		dialog.close()
			        		this.$store.dispatch('getWorkspaces')
			        				.then((res) => {
			        					setTimeout(() => {
			        						this.$store.commit('CONTENT_LOADING', false)
			        					}, 1000)
			        				})
			        	})
			    })
			    .catch(() => {
			        this.workspaceContext = null
			    });
		},
		registrationSuccess(){
			$('.close-animatedModal.closebt').trigger('click')
		}
	},
	watch: {
		'$route.params.workspace'(to, from){
			this.$store.commit('CURRENT_WORKSPACE', this.workspaces[_.findIndex(this.workspaces, {id: parseInt(to)})])
		}
	}
}
</script>

<template>	
	<div id="app" class="dashboard">
		<nprogress-container></nprogress-container>
		<content-loading></content-loading>
		<nav class="navbar navbar-default" role="navigation" id="top-navbar">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<button class="pull-left hamburger" id="sidebar-toggle" :class="{ 'hamburger hamburger--arrowturn js-hamburger is-active': !sidebarCollapsed }" type="button" @click="toggleSidebar">
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
				</button>
				<router-link to="/" class="navbar-brand" href="#">WebForms</router-link>
			</div>
	
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="main-collapse">
				<div class="navbar-right" v-if="isLoggedIn">
					<ul class="nav navbar-nav">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<avatar username="Joshua Tundag" color="white" :size="40"></avatar>
							</a>
							<ul class="dropdown-menu">
								<li><a href="#">Logout</a></li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="navbar-right">
					<form class="navbar-form" role="search" style="display: inline-block">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Search">
							<i class="fa fa-search"></i>
						</div>
						<div class="form-group" v-if="!isLoggedIn">
							<a href="#animatedModal" id="loginModalBtn" class="btn btn-md btn-success -is-borderless -is-borderradiusless">Save Account</a>
						</div>
					</form>
				</div>
			</div><!-- /.navbar-collapse -->
		</nav>
		<div class="content" :class="{ '-collapsed': sidebarCollapsed }">
			<div class="sidebar">
				<button type="button" class="add-form-area" v-popover:confirm-form-creation>
					<span class="icon">
						<i class="fa fa-file"></i>
					</span>
					<div>Create New Form</div>
					<transition name="fade">
						<popover name="confirm-form-creation" :pointer="false">
							<button type="button" class="btn btn-lg btn-success">New</button>
							<button type="button" class="btn btn-lg btn-success">Template</button>
						</popover>
					</transition>
				</button>
				<context-menu id="testingctx" ref="ctx">
					<li class="ctx-item" @click="makeWorkspaceEditable">
						<i class="fa fa-edit"></i>
						Change Name
					</li>
					<li class="ctx-item" @click="showDeleteWorkspaceConfirmation" v-if="workspaces.length > 1">
						<i class="fa fa-trash"></i>
						Delete
					</li>
				</context-menu>
				<ul class="menu">
					<li class="title">
						WORKSPACES 
						<div class="pull-right">
							<button type="button" class="btn btn-xs sm-add-btn" id="add-workspace-btn" v-popover:confirm-workspace-creation.right>
								<i class="fa fa-plus"></i>
							</button>
							<transition name="fade">
								<popover name="confirm-workspace-creation">
									Create workspace?
									<button type="button" class="btn btn-xs btn-success" @click="createNewWorkspace">Yes</button>
									<button type="button" class="btn btn-xs btn-default" v-popover:confirm-workspace-creation.right>No</button>
								</popover>
							</transition>
						</div>
					</li>
					<li v-for="(workspace, index) in workspaces" @contextmenu.prevent="openContextMenuOf(workspace, $event)">
						<router-link :to="`/workspaces/${workspace.id}/forms`" class="item workspace" active-class="-active">
							<span v-if="!workspace.editable" class="workspace-name" @dblclick="workspaceEditable(index, true)">{{ workspace.name }}</span>
							<input type="text" class="workspace-name -editing" :value="workspace.name" v-if="workspace.editable" @input="updateNameOf(index, $event)" @blur="workspaceEditable(index, false)" @keyup.enter="workspaceEditable(index, false)">
						</router-link>
					</li>
					<li class="neutral" v-if="workspaces.length > 5">
						<a class="item">
							More...
						</a>
					</li>
				</ul>
				<ul class="menu" id="members-list" v-if="currentWorkspace">
					<li class="title">
						MEMBERS
						<div class="pull-right">
							<button type="button" class="btn btn-xs sm-add-btn" id="add-member-btn" v-popover:confirm-member-creation.right>
								<i class="fa fa-plus"></i>
							</button>
							<transition name="fade">
								<popover name="confirm-member-creation">
									Add a member?
									<button type="button" class="btn btn-xs btn-success">Yes</button>
									<button type="button" class="btn btn-xs btn-default">No</button>
								</popover>
							</transition>
						</div>
					</li>
					<li v-for="member in members">
						<a class="item">
							<avatar :username="member.name" :size="20"></avatar>
							<span>{{ member.name }}</span>
						</a>
					</li>
					<li class="neutral" v-if="members.length > 5">
						<a class="item">
							More...
						</a>
					</li>
				</ul>
			</div>
			<div class="right-content container-fluid">
				<div class="real-content">
					<transition name="fade" mode="out-in">
						<router-view class="view" 
								keep-alive
								transition
								transition-mode="in-out">
						</router-view>
					</transition>
				</div>
			</div>
		</div>
		<div id="animatedModal">
			<div id="closebt-container" class="text-center">
				<img class="close-animatedModal closebt" src="/images/closebt.svg">
			</div>

			<div class="login-modal-content">
				<registration-form @success="registrationSuccess"></registration-form>
			</div>
		</div>
	</div>
</template>