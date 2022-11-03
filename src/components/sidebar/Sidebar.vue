<template>
  <div class="h-[calc(100vh-100px)]">
    <div
      class="p-4 w-[18rem] bg-base-100 text-md text-base-content h-[calc(100vh-100px)]"
    >
      <button
        type="button"
        class="btn btn-primary w-full mb-6"
        @click="goWrite"
      >
        글쓰기
      </button>
      <div class="SIDEBAR h-[calc(100vh-150px)] pb-11 overflow-y-auto">
        <div class="py-2 px-3">
          <router-link
            to="/"
            class="side-link"
            :class="selectPath === '/' && 'selected'"
            >전체보기</router-link
          >
        </div>
        <SidebarItem :list="sidebarCategory" :selectPath="selectPath" />
      </div>
    </div>
  </div>
</template>
<script setup>
import sidebarCategory from "@/assets/sidebarCategory.js";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import SidebarItem from "./SidebarItem.vue";
import { inject } from "vue";
const emitter = inject("emitter");

const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  await router.isReady();
});

const selectPath = computed(() => {
  emitter.emit("Init");
  return route.path;
});

const goWrite = async () => {
  router.push({
    name: "write",
    params: {
      nav: "wonseo",
    },
  });
};
</script>
<style>
.SIDEBAR::-webkit-scrollbar {
  display: none;
}
.selected {
  @apply text-secondary-focus font-bold;
}
</style>
