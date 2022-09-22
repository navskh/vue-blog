<template>
  <div class="flex flex-col" v-for="item in list" :key="item.name">
    <Accordion
      :header="item.name"
      :params="item.params"
      :path="item.path"
      :selectPath="selectPath"
      v-if="item.children.length > 0"
    >
      <SidebarItem :list="item.children" :selectPath="selectPath" />
    </Accordion>

    <router-link
      :to="{ name: 'main', params: item.params }"
      class="side-link"
      :class="selectPath === item.path && 'selected'"
      v-else
      >{{ item.name }}</router-link
    >
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Accordion from "../atomic/Accordion.vue";

export default defineComponent({
  name: "SidebarItem",
  props: {
    list: { required: true },
    selectPath: { required: true },
  },
  components: {
    Accordion,
  },
});
</script>
<style>
.selected {
  @apply text-secondary-focus font-bold;
}
</style>
