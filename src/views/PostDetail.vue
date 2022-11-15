<template>
  <div class="w-full h-[calc(100vh-150px)] px-5 py-3 bg-base-100">
    <PostInfoBar
      v-if="post.title !== null"
      :title="post.title"
      :createdAt="post.createdAt"
      :content="post.content"
      :author="post.author"
      :upper="post.upperCategory"
      :sub="post.subCategory"
      :detail="post.detailCategory"
      @update:scroll="showTopBtn"
    />
    <button
      id="topButton"
      @click="goToTop()"
      title="Go To Top"
      class="hidden fixed z-90 bottom-[3.5rem] right-[9rem] border-0 w-16 h-16 rounded-full drop-shadow-md bg-primary text-primary-content text-3xl font-bold"
    >
      <ArrowUpIcon class="w-10 m-auto" />
    </button>
  </div>
</template>
<script setup>
/* eslint-disable */
import { ref, toRefs, watch, watchEffect, defineEmits } from "vue";
import PostInfoBar from "@/components/PostInfoBar.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { getPostById } from "@/api/posts";

import { ArrowUpIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
// const router = useRouter();

const id = route.params.id;

const emits = defineEmits(["update:scroll"]);

// When the user scrolls down 200px from the top of the document, show the button
function showTopBtn(scrollLength) {
  console.log("evet: ", scrollLength);
  if (scrollLength > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("topButton").classList.remove("hidden");
  } else {
    document.getElementById("topButton").classList.add("hidden");
  }
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
  console.log("gototop");
  document
    .getElementsByClassName("DETAIL")[0]
    .scrollTo({ top: 0, behavior: "smooth" });
}
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

<style lang="scss">
::selection {
  background-color: hsl(var(--s));
  color: hsl(var(--sc));
}
.detail {
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    p {
      margin: 0;
    }
  }
}
</style>
