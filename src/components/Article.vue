<template>
  <div class="w-full mt-4 min-w-[1000px] h-full overflow-y-auto">
    <div class="flex flex-col items-center pl-3">
      <div class="TITLE w-full pl-5">
        <div class="text-sm breadcrumbs text-primary-focus flex-row">
          <ul>
            <li>
              <a>{{ pageRoute[0] }}</a>
            </li>
            <li v-if="pageRoute[1] != '전체'">
              <a>{{ pageRoute[1] }}</a>
            </li>
            <li v-if="pageRoute[2] != '전체'">
              <a>{{ pageRoute[2] }}</a>
            </li>
          </ul>
        </div>
        <h1 class="text-2xl font-bold mb-7">{{ pageName }}</h1>
      </div>
      <div class="CONTENT w-full overflow-y-auto overflow-x-hidden">
        <table class="table w-[90%] mx-5 border-collapse">
          <!-- head -->
          <thead>
            <tr class="sticky top-0 z-1">
              <th class="tracking-widest">제목</th>
              <th class="w-[20%] tracking-widest">작성자</th>
              <th class="w-[15%] tracking-widest">수정일</th>
              <th class="w-[15%] tracking-widest">작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in notices" :key="index">
              <td>
                <p
                  class="hover:cursor-pointer w-max hover:after:content-['#'] hover:after:ml-2 hover:after:font-semibold hover:after:text-secondary-focus hover:text-secondary-focus"
                  @click="goPage(data)"
                >
                  <b>
                    <span class="kbd-sm">[공지]</span>
                    {{ truncate(data.Title) }}
                  </b>
                  <span
                    v-if="(data.UpdateTime ?? data.WriteTime) > today()"
                    class="badge leading-[unset]"
                    >new</span
                  >
                </p>
              </td>
              <td>
                <p>공지</p>
              </td>
              <td>{{ formatDate(data.UpdateTime ?? data.WriteTime) }}</td>
              <td>{{ formatDate(data.WriteTime) }}</td>
            </tr>
            <tr v-for="(data, index) in posts" :key="index">
              <td>
                <p
                  class="hover:cursor-pointer w-max hover:after:content-['#'] hover:after:ml-2 hover:after:font-semibold hover:after:text-secondary-focus hover:text-secondary-focus"
                  @click="goPage(data)"
                >
                  <span class="kbd-xs">
                    {{
                      data.UpperCategory == "0"
                        ? "기타"
                        : data.UpperCategoryName
                    }}
                  </span>
                  {{ truncate(data.Title) }}
                  <span
                    v-if="(data.UpdateTime ?? data.WriteTime) > today()"
                    class="badge leading-[unset]"
                    >new</span
                  >
                </p>
              </td>
              <td>
                <p>{{ truncate(data.Author, 10) }}</p>
              </td>
              <td>{{ formatDate(data.UpdateTime ?? data.WriteTime) }}</td>
              <td>{{ formatDate(data.WriteTime) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="m-7 px-7 flex justify-center gap-3 text-lg">
          <button
            v-for="n in totalCnt"
            :key="n"
            :class="{ 'btn-selected': isActive === n }"
            @click="handleButtonClick(n)"
          >
            {{ n }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { computed, onBeforeMount, ref, watchEffect, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAxios } from "@/hooks/useAxios";
import { getLists, getNotices } from "@/api/posts";
import sidebarCategory from "@/assets/sidebarCategory";
import { inject } from "vue";

const router = useRouter();

const route = useRoute();

const pageName = ref("");
const pageRoute = ref([]);
const searchKeyword = ref("");

var isSearch = false;
const searchResult = () => {
  pageRoute.value[0] = "-";
  pageRoute.value[1] = "-";
  pageRoute.value[2] = "-";
  pageName.value = `'${searchKeyword.value}' 검색결과`;
};

const matchName = (thisRoute) => {
  var result1 = {},
    result2 = {},
    result3 = {};
  result1 = sidebarCategory.find(
    (category) => category.params.nav[0] == thisRoute.nav[0]
  );
  result2 = result1?.children.find(
    (category) => category.params.nav[1] == thisRoute.nav[1]
  );
  result3 = result2?.children.find(
    (category) => category.params.nav[2] == thisRoute.nav[2]
  );

  pageRoute.value[0] = result1 == undefined ? "전체" : result1.name;
  pageRoute.value[1] = result2 == undefined ? "전체" : result2.name;
  pageRoute.value[2] = result3 == undefined ? "전체" : result3.name;

  pageName.value = "전체";
  pageRoute.value.forEach((ele) => {
    if (ele != "전체") pageName.value = ele;
  });
};

const truncate = (text, maxLength = 45) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

const formatDate = (dateData) => {
  var thisData = dateData.substring(2, 10).replaceAll("-", ".");
  return thisData;
};

const goPage = (dataMap) => {
  router.push({
    name: "detail",
    params: {
      nav: "wonseo",
      id: dataMap.idx,
    },
  });
};

var posts = ref([]);
var totalCnt = ref(null);
var allData = [];
var notices = ref([]);

const today = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + (date.getDate() - 1)).slice(-2);

  return year + "-" + month + "-" + day;
};

let isActive = ref(1);
const handleButtonClick = (n) => {
  isActive.value = n;
  posts.value = allData[n - 1];
};

const fetchList = async () => {
  var condition = [];
  condition[0] = pageRoute.value[0];
  condition[1] = pageRoute.value[1];
  condition[2] = pageRoute.value[2];

  // if (pageRoute.value[0] == '기타') condition = ['전체', '전체', '전체'];
  condition[3] = searchKeyword.value;
  try {
    const { data } = await getLists(condition);
    const notice = await getNotices();
    allData = [];
    for (var i = 0; i <= data.length / 10; i++) {
      allData[i] = data.slice(i * 10, i * 10 + 10);
    }
    totalCnt.value = allData.length;
    posts.value = allData[0];
    notices.value = notice.data;
  } catch (err) {
    console.error(err);
  }
};
const monitorRoute = () => {
  var thisRoute = route.params;
  if (thisRoute.nav.indexOf("search") > -1) {
    isSearch = true;
    searchKeyword.value = thisRoute.nav.split("search")[1];
  }

  // route param을 받아서 한글 naming을 만들어줌
  matchName(thisRoute);

  // Search가 on이 되면
  if (isSearch) {
    searchResult();
  }
  fetchList();
  isSearch = false;
  searchKeyword.value = "";
};

watchEffect(monitorRoute);
</script>
<style>
.btn-selected {
  font-weight: 600;
  font-size: 1.2rem;
}
.CONTENT::-webkit-scrollbar {
  display: none;
}
</style>
