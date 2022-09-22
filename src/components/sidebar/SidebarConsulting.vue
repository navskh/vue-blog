<template>
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['consulting', 'foundation'] },
    }"
    class="side-link"
    :class="selectParam === '/consulting/foundation' && 'selected'"
    >기초</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['consulting', 'admin'] },
    }"
    class="side-link"
    :class="selectParam === '/consulting/admin' && 'selected'"
    >관리자</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['consulting', 'exception'] },
    }"
    class="side-link"
    :class="selectParam === '/consulting/exception' && 'selected'"
    >예외처리
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['consulting', 'build'] },
    }"
    class="side-link"
    :class="selectParam === '/consulting/build' && 'selected'"
    >배포</router-link
  >
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarConsulting",
  props: {
    selectParam: {},
  },
});
</script>
