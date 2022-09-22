<template>
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'etc', 'non-object'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/etc/non-object' && 'selected'"
    >NonObject</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['wonseo', 'etc', 'validate'] },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/etc/validate' && 'selected'"
    >원서 데이터 오류 검증</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['wonseo', 'etc', 'oz'] },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/etc/oz' && 'selected'"
    >오즈</router-link
  >
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarWonseoEtc",
  props: {
    selectParam: {},
  },
});
</script>
