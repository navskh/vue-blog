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
import ApplySidebarCategory, {
  PimsSidebarCategory,
} from "@/assets/sidebarCategory.js";

const route = useRoute();
// const router = useRouter();
let upperCategory = {};
let subCategory = {};
let detailCategory = {};
if (route.path == "/write") {
  upperCategory.name = "";
  subCategory.name = "";
  detailCategory.name = "";
} else {
  const path = route.path.split("/write").shift();
  const category = path.split("/");
  const categoryList =
    route.path.indexOf("pims") > -1 || route.path.indexOf("call") > -1
      ? PimsSidebarCategory
      : ApplySidebarCategory;
  upperCategory = categoryList.find((e) => e.params.nav[0] == category[1]);
  if (category.length > 2) {
    subCategory = upperCategory?.children.find(
      (e) => e.params.nav[1] == category[2]
    );
  }
  if (category.length > 3) {
    detailCategory = subCategory?.children.find(
      (e) => e.params.nav[2] == category[3]
    );
  }
}
</script>

<style></style>
