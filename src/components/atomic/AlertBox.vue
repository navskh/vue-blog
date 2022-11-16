<template>
  <div
    class="fixed right-[45%] blink alert bg-error text-error-content flex justify-start w-fit"
    v-show="props.warningContent != ''"
  >
    <ExclamationTriangleIcon class="w-6" />
    <span>{{ props.warningContent }}</span>
  </div>
</template>
<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  warningContent: String,
});
</script>
<style scoped>
@keyframes blink-effect {
  0% {
    opacity: 1;
    top: 0;
  }
  30% {
    top: 1.5rem;
  }
  50% {
    top: 1.5rem;
    opacity: 0.7;
  }
  100% {
    top: 1.5rem;
    opacity: 0;
  }
}

.blink {
  animation: blink-effect 2s ease-out infinite;
}
</style>
