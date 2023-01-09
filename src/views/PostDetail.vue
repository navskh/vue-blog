<template>
  <div class="w-[80%] h-[calc(100vh - 20px)] px-1 py-2 bg-base-100">
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
    <TopButton />
  </div>
</template>
<script setup>
/* eslint-disable */
import { ref, toRefs, watch, watchEffect } from "vue";
import PostInfoBar from "@/components/PostInfoBar.vue";
import TopButton from "@/components/atomic/Button/TopButton.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { getPostById, getRequestById } from "@/api/posts";

const route = useRoute();
// const router = useRouter();

const id = route.params.id;

const emits = defineEmits(["update:scroll"]);

/** scroll 길이가 200 이상일 경우 top 버튼 show */
function showTopBtn(scrollLength) {
  if (scrollLength > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("topButton").classList.remove("hidden");
  } else {
    document.getElementById("topButton").classList.add("hidden");
  }
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
    if (route.path.indexOf('request') > -1) {
      console.log('request');
      const { data } = await getRequestById(id);
      setPost(data[0]);
    }
    else {
      const { data } = await getPostById(id);
      setPost(data[0]);
    }
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

.badgeinfo {
  background-color: hsl(var(--in));
  color: hsl(var(--inc));
}
.badgeerror {
  background-color: hsl(var(--er));
  color: hsl(var(--erc));
}
.badgewarning {
  background-color: hsl(var(--wa));
  color: hsl(var(--wac));
}
</style>
