<script>
	import {mapGetters} from 'vuex'
	export default {
		created(){
			this.$store.dispatch('collapseSidebar', false)
		},
		data(){
			return {

			}
		}, 
		computed: mapGetters({
			currentWorkspace: 'currentWorkspace',
			forms: 'forms'
		})
	}
</script>

<template>
	<div id="workspace" v-if="currentWorkspace">
		<h1 class="name">
			{{ currentWorkspace.name }}
		</h1>
		<hr>
		<div class="forms">
			<div v-for="form in forms" :key="form.id" class="form">
				<div class="caption">
					<h4 class="title text-center">
						{{ form.title }}
					</h4>
				</div>
				<!-- /.caption -->
				<div class="controls btn-group">
					<router-link class="btn btn-md btn-default" :to="`/workspaces/${currentWorkspace.id}/forms/${form.id}/build`">
						<i class="fa fa-edit"></i>
					</router-link>
					<button type="button" class="btn btn-md btn-default">
						<i class="fa fa-external-link"></i>
					</button>
					<button type="button" class="btn btn-md btn-default" v-popover:confirm-form-duplicate>
						<i class="fa fa-copy"></i>
						<popover name="confirm-form-duplicate">
							<div class="title">
								Confirm Duplicate?
								<button type="button" class="btn btn-xs btn-success">Yes</button>
								<button type="button" class="btn btn-xs btn-default">No</button>
							</div>
						</popover>
					</button>
					<button type="button" class="btn btn-md btn-default" v-popover:confirm-form-delete>
						<i class="fa fa-trash"></i>
						<transition name="show-from-right">
							<popover name="confirm-form-delete">
								<div class="title">
									Confirm Delete?
									<button type="button" class="btn btn-xs btn-success">Yes</button>
									<button type="button" class="btn btn-xs btn-default">No</button>
								</div>
							</popover>
						</transition>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>