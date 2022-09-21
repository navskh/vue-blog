<template>
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'consulting', divTwo: 'foundation' },
    }"
    class="side-link"
    >기초</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'consulting', divTwo: 'admin' },
    }"
    class="side-link"
    >관리자</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'consulting', divTwo: 'exception' },
    }"
    class="side-link"
    >예외처리
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'consulting', divTwo: 'build' },
    }"
    class="side-link"
    >배포</router-link
  >
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarConsulting",
});
</script>
