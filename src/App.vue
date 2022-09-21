<template>
  <Header />
  <div class="flex">
    <Sidebar />
    <PostDetail />
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import PostDetail from "./views/PostDetail.vue";

export default {
  name: "App",
  components: { Header, Sidebar, Footer, PostDetail },
};
</script>

<style></style>
