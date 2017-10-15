<script>
	export default {
		created(){
			this.$store.dispatch('collapseSidebar', true)
		}
	}
</script>

<template>
	<div id="form-builder">
		Form Builder
	</div>
</template>