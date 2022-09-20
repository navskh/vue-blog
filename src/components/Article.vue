<template lang="">
  <div class="w-full flex flex-col items-center mt-10">
    <div class="overflow-x-auto min-w-[1000px]">
      <table class="table w-[950px] mx-3">
        <!-- head -->
        <thead>
          <tr>
            <th class="w-[60%]">Title</th>
            <th class="w-[20%]">Author</th>
            <th class="w-[10%]">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in mockupData" :key="index" class="hover">
            <td>
              <p>{{ truncate(data.title) }}</p>
            </td>
            <td>
              <p>{{ truncate(data.author, 10) }}</p>
            </td>
            <td>{{ data.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full m-7 px-7 flex justify-center gap-3 text-lg">
      <button
        v-for="n in 4"
        :key="n"
        :class="{ 'btn-selected': isActive === n }"
        @click="
          () => {
            isActive = n;
          }
        "
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

let isActive = ref(0);
const truncate = (text, maxLength = 70) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
};
const mockupData = [
  { title: 'hi', author: 'yes', date: '2022-05-15' },
  { title: '어쩌구 저쩌구 건에 대하여..', author: 'yes', date: '2022-05-15' },
  { title: '오잉 또잉', author: 'yes', date: '2022-05-15' },
  {
    title:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    author: 'yes',
    date: '2022-05-15',
  },
  {
    title: 'hi',
    author:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    date: '2022-05-15',
  },
  { title: 'hi', author: 'yes', date: '2022-05-15' },
  { title: 'hi', author: 'yes', date: '2022-05-15' },
  { title: 'hi', author: 'yes', date: '2022-05-15' },
];
</script>
<style>
.btn-selected {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
