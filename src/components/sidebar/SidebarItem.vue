<template>
  <div class="py-2 pr-1 h-max" v-for="item in list" :key="item.name">
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
<script setup>
import Accordion from "../atomic/Accordion.vue";

defineProps({
  list: { required: true },
  selectPath: { required: true },
});
</script>
<style scoped>
.selected {
  @apply text-secondary-focus font-bold;
}
.side-link {
  @apply focus:outline-none focus:border-secondary-focus focus:border hover:font-bold rounded m-1;
}
</style>
