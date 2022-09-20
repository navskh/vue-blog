<template>
  <div class="flex justify-center">
    <div class="max-w-[1800px]">
      <Header />
      <div class="flex">
        <Sidebar />
        <Article />
      </div>
      <Footer />
    </div>
  </div>
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
