<template>
  <div class="w-[80%] min-w-[1000px] h-full overflow-y-auto">
    <div class="CONTAINER flex flex-col items-center justify-center pb-4">
      <div class="TITLE w-full">
        <div class="text-sm breadcrumbs text-primary-focus">
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
        <div class="flex justify-between pr-4 items-center mb-4">
          <h1 class="text-2xl font-bold">{{ pageName }}</h1>
          <span class="text-right"
            ><b>{{ allLength }}</b
            >개의 글</span
          >
        </div>
      </div>
      <div
        class="CONTENT w-full overflow-y-auto overflow-x-hidden flex justify-center flex-col"
      >
        <table class="table w-[99%] border-collapse">
          <!-- head -->
          <thead>
            <tr>
              <th class="tracking-widest w-[60%]">제목</th>
              <th class="w-[15%] tracking-widest">작성자</th>
              <th class="w-[10%] tracking-widest">수정일</th>
              <th class="w-[10%] tracking-widest">작성일</th>
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
                    class="badge leading-[unset] ml-2"
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
        <div class="m-1 mt-2 flex justify-center gap-3 text-lg btn-group">
          <button
            v-for="n in pagingCnt"
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
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getLists, getNotices } from "@/api/posts";
import useTreasureInfoStore from "@/stores/TreasureData";

const treasureInfo = useTreasureInfoStore();

const router = useRouter();
const route = useRoute();

const pageName = ref("");
const pageRoute = ref([]);
const searchKeyword = ref("");

var isSearch = false;
const searchResult = () => {
  console.log("search REsult!");
  pageRoute.value[0] = "-";
  pageRoute.value[1] = "-";
  pageRoute.value[2] = "-";
  pageName.value = `'${searchKeyword.value}' 검색결과`;
};

const matchName = (thisRoute) => {
  var result1 = {},
    result2 = {},
    result3 = {};
  result1 = treasureInfo.categoryList.find(
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
  var upper = {},
    sub = {},
    detail = {};
  upper = treasureInfo.categoryList.find(
    (e) => e.name == dataMap.UpperCategoryName
  );
  sub = upper?.children.find((e) => e.name == dataMap.SubCategoryName);
  detail = sub?.children.find((e) => e.name == dataMap.DetailCategoryName);

  const nav = detail
    ? detail.params.nav
    : sub
    ? sub.params.nav
    : upper
    ? upper.params.nav
    : [];

  router.push({
    name: "detail",
    params: {
      nav,
      id: dataMap.idx,
    },
  });
};

var posts = ref([]);
var pagingCnt = ref(null);
var allData = [];
var allLength = ref(null);
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

  // var thisMode = localStorage.getItem("thisMode");
  try {
    const { data } = await getLists(condition, treasureInfo.mode);
    const notice = await getNotices();
    allData = [];
    allLength.value = data.length;

    for (var i = 0; i <= data.length / 10; i++) {
      allData[i] = data.slice(i * 10, i * 10 + 10);
    }
    pagingCnt.value = allData.length;

    posts.value = allData[0];
    notices.value = notice.data;
  } catch (err) {
    console.error(err);
  }
};

// Router가 바뀌는지 확인
const monitorRoute = () => {
  console.log("monitor");
  var thisRoute = route.params;

  if (thisRoute.nav.length == 2 && thisRoute.nav[0] == "pims") {
    if (thisRoute.nav[1].indexOf("search_") > -1) {
      isSearch = true;
      searchKeyword.value = thisRoute.nav[1].split("search_")[1];
    }
  } else if (thisRoute.nav.indexOf("search_") > -1) {
    isSearch = true;
    searchKeyword.value = thisRoute.nav.split("search_")[1];
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
