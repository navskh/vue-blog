<template>
  <div class="max-w-[1500px] m-auto">
    <Header />
    <div class="flex">
      <Sidebar />
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: { Header, Sidebar, Footer },
};
</script>

<style></style>