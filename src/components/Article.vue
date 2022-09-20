<template lang="">
  <div class="w-full flex justify-center items-center">
    <div
      class="article-cards w-full h-[calc(100vh-170px)] py-10 px-10 flex flex-wrap gap-10 overflow-y-auto"
    >
      <div v-for="n in 12" :key="n">
        <!-- atomic component -->
        <button class="hover-btn">
          <div
            class="card w-96 bg-base-100 shadow-lg h-[200px] hover:shadow-2xl"
          >
            <div class="card-body">
              <h2 class="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </button>
        <!-- -->
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style></style>
