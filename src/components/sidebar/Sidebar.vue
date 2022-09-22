<template>
  <div class="h-[calc(100vh-168px)]">
    <div
      class="p-4 overflow-y-auto w-80 bg-base-100 text-md text-base-content border-r-2 h-full flex flex-col"
    >
      <button type="button" class="btn btn-primary w-full mb-6">글쓰기</button>
      <Accordion
        header="원서"
        :router="{
          name: 'main',
          params: { nav: ['wonseo'] },
        }"
        :selectParam="selectParam"
      >
        <SidebarWonseo :selectParam="selectParam">
          <template v-slot:exception>
            <SidebarWonseoException :selectParam="selectParam" />
          </template>
          <template v-slot:etc>
            <SidebarWonseoEtc :selectParam="selectParam" />
          </template>
        </SidebarWonseo>
      </Accordion>

      <router-link
        :to="{ name: 'main', params: { nav: ['admin'] } }"
        class="side-link"
        :class="selectParam === '/admin' && 'selected'"
        >대학관리자</router-link
      >
      <router-link
        :to="{ name: 'main', params: { nav: ['moa'] } }"
        class="side-link"
        :class="selectParam === '/moa' && 'selected'"
        >내부관리자(MOA)</router-link
      >
      <Accordion
        header="입학상담앱"
        :router="{
          name: 'main',
          params: { nav: ['consulting'] },
        }"
        :selectParam="selectParam"
      >
        <SidebarConsulting :selectParam="selectParam" />
      </Accordion>
      <router-link
        :to="{ name: 'main', params: { nav: ['nesin'] } }"
        class="side-link"
        :class="selectParam === '/nesin' && 'selected'"
        >내신산출</router-link
      >
      <router-link
        :to="{ name: 'main', params: { nav: ['pims'] } }"
        class="side-link"
        :class="selectParam === '/pims' && 'selected'"
        >PIMS</router-link
      >
      <router-link
        :to="{ name: 'main', params: { nav: ['univ'] } }"
        class="side-link"
        :class="selectParam === '/univ' && 'selected'"
        >대학별 특이사항</router-link
      >
      <router-link
        :to="{ name: 'main', params: { nav: ['ens'] } }"
        class="side-link"
        :class="selectParam === '/ens' && 'selected'"
        >콜/ENS/원격제어</router-link
      >
      <router-link
        :to="{ name: 'main', params: { nav: ['host-sample'] } }"
        class="side-link"
        :class="selectParam === '/host-sample' && 'selected'"
        >Host Sample</router-link
      >
    </div>
  </div>
</template>
<script>
import { computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { defineComponent } from "vue";
import Accordion from "../atomic/Accordion.vue";
import SidebarWonseo from "./SidebarWonseo.vue";
import SidebarConsulting from "./SidebarConsulting.vue";
import SidebarWonseoException from "./SidebarWonseoException.vue";
import SidebarWonseoEtc from "./SidebarWonseoEtc.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    Accordion,
    SidebarWonseo,
    SidebarConsulting,
    SidebarWonseoException,
    SidebarWonseoEtc,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    onBeforeMount(async () => {
      await router.isReady();
    });

    const selectParam = computed(() => {
      return route.path;
    });

    return { selectParam };
  },
});
</script>
<style>
.side-link {
  @apply py-2 px-3 hover:font-bold rounded-full;
}
.selected {
  @apply text-secondary-focus font-bold;
}
</style>
