<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap items-center justify-between cursor-pointer">
      <router-link :to="parameter" class="side-link">
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
    parameter: {
      required: true,
    },
  },
  components: { ChevronUpIcon, ChevronDownIcon },
  setup(props) {
    console.log("param", props.parameter);
    const isOpen = ref(false);

    const open = (e) => {
      e.preventDefault();
      isOpen.value = !isOpen.value;
    };

    return { open, isOpen };
  },
});
</script>
<style></style>
