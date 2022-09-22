<template>
  <router-link
    :to="{ name: 'main', params: { nav: ['wonseo', 'ratio'] } }"
    class="side-link"
    :class="selectParam === '/wonseo/ratio' && 'selected'"
    >경쟁률</router-link
  >
  <router-link
    :to="{ name: 'main', params: { nav: ['wonseo', 'jx'] } }"
    class="side-link"
    :class="selectParam === '/wonseo/jx' && 'selected'"
    >JX</router-link
  >
  <Accordion
    header="예외처리"
    :router="{
      name: 'main',
      params: { nav: ['wonseo', 'exception'] },
    }"
    :selectParam="selectParam"
  >
    <slot name="exception"></slot>
  </Accordion>

  <Accordion
    header="기타"
    :router="{
      name: 'main',
      params: { nav: ['wonseo', 'etc'] },
    }"
    :selectParam="selectParam"
  >
    <slot name="etc"></slot>
  </Accordion>
</template>
<script>
import { defineComponent } from "vue";
import Accordion from "../atomic/Accordion.vue";

export default defineComponent({
  name: "SidebarWonseo",
  components: {
    Accordion,
  },
  props: {
    selectParam: {},
  },
});
</script>
