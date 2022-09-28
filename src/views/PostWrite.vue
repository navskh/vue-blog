<template>
	<div class="w-8/12 max-w-4xl px-5 py-3 bg-base-100">
		<PostInputBar />
	</div>
</template>
<script setup>
/* eslint-disable */
import { ref, toRefs, watch, watchEffect } from 'vue';
import PostInfoBar from '@/components/PostInfoBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import PostInputBar from '@/components/PostInputBar.vue';

const route = useRoute();
// const router = useRouter();
</script>

<style></style>
