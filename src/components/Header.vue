<template>
	<div
		class="navbar bg-base-100 flex justify-between px-4 border-b-2 h-[100px]"
	>
		<router-link to="/" class="btn btn-ghost uppercase text-2xl"
			>Treasure Blog</router-link
		>
		<input
			type="text"
			placeholder="Search..."
			class="input input-bordered rounded-md w-full max-w-xs focus:outline-none"
			v-model="searchData"
			@keyup.enter="submit"
		/>
	</div>
</template>
<script setup>
import { inject, ref } from 'vue';

const emitter = inject('emitter');
const searchData = ref('');

const submit = () => {
	emitter.emit('Search', searchData);
};

emitter.on('Init', () => {
	searchData.value = '';
});
</script>
<style></style>
