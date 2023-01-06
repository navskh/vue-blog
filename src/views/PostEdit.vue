<template>
	<div class="w-8/12 px-5 py-3 bg-base-100">
		<PostInputBar
			v-if="post.title !== null"
			:title="post?.title"
			:content="post?.content"
			:author="post?.author"
			:isEdit="true"
			:upper="post.upperCategory"
			:sub="post.subCategory"
			:detail="post.detailCategory"
      :initCondition="post.initCondition"
		/>
	</div>
</template>
<script setup>
/* eslint-disable */
import { ref, toRefs, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { getPostById } from '@/api/posts';
import ListBox from '@/components/atomic/ListBox.vue';
import PostInputBar from '@/components/PostInputBar.vue';

const route = useRoute();
const id = route.params.id;

const post = ref({
	title: null,
	content: null,
	createdAt: null,
  author: null,
  upperCategory: {},
  subCategory: {},
  detailCategory: {},
  initCondition: {}
});

const fetchPost = async () => {
	try {
    const { data } = await getPostById(id);
    setPost(data[0]);
	} catch (err) {
		console.error(err);
	}
};

const setPost = ({
	Title,
	TreasureContent,
	Author,
	WriteTime,
  UpperCategoryName,
  UpperCategory,
  SubCategoryName,
  SubCategory,
  DetailCategoryName,
  DetailCategory,
}) => {
	post.value.title = Title;
	post.value.content = TreasureContent;
	post.value.author = Author;
	post.value.createdAt = WriteTime;
  post.value.upperCategory = { CategoryName: UpperCategoryName, CategoryCode: UpperCategory };
  post.value.subCategory = { CategoryName: SubCategoryName, CategoryCode: SubCategory };
  post.value.detailCategory = { CategoryName: DetailCategoryName, CategoryCode: DetailCategory };
  post.value.initCondition = { upper: {Code : UpperCategory}, sub: {Code: SubCategory}, detail: {Code: DetailCategory} };
};

watchEffect(fetchPost);
</script>

<style></style>
