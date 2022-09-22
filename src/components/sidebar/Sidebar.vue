<template>
  <div class="h-[calc(100vh-168px)]">
    <div
      class="p-4 overflow-y-auto w-80 bg-base-100 text-md text-base-content border-r-2 h-full"
    >
      <button type="button" class="btn btn-primary w-full mb-6">글쓰기</button>
      <SidebarItem :list="sidebarCategory" :selectPath="selectPath" />
    </div>
  </div>
</template>
<script>
import sidebarCategory from "@/assets/sidebarCategory.js";
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { defineComponent } from "vue";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(async () => {
      await router.isReady();
    });

    const selectPath = computed(() => {
      return route.path;
    });
    console.log(sidebarCategory);

    return { sidebarCategory, selectPath };
  },
});
</script>
