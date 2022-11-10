<template>
  <div class="relative h-screen">
    <Header />
    <div class="max-w-[1500px] flex gap-1 m-auto">
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

