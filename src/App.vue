<template>
  <div class="relative h-screen overflow-hidden">
    <Header />
    <div class="max-w-[1500px] h-[calc(100vh-140px)] flex gap-1 m-auto">
      <Sidebar />
      <router-view @update:scroll="showTopBtn" />
    </div>
    <button
      id="topButton"
      @click="goToTop()"
      title="Go To Top"
      class="hidden fixed z-90 bottom-[3.5rem] right-[9rem] border-0 w-16 h-16 rounded-full drop-shadow-md bg-primary text-primary-content text-3xl font-bold"
    >
      <ArrowUpIcon class="w-10 m-auto" />
    </button>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Sidebar from "./components/sidebar/Sidebar.vue";
import Footer from "./components/Footer.vue";

import { ArrowUpIcon } from "@heroicons/vue/24/outline";

// var toTopButton = document.getElementById("topButton");

// When the user scrolls down 200px from the top of the document, show the button
function showTopBtn(scrollLength) {
  console.log("evet: ", scrollLength);
  if (scrollLength > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("topButton").classList.remove("hidden");
  } else {
    document.getElementById("topButton").classList.add("hidden");
  }
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
  console.log("gototop");
  document
    .getElementsByClassName("DETAIL")[0]
    .scrollTo({ top: 0, behavior: "smooth" });
}
</script>
