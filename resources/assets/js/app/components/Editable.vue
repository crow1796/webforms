<script>
	export default {
		name: 'editable',
		props: ['content', 'className']
	}
</script>

<template>
	<input v-model="content" :class="className">
</template>