<template>
  <div
    class="w-full mt-10 min-w-[1000px] min-h-[800px] overflow-y-auto overflow-x-hidden"
  >
    <div class="flex flex-col items-center">
      <div class="-translate-x-[400px]">
        <h1 class="text-2xl mb-7">Page name</h1>
      </div>
      <table class="table w-[800px] mx-5">
        <!-- head -->
        <thead>
          <tr>
            <th class="min-w-[700px] tracking-widest">뭐를</th>
            <th class="w-[20%] tracking-widest">누가</th>
            <th class="w-[10%] tracking-widest">언제</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in mockupData" :key="index">
            <td>
              <router-link to="/wonseo/1">
                <p
                  class="hover:cursor-pointer w-max hover:after:content-['#'] hover:after:ml-2 hover:after:font-semibold hover:after:text-secondary-focus hover:text-secondary-focus"
                >
                  {{ truncate(data.title) }}
                </p>
              </router-link>
            </td>
            <td>
              <p>{{ truncate(data.author, 10) }}</p>
            </td>
            <td>{{ formatDate(data.date) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-full m-7 px-7 flex justify-center gap-3 text-lg">
        <button
          v-for="n in 4"
          :key="n"
          :class="{ 'btn-selected': isActive === n }"
          @click="handleButtonClick(n)"
        >
          {{ n }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

let isActive = ref(1);
const handleButtonClick = (n) => {
  isActive.value = n;
};
const truncate = (text, maxLength = 45) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};
const formatDate = (dateData) => {
  const year = dateData.getFullYear();
  const month = dateData.getMonth() + 1;
  const date = dateData.getDate();
  return year + "." + month + "." + date + ".";
};
const mockupData = [
  { title: "hi", author: "yes", date: new Date() },
  { title: "어쩌구 저쩌구 건에 대하여..", author: "yes", date: new Date() },
  { title: "오잉 또잉", author: "yes", date: new Date() },
  {
    title:
      "그것을 내는 구하지 앞이 천하를 얼마나 품었기 것이 든 것이다. 천지는 따뜻한 고동을 것은 새가 듣는다. 바이며, 있는 우리 위하여, 운다. 가치를 인간은 불어 역사를 쓸쓸한 있다. 방지하는 노년에게서 무한한 봄날의 바이며, 봄바람이다. 속잎나고, 이것은 그러므로 바이며, 우리는 청춘에서만 우리의 이상 피다. 아니더면, 보이는 우리 원질이 부패뿐이다. 피어나기 어디 일월과 새가 속에서 거선의 할지니, 황금시대다. 불어 어디 뜨고, 위하여서 청춘의 곳으로 돋고, 얼음에 뿐이다.",
    author: "yes",
    date: new Date(),
  },
  {
    title: "hi",
    author:
      "그것을 내는 구하지 앞이 천하를 얼마나 품었기 것이 든 것이다. 천지는 따뜻한 고동을 것은 새가 듣는다. 바이며, 있는 우리 위하여, 운다. 가치를 인간은 불어 역사를 쓸쓸한 있다. 방지하는 노년에게서 무한한 봄날의 바이며, 봄바람이다. 속잎나고, 이것은 그러므로 바이며, 우리는 청춘에서만 우리의 이상 피다. 아니더면, 보이는 우리 원질이 부패뿐이다. 피어나기 어디 일월과 새가 속에서 거선의 할지니, 황금시대다. 불어 어디 뜨고, 위하여서 청춘의 곳으로 돋고, 얼음에 뿐이다.",
    date: new Date(),
  },
  { title: "hi", author: "yes", date: new Date() },
  { title: "hi", author: "yes", date: new Date() },
  { title: "hi", author: "yes", date: new Date() },
  { title: "hi", author: "yes", date: new Date() },
  { title: "hi", author: "yes", date: new Date() },
];
</script>
<style>
.btn-selected {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
