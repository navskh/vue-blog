<template>
  <div class="w-full px-5 py-3 bg-base-100">
    <PostInfoBar
      v-if="post.title !== null"
      :title="post.title"
      :createdAt="post.createdAt"
      :content="post.content"
      :author="post.author"
      :upper="post.upperCategory"
      :sub="post.subCategory"
      :detail="post.detailCategory"
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
  upperCategory: null,
  subCategory: null,
  detailCategory: null,
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
  UpdateTime,
  UpperCategoryName,
  SubCategoryName,
  DetailCategoryName,
}) => {
  post.value.title = Title;
  post.value.content = TreasureContent;
  post.value.author = Author;
  post.value.createdAt = UpdateTime ?? WriteTime;
  post.value.upperCategory = UpperCategoryName;
  post.value.subCategory = SubCategoryName;
  post.value.detailCategory = DetailCategoryName;
};

fetchPost();
</script>

<style></style>
