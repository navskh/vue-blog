<template>
  <div class="h-[calc(100vh-168px)]">
    <div
      class="p-4 overflow-y-auto w-80 bg-base-100 text-md text-base-content border-r-2 h-full"
    >
      <button
        type="button"
        class="btn btn-primary w-full mb-6"
        @click="goWrite"
      >
        글쓰기
      </button>
      <SidebarItem :list="sidebarCategory" :selectPath="selectPath" />
    </div>
  </div>
</template>
<script setup>
import sidebarCategory from "@/assets/sidebarCategory.js";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import SidebarItem from "./SidebarItem.vue";

const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  await router.isReady();
});

const selectPath = computed(() => {
  return route.path;
});
</script>
