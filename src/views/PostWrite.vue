<template>
  <div class="w-[80%] py-3 pr-3 bg-base-100">
    <PostInputBar
      :upper="upperCategory"
      :sub="subCategory"
      :detail="detailCategory"
      :initCondition="initCondition"
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
let initCondition = {};
if (route.path == "/write") {
  upperCategory = { CategoryName: "전체", CategoryCode: "0" };
  subCategory = { CategoryName: "전체", CategoryCode: "0" };
  detailCategory = { CategoryName: "전체", CategoryCode: "0" };
  initCondition = { upper: { Code: '0' }, sub: { Code: '0' }, detail: { Code: '0' } };

} else {
  const path = route.path.split("/write").shift();
  const category = path.split("/");
  const categoryList =
    route.path.indexOf("pims") > -1 || route.path.indexOf("call") > -1
      ? PimsSidebarCategory
      : ApplySidebarCategory;

  console.log(categoryList);
  console.log(category);
  let upper, sub, detail;

  upper = categoryList.find((e) => e.params.nav[0] == category[1]);
  if (category.length > 2) {
    sub = upper?.children.find(
      (e) => e.params.nav[1] == category[2]
    );
  }
  if (category.length > 3) {
    detail = sub?.children.find(
      (e) => e.params.nav[2] == category[3]
    );
  }

  if (upper === undefined || upper?.name == '기타') {
    upper = {};
    upper.name = '전체';
    upper.code = '0';
  }
  if (sub === undefined) {
    sub = {};
    sub.name = '전체';
    sub.code = '0';
  }
  if (detail === undefined) {
    detail = {};
    detail.name = '전체';
    detail.code = '0';
  }

  console.log(upper, sub, detail);


  upperCategory = { CategoryName: upper.name, CategoryCode: upper.code };
  subCategory = { CategoryName: sub.name, CategoryCode: sub.code };
  detailCategory = { CategoryName: detail.name, CategoryCode: detail.code };
  initCondition = { upper: { Code: upper.code }, sub: { Code: sub.code }, detail: { Code: detail.code } };
}
</script>

<style></style>
