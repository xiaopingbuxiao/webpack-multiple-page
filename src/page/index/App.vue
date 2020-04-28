<template>
	<div class="index">
		<h1>{{ title }}</h1>
		<span>{{ id }}</span>
	</div>
</template>
<script>
import { generateId } from '../../util/index'
export default {
	data() {
		return {
			title: 'hello index',
			id: generateId(),
		}
	},
	mounted() {
		console.log('hello index')
	},
	methods: {

	},
}
</script>
<style lang="scss">
.index{
	box-sizing: border-box;
	height: 100%;
	background: url('../../assets/images/vue.jpeg') no-repeat center;
	filter: grayscale(30%);
}
</style>

