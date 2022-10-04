<template>
  <div class="max-w-[1500px] m-auto h-screen">
    <Header />
    <div class="flex">
      <Sidebar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/sidebar/Sidebar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
body {
  overflow: hidden;
}
</style>
