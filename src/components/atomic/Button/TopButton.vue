<template>
  <button
    id="topButton"
    @click="goToTop()"
    class="hidden fixed z-90 bottom-[1.5rem] right-[12rem] border-0 w-12 h-12 rounded-full drop-shadow-md bg-primary text-primary-content text-3xl font-bold"
  >
    <ArrowUpIcon class="w-8 m-auto" />
  </button>
</template>
<script setup>
import { ArrowUpIcon } from "@heroicons/vue/24/outline";

/** top 버튼 클릭 시 최상위로 스크롤 이동 */
function goToTop() {
  document
    .getElementsByClassName("DETAIL")[0]
    .scrollTo({ top: 0, behavior: "smooth" });
}
</script>
