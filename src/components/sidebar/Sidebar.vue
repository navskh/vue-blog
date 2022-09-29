<template>
	<div class="h-screen">
		<div
			class="p-4 w-80 bg-base-100 text-md text-base-content border-r-2 h-screen"
		>
			<button
				type="button"
				class="btn btn-primary w-full mb-6"
				@click="goWrite"
			>
				글쓰기
			</button>
			<SidebarItem :list="sidebarCategory" :selectPath="selectPath" />
		</div>
	</div>
</template>
<script setup>
import sidebarCategory from '@/assets/sidebarCategory.js';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import { inject } from 'vue';
const emitter = inject('emitter');

const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
	await router.isReady();
});

const selectPath = computed(() => {
	emitter.emit('Init');
	return route.path;
});

const goWrite = async () => {
	router.push({
		name: 'write',
		params: {
			nav: 'wonseo',
		},
	});
};
</script>
