<template>
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'etc',
        divThree: 'non-object',
      },
    }"
    class="side-link"
    >NonObject</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'wonseo', divTwo: 'etc', divThree: 'validate' },
    }"
    class="side-link"
    >원서 데이터 오류 검증</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'wonseo', divTwo: 'etc', divThree: 'oz' },
    }"
    class="side-link"
    >오즈</router-link
  >
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarWonseoEtc",
});
</script>
