<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap items-center justify-between cursor-pointer">
      <router-link
        :to="router"
        class="side-link"
        :class="selectParam === path && 'selected'"
      >
        <h3 class="text-md hover:font-bold">
          {{ header }}
        </h3>
      </router-link>
      <div @click="open">
        <ChevronUpIcon class="h-6 w-6 text-gray-700" v-show="isOpen" />
        <ChevronDownIcon class="h-6 w-6 text-gray-700" v-show="!isOpen" />
      </div>
    </div>
    <div v-if="isOpen" class="flex flex-col pl-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "Accordion",
  props: {
    header: {
      required: true,
    },
    router: {
      required: true,
    },
    selectParam: {},
  },
  components: { ChevronUpIcon, ChevronDownIcon },
  setup(props) {
    const isOpen = ref(false);
    const path = "/" + props.router.params.nav.join("/");

    const open = (e) => {
      e.preventDefault();
      isOpen.value = !isOpen.value;
    };

    return { open, isOpen, path };
  },
});
</script>
<style></style>
