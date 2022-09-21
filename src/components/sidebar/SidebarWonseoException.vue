<template>
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'print-list',
      },
    }"
    class="side-link"
    >출력물</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { divOne: 'wonseo', divTwo: 'exception', divThree: 't5' },
    }"
    class="side-link"
    >전산파일</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'suhum-no',
      },
    }"
    class="side-link"
    >수험번호</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'duplicate',
      },
    }"
    class="side-link"
    >중복지원
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'pay-begin',
      },
    }"
    class="side-link"
    >결제전
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'pay-result',
      },
    }"
    class="side-link"
    >결제후
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        divOne: 'wonseo',
        divTwo: 'exception',
        divThree: 'pay-info',
      },
    }"
    class="side-link"
    >결제료
  </router-link>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarWonseoException",
});
</script>
