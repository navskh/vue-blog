<template>
  <div class="max-w-[1500px] m-auto">
    <div class="navbar flex justify-between pl-1 h-[80px]">
      <div>
        <router-link to="/" class="font-bold uppercase text-2xl"
          >Treasure Blog</router-link
        >
        <label className="swap swap-flip text-sm ml-2">
          <!-- this hidden checkbox controls the state -->
          <!-- <input v-model="treasureInfo.mode" type="checkbox" /> -->
          <input v-model="mode" @click="chgMode" type="checkbox" />

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
import useTreasureInfoStore from "@/stores/TreasureData";

const emitter = inject("emitter");
const treasureInfo = useTreasureInfoStore();
const searchData = ref("");

let thisMode = localStorage.getItem("thisMode");

treasureInfo.mode = thisMode ?? 'apply';

const router = useRouter();
const route = useRoute();

const mode = ref(true);


const chgMode = () => {
  console.log("mode: ", mode.value);
  console.log("treasure: ", treasureInfo.mode);
  if (treasureInfo.mode == 'pims') {
    localStorage.setItem("thisMode", "apply");
    treasureInfo.mode = 'apply';
    router.push("/");
  } else if (treasureInfo.mode == 'apply') {
    localStorage.setItem("thisMode", "pims");
    treasureInfo.mode = 'pims';
    router.push("/pims");
  } else {
    localStorage.setItem("thisMode", "pims");
    treasureInfo.mode = 'pims';
    router.push("/pims");
  }
};

const submit = () => {
  var data = { isApply: treasureInfo.mode, searchData: searchData };
  emitter.emit("Search", data);
  // treasureInfo.searchKeyword = "";
};

// emitter.on("Init", () => {
//   treasureInfo.searchKeyword = "";
// });
</script>
<style></style>
