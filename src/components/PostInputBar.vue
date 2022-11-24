<template>
  <div class="w-full pb-1">
    <AlertBox :warningContent="warningContent" />
    <div
      class="text-sm breadcrumbs text-primary-focus"
      style="overflow: inherit"
    >
      <ul>
        <li>
          <ListBox
            ref="thisUpper"
            :type="ref('UpperCategory')"
            :code="props.upper"
            @update:model-value="changeUpper"
          ></ListBox>
        </li>
        <li>
          <ListBox
            ref="thisSub"
            :type="ref('SubCategory')"
            :code="props.sub"
            @update:model-value="changeSub"
            :isSubRefreshed="isSubRefreshed"
            @update:isRefreshed="changeIsRefreshed"
          ></ListBox>
        </li>
        <li>
          <ListBox
            ref="thisDetail"
            :code="props.detail"
            :type="ref('DetailCategory')"
            @update:model-value="changeDetail"
            :isDetailRefreshed="isDetailRefreshed"
            @update:isRefreshed="changeIsRefreshed"
          ></ListBox>
        </li>
      </ul>
    </div>
    <h1 class="font-bold text-3xl py-3">
      <input
        type="text"
        v-model="headTitle"
        class="input rounded-md input-ghost w-full"
        placeholder="제목을 입력하세요"
      />
    </h1>
    <div class="flex justify-between items-center mb-3">
      <div class="flex flex-row items-center text-sm">
        <span class="mr-2">{{ formatDate() }}</span>
        <span class="inline-block w-40"> 수정한 사람 : </span>
        <input
          type="text"
          v-model="author"
          class="input rounded-md input-ghost w-full input-sm"
          placeholder="작성자(닉네임)을 입력하세요"
        />
      </div>
      <div>
        <button
          class="btn btn-outline min-h-0 h-8 w-24 flex-row flex-nowrap"
          @click="doSave()"
        >
          <FolderArrowDownIcon class="mr-2 w-6" />저장
        </button>
      </div>
    </div>
  </div>
  <Editor v-model:modelValue="content" :isPimsCall="isPimsCall" />
</template>
<script setup>
import { FolderArrowDownIcon } from "@heroicons/vue/24/outline";
import ListBox from "@/components/atomic/ListBox.vue";
import AlertBox from "./atomic/AlertBox.vue";
import { ref } from "vue";
import Editor from "./atomic/Editor.vue";
import { createPost, updatePost } from "@/api/posts";
import { useRoute, useRouter } from "vue-router";
import { sweetalert } from "@/assets/common";

import { pimsCallContent } from "@/assets/pimsCallContent";

const router = useRouter();

const route = useRoute();
const id = route.params.id;

const formatDate = () => {
  var dateData = new Date().toISOString();
  var thisData = dateData?.substring(0, 10).replaceAll("-", ".");
  return thisData;
};

const props = defineProps({
  title: String,
  content: String,
  author: String,
  isEdit: Boolean,
  upper: String,
  sub: String,
  detail: String,
});

const thisUpper = ref("");
const thisSub = ref("");
const thisDetail = ref("");
const headTitle = ref(props?.title);
const content = ref(props?.content);
const isSubRefreshed = ref(false);
const isDetailRefreshed = ref(false);
const warningContent = ref("");
const isPimsCall = ref(false);

// 최초 글쓰기 시 localStorage에서 가져옴
let author = ref(window.localStorage.getItem("localNickName"));
if (!window.localStorage.getItem("localNickName")) {
  author = ref(props?.author);
}

