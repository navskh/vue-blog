<template>
  <div class="relative h-screen overflow-hidden">
    <Header />
    <div class="max-w-[1500px] h-[calc(100vh-140px)] flex gap-1 m-auto">
      <Sidebar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import Footer from "./components/Footer.vue";

// var toTopButton = document.getElementById("topButton");
</script>
