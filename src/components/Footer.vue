<template>
  <footer class="absolute bottom-0 w-full">
    <div class="footer p-4 bg-base-200  h-[40px] flex justify-center items-center">
      <p>Copyright © {{ date.getFullYear() }}.  Young, whitejang, hjkwon, deftones - All right reserved</p>
    </div>
  </footer>
</template>
<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const date = new Date();
const router = useRouter();

const emitter = inject('emitter');
emitter.on('Search', (e) => {
  console.log(e);
  router.push({
    name: 'main',
    params: {
      nav: 'search' + e.value,
    },
  },)
});
</script>
