<template>
	<div class="w-full border-b-2 pb-1">
		<div class="text-sm breadcrumbs text-primary-focus">
			<ul>
				<li><a>원서</a></li>
				<li><a>예외처리</a></li>
				<li><a>출력물</a></li>
				<li></li>
			</ul>
		</div>
		<h1 class="font-bold text-3xl">{{ props.title }}</h1>
		<div class="flex justify-between items-center">
			<div class="text-sm">
				<span class="mr-1">{{ formatDate(props.createdAt) }}</span>
				<span> 마지막으로 수정한 사람 : {{ props.author }}</span>
			</div>
			<div>
				<button class="btn btn-ghost">
					<ShareIcon class="w-5 h-5" />
				</button>
				<button class="ml-0.5 btn btn-ghost" @click="goEdit(1)">
					<PencilIcon class="w-5 h-5" />
				</button>
			</div>
		</div>
	</div>
	<div v-html="props.content"></div>
</template>
<script setup>
import { ShareIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter();

const props = defineProps({
	title: String,
	content: String,
	author: String,
	createdAt: String,
});

const formatDate = dateData => {
	var thisData = dateData?.substring(0, 10).replaceAll('-', '.');
	return thisData;
};

const goEdit = id => {
	router.push({
		name: 'edit',
		params: {
			nav: 'wonseo',
			id: id,
		},
	});
};
</script>
<style></style>
