<template>
  <div class="h-[calc(100vh-168px)]">
    <div
      class="p-4 overflow-y-auto w-80 bg-base-100 text-md text-base-content border-r-2 h-full flex flex-col"
    >
      <button type="button" class="btn btn-primary w-full mb-6">글쓰기</button>
      <Accordion
        header="원서"
        :parameter="{
          name: 'main',
          params: { divOne: 'wonseo' },
        }"
      >
        <SidebarWonseo>
          <template v-slot:exception>
            <SidebarWonseoException />
          </template>
          <template v-slot:etc>
            <SidebarWonseoEtc />
          </template>
        </SidebarWonseo>
      </Accordion>

      <router-link
        :to="{ name: 'main', params: { divOne: 'admin' } }"
        class="side-link"
        >대학관리자</router-link
      >
      <router-link
        :to="{ name: 'main', params: { divOne: 'moa' } }"
        class="side-link"
        >내부관리자(MOA)</router-link
      >
      <Accordion
        header="입학상담앱"
        :parameter="{
          name: 'main',
          params: { divOne: 'consulting' },
        }"
      >
        <SidebarConsulting />
      </Accordion>
      <router-link
        :to="{ name: 'main', params: { divOne: 'nesin' } }"
        class="side-link"
        >내신산출</router-link
      >
      <router-link
        :to="{ name: 'main', params: { divOne: 'pims' } }"
        class="side-link"
        >PIMS</router-link
      >
      <router-link
        :to="{ name: 'main', params: { divOne: 'univ' } }"
        class="side-link"
        >대학별 특이사항</router-link
      >
      <router-link
        :to="{ name: 'main', params: { divOne: 'ens' } }"
        class="side-link"
        >콜/ENS/원격제어</router-link
      >
      <router-link
        :to="{ name: 'main', params: { divOne: 'host-sample' } }"
        class="side-link"
        >Host Sample</router-link
      >
    </div>
  </div>
</template>
<script>
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
});
</script>
<style>
.side-link {
  @apply py-2 px-3 hover:font-bold rounded-full;
}
</style>
