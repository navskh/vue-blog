<template>
  <div
    class="m-1 mt-2 flex justify-center items-center gap-3 text-lg btn-group"
  >
    <ChevronLeftIcon
      @click="() => changePagination(-1)"
      v-show="pagingCnt[0] != 1"
      class="h-4 w-4 cursor-pointer"
    />
    <button
      v-for="n in pagingCnt"
      :key="n"
      :class="{ 'btn-selected': isActive === n }"
      @click="buttonClick(n)"
    >
      {{ n }}
    </button>
    <ChevronRightIcon
      @click="() => changePagination(1)"
      class="h-4 w-4 cursor-pointer"
      v-show="pagingCnt[pagingCnt.length - 1] != props.totalCnt"
    />
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount, onUpdated, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import useTreasureInfoStore from "@/stores/TreasureData";
const treasureInfo = useTreasureInfoStore();

const pagebarSize = 10;
// const limit = ref(0);
const isActive = ref(1);
const pageStart = ref(1);
const pageEnd = ref(10);

const calPaging = () => {
  console.log("call!");
  pageStart.value =
    (Math.floor(isActive.value - 1) / pagebarSize) * pagebarSize + 1;
  pageEnd.value = pageStart.value + pagebarSize - 1;
  console.log(pageStart.value);
  console.log(pageEnd.value);
  // if (pageEnd.value >= limit.value) {
  //   console.log("yaaaaaaaaaa");
  //   console.log(parseInt(props.totalCnt % pagebarSize));
  //   pageEnd.value = props.totalCnt;
  // }
};
const pagingCnt = computed(() => {
  return [...Array(pageEnd.value - pageStart.value + 1).keys()].map(
    (x) => x + pageStart.value
  );
});

const changePagination = (flag) => {
  if (flag === 1) {
    isActive.value = pageEnd.value + 1;
    emits("update:handleButtonClick", isActive.value);
  } else if (flag === -1) {
    isActive.value = pageStart.value - pagebarSize;
    emits("update:handleButtonClick", isActive.value);
  } else {
    isActive.value = 1;
  }

  calPaging();
};

const props = defineProps({
  totalCnt: Number,
});
const emits = defineEmits(["update:handleButtonClick"]);

const buttonClick = (n) => {
  isActive.value = n;
  emits("update:handleButtonClick", n);
};

onMounted(() => {
  calPaging();
});
</script>
<style scoped>
.btn-selected {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