async function doSave() {
  var params = {
    thisUpper: thisUpper.value.bringCategory(),
    thisSub: thisSub.value.bringCategory(),
    thisDetail: thisDetail.value.bringCategory(),
    headTitle: headTitle.value.replaceAll("'", "''"),
    author: author.value,
    content: content.value.replaceAll("'", "''"),
    idx: id,
  };
  // console.log("params", params);
  window.localStorage.setItem("localNickName", author.value);

  if (doValidate(params)) {
    var response = {};
    if (props.isEdit == false) {
      response = await createPost(params);
      if (response.data.rowsAffected[0] >= 1) {
        sweetalert("글이 등록되었습니다!", "success", function () {
          router.push({ name: "main", params: { nav: "wonseo" } });
        });
      }
    } else {
      response = await updatePost(params);
      if (response.data.rowsAffected[0] >= 1) {
        sweetalert("글이 수정되었습니다!", "success", function () {
          router.push({ name: "detail", params: { nav: "wonseo", id: id } });
        });
      }
    }
  }
}

function doValidate(params) {
  console.log("validate!", params);
  if (params.headTitle == undefined || params.headTitle == "") {
    sweetalert("제목을 입력하세요.", "error");
    return false;
  } else if (params.author == undefined || params.author == "") {
    sweetalert("작성자를 입력하세요.", "error");
    return false;
  } else if (params.content == undefined || params.content == "") {
    sweetalert("내용을 입력하세요.", "error");
    return false;
  } else return true;
}

function changeUpper(value) {
  console.log("value, ", value);
  let condition = {};
  condition.upperCategoryCode = value.Code;
  thisSub.value.fetchCategory(condition);
  /**
   * 작성페이지이면서 카테고리가 'PIMS>전화 요청'에서 다른 카테고리로 변경된 경우
   * 제목, 내용 초기화 및 isPimsCall 값을 false로 변경
   */
  if (!props.isEdit && isPimsCall.value) {
    isPimsCall.value = false;
    headTitle.value = "";
    content.value = "";
  }
}

function changeSub(value) {
  let condition = {};

  //상위 카테고리 미선택 시 경고창
  if (
    thisUpper.value.bringCategory() == "0" &&
    thisSub.value.bringCategory() != "0"
  ) {
    warningContent.value = "상위 분류를 먼저 선택해 주세요";
    isSubRefreshed.value = true;
    setTimeout(() => {
      warningContent.value = "";
    }, 1500);
    return;
  } else {
    warningContent.value = "";
  }

  if (
    thisUpper.value.bringCategory() == "6" &&
    thisSub.value.bringCategory() == "1" &&
    !props.isEdit
  ) {
    isPimsCall.value = true;
    headTitle.value = "[전화 요청] ";
    content.value = pimsCallContent;
  } else {
    isPimsCall.value = false;
    headTitle.value = "";
    content.value = "";
  }

  condition.upperCategoryCode = thisUpper.value.bringCategory();
  condition.subCategoryCode = value.Code;
  thisDetail.value.fetchCategory(condition);
}

/**소분류 카테고리 선택 이벤트 */
function changeDetail() {
  //상위 카테고리 미선택 시 경고창
  if (
    thisUpper.value.bringCategory() == "0" ||
    thisSub.value.bringCategory() == "0"
  ) {
    warningContent.value = "상위 분류를 먼저 선택해 주세요";
    isDetailRefreshed.value = true;
    setTimeout(() => {
      warningContent.value = "";
    }, 1500);
    return;
  } else {
    warningContent.value = "";
  }
}

/** 상위 카테고리 미선택 시 선택 초기화 후 flag값 변경 */
function changeIsRefreshed(category) {
  if (category == "sub") {
    isSubRefreshed.value = !isSubRefreshed.value;
  } else if (category == "detail") {
    isDetailRefreshed.value = !isDetailRefreshed.value;
  }
}

// watchEffect(() => {
//   //PIMS > 전화요청 카테고리 선택 시 지정 템플릿 이벤트 요청
//   if (
//     thisUpper.value.bringCategory == "6" &&
//     thisSub.value.bringCategory == "1"
//   ) {
//     console.log("들어왔니?");
//     isPimsCall.value = true;
//     headTitle.value = "[전화 요청] ";
//   } else {
//     isPimsCall.value = false;
//     headTitle.value = "";
//   }
// });
</script>
