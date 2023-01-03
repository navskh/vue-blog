<template>
  <div class="max-w-[1500px] m-auto">
    <div class="navbar flex justify-between pl-1 h-[100px]">
      <div>
        <router-link to="/" class="font-bold uppercase text-2xl"
          >Treasure Blog</router-link
        >
        <label className="swap swap-flip text-sm ml-2">
          <!-- this hidden checkbox controls the state -->
          <input v-model="isApply" type="checkbox" />

          <div className="swap-on">APPLY</div>
          <div className="swap-off">PIMS</div>
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          class="input input-bordered rounded-md mr-3 w-full max-w-xs focus:outline-none"
          v-model="searchData"
          @keyup.enter="submit"
        />
        <theme-vue></theme-vue>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, watchEffect } from "vue";
import ThemeVue from "./atomic/Theme.vue";
import { useRouter, useRoute } from "vue-router";

const emitter = inject("emitter");
const searchData = ref("");

const isApply = ref(true);

const router = useRouter();
const route = useRoute();

watchEffect(() => {
  if (
    isApply.value &&
    (route.path.indexOf("pims") > -1 || route.path.indexOf("call") > -1)
  ) {
    router.push("/");
  } else if (
    !isApply.value &&
    route.path.indexOf("pims") == -1 &&
    route.path.indexOf("call") == -1
  ) {
    router.push("/pims");
  }
}, [isApply.value]);

const submit = () => {
  emitter.emit("Search", searchData);
};

emitter.on("Init", () => {
  searchData.value = "";
});
</script>
<style></style>
