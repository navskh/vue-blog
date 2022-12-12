<template>
  <div class="w-[80%] py-3 pr-3 bg-base-100">
    <PostInputBar
      :upper="upperCategory.name"
      :sub="subCategory.name"
      :detail="detailCategory.name"
    />
  </div>
</template>
<script setup>
/* eslint-disable */
// import { ref, toRefs, watch, watchEffect } from "vue";
// import PostInfoBar from "@/components/PostInfoBar.vue";
import { useRoute, useRouter } from "vue-router";
// import { getPostById } from "@/api/posts";
import PostInputBar from "@/components/PostInputBar.vue";
import sidebarCategory from "@/assets/sidebarCategory";

const route = useRoute();
// const router = useRouter();
let upperCategory = {};
let subCategory = {};
let detailCategory = {};
if (route.query.category) {
  const category = JSON.parse(route.query.category);
  upperCategory = sidebarCategory.find((e) => e.params.nav[0] == category[0]);
  if (category.length > 1) {
    subCategory = upperCategory.children.find(
      (e) => e.params.nav[1] == category[1]
    );
  }
  if (category.length > 2) {
    detailCategory = subCategory.children.find(
      (e) => e.params.nav[2] == category[2]
    );
  }
}
</script>

<style></style>
