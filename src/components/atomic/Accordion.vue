<template>
  <div class="">
    <div class="flex flex-wrap items-center justify-between cursor-pointer">
      <router-link
        :to="{ name: 'main', params: params }"
        class="side-link"
        :class="selectPath === path && 'selected'"
      >
        <h3 class="text-md hover:font-bold">
          {{ header }}
        </h3>
      </router-link>
      <div @click="open">
        <ChevronUpIcon class="h-6 w-6 text-base-content" v-show="isOpen" />
        <ChevronDownIcon class="h-6 w-6 text-base-content" v-show="!isOpen" />
      </div>
    </div>
    <div v-if="isOpen" class="pl-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

defineProps({
  header: {
    required: true,
  },
  params: {
    required: true,
  },
  path: {
    required: true,
  },
  selectPath: {
    required: true,
  },
});
const isOpen = ref(false);

const open = (e) => {
  e.preventDefault();
  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.selected {
  @apply text-secondary-focus font-bold;
}
.side-link {
  @apply focus:outline-none focus:border-secondary-focus focus:border rounded m-1;
}
</style>
