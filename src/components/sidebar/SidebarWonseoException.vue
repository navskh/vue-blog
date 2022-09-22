<template>
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'print-list'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/print-list' && 'selected'"
    >출력물</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: { nav: ['wonseo', 'exception', 't5'] },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/t5' && 'selected'"
    >전산파일</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'suhum-no'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/suhum-no' && 'selected'"
    >수험번호</router-link
  >
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'duplicate'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/duplicate' && 'selected'"
    >중복지원
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'pay-begin'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/pay-begin' && 'selected'"
    >결제전
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'pay-result'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/pay-result' && 'selected'"
    >결제후
  </router-link>
  <router-link
    :to="{
      name: 'main',
      params: {
        nav: ['wonseo', 'exception', 'pay-info'],
      },
    }"
    class="side-link"
    :class="selectParam === '/wonseo/exception/pay-info' && 'selected'"
    >결제료
  </router-link>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SidebarWonseoException",
  props: {
    selectParam: {},
  },
});
</script>
