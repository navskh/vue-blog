<template>
	<div class="w-8/12 max-w-4xl px-5 py-3 bg-base-100">
		<PostInfoBar
			:title="post.title"
			:createdAt="post.createdAt"
			:content="post.content"
			:author="post.author"
		/>
	</div>
</template>
<script setup>
/* eslint-disable */
import { ref, toRefs, watch, watchEffect } from 'vue';
import PostInfoBar from '@/components/PostInfoBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { getPostById } from '@/api/posts';

const route = useRoute();
// const router = useRouter();

const id = route.params.id;

const post = ref({
	title: null,
	content: null,
	createdAt: null,
	author: null,
});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setPost(data[0]);
	} catch (err) {
		console.error(err);
	}
};

const setPost = ({ Title, TreasureContent, Author, WriteTime }) => {
	post.value.title = Title;
	post.value.content = TreasureContent;
	post.value.author = Author;
	post.value.createdAt = WriteTime;
};

fetchPost();

watchEffect(fetchPost);
</script>

<style></style>
