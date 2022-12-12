<template>
    <div class="max-w-[1500px] m-auto">
      <div class="navbar flex justify-between pl-1 h-[100px]">
        <router-link to="/" class="btn btn-ghost uppercase text-2xl"
          >Treasure Blog</router-link
        >
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
import { inject, ref } from 'vue';
import ThemeVue from './atomic/Theme.vue';

const emitter = inject('emitter');
const searchData = ref('');

const submit = () => {
  emitter.emit('Search', searchData);
};

emitter.on('Init', () => {
  searchData.value = '';
});
</script>
<style></style>
