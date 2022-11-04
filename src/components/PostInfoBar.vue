<template>
  <div class="DETAIL w-full pb-1 h-[calc(100vh-150px)] overflow-y-scroll">
    <div class="flex justify-between">
      <div class="text-sm breadcrumbs text-primary-focus flex-row">
        <ul>
          <li>
            <a>{{ props.upper }}</a>
          </li>
          <li>
            <a>{{ props.sub }}</a>
          </li>
          <li>
            <a>{{ props.detail }}</a>
          </li>
        </ul>
      </div>
      <button class="ml-0.5 btn-secondary px-6" @click="confirmDelete()">
        삭제
      </button>
    </div>
    <h1 class="font-bold text-3xl py-3">{{ props.title }}</h1>
    <div class="flex justify-between items-center border-b-2">
      <div class="text-sm">
        <span class="mr-1">{{ formatDate(props.createdAt) }}</span>
        <span class="text-xs">
          마지막으로 수정한 사람 : {{ props.author }}</span
        >
      </div>
      <div>
        <button class="btn btn-ghost">
          <ShareIcon class="w-5 h-5" />
        </button>
        <button class="ml-0.5 btn btn-ghost" @click="goEdit()">
          <PencilIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
    <div v-html="props.content" class="ProseMirror prose-lg h-max my-5"></div>
  </div>
</template>
<script setup>
import { ShareIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { useRouter, useRoute } from 'vue-router';
import { defineProps } from 'vue';
import { deletePost } from '@/api/posts';
import { sweetalert, sweetconfirm } from '@/assets/common';

const router = useRouter();

const route = useRoute();

const id = route.params.id;

const props = defineProps({
  title: String,
  content: String,
  author: String,
  createdAt: String,
  upper: String,
  sub: String,
  detail: String,
});

const formatDate = (dateData) => {
  var thisData = dateData
    ?.substring(0, 16)
    .replaceAll('-', '.')
    .replace('T', ' ');
  return thisData;
};

const goEdit = () => {
  router.push({
    name: 'edit',
    params: {
      nav: 'wonseo',
      id: id,
    },
  });
};

const confirmDelete = () => {
  sweetconfirm('진짜로 삭제할건가요??', 'warning').then((result) => {
    if (result.isConfirmed) doDelete();
    else return;
  });
};

const doDelete = async () => {
  var response = await deletePost(id);
  if (response.data.rowsAffected[0] >= 1) {
    sweetalert('글이 삭제되었습니다!', 'success', function () {
      router.push({ name: 'main', params: { nav: 'wonseo' } });
    });
  }
};
</script>
<style scoped>
.DETAIL::-webkit-scrollbar {
  width: 24px;
}
.DETAIL::-webkit-scrollbar-thumb {
  border-left: 20px solid #fff;
  background-clip: padding-box;
  background-color: rgb(228, 228, 228);
}
.DETAIL::-webkit-scrollbar-track {
  background-color: #fff;
}
</style>
