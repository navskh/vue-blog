<template>
  <router-link
    :to="{ name: 'main', params: { divOne: 'wonseo', divTwo: 'ratio' } }"
    class="side-link"
    >경쟁률</router-link
  >
  <router-link
    :to="{ name: 'main', params: { divOne: 'wonseo', divTwo: 'jx' } }"
    class="side-link"
    >JX</router-link
  >
  <Accordion
    header="예외처리"
    :parameter="{
      name: 'main',
      params: { divOne: 'wonseo', divTwo: 'exception' },
    }"
  >
    <slot name="exception"></slot>
  </Accordion>

  <Accordion
    header="기타"
    :parameter="{
      name: 'main',
      params: { divOne: 'wonseo', divTwo: 'etc' },
    }"
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
});
</script>
