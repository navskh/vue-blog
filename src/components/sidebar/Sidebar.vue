<template>
    <div class="SIDEBAR p-4 w-[18rem] text-md text-base-content h-[calc(100vh-140px)] ">
      <button
        type="button"
        class="btn btn-primary w-full mb-6"
        @click="goWrite"
      >
        글쓰기
      </button>
      <div class="pb-11">
        <div class="py-2 px-3">
          <router-link
            to="/"
            class="side-link"
            :class="selectPath === '/' && 'selected'"
            >전체보기</router-link
          >
        </div>
        <div class="MENU h-[calc(100vh-270px)] overflow-y-auto">
        <SidebarItem :list="sidebarCategory" :selectPath="selectPath" /></div>
      </div>
    </div>
</template>
<script setup>
import sidebarCategory from '@/assets/sidebarCategory.js';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import { inject } from 'vue';
const emitter = inject('emitter');

const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  await router.isReady();
});

const selectPath = computed(() => {
  emitter.emit('Init');
  return route.path;
});

const goWrite = async () => {
  router.push({
    name: 'write',
    params: {
      nav: 'wonseo',
    },
  });
};
</script>
<style >
.MENU::-webkit-scrollbar {
  width: 2px;
  background-color: rgba(255, 255, 255, 0);
}
.MENU::-webkit-scrollbar-thumb {
  border-bottom: 20px solid rgba(255, 255, 255, 0); 
  background-clip: padding-box;
  background-color: rgba(140, 140, 140, 0.295);
}
.selected {
  @apply text-secondary-focus font-bold;
}
</style>
