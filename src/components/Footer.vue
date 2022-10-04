<template>
  <footer
    class="footer p-4 bg-base-200 w-full h-[40px] flex justify-center items-center"
  >
    <p>Copyright © {{ date.getFullYear() }} - All right reserved</p>
  </footer>
</template>
<script setup>
const date = new Date();
</script>
