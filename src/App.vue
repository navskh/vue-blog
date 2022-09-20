<template>
  <Header />
  <div class="flex">
    <Sidebar />
    <Article />
  </div>
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';
import Article from './components/Article.vue';
export default {
  name: 'App',
  components: { Header, Sidebar, Footer, Article },
};
</script>

<style></style>
