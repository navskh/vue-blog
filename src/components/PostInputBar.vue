<template>
  <div class="w-full pb-1">
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
          ></ListBox>
        </li>
        <li>
          <ListBox
            ref="thisDetail"
            :code="props.detail"
            :type="ref('DetailCategory')"
          ></ListBox>
        </li>
      </ul>
    </div>
    <h1 class="font-bold text-3xl py-3">
      <input
        type="text"
        v-model="headTitle"
        class="block w-full h-10 rounded-md border-gray-300 pl-2 pr-2 focus:outline-0 sm:text-xl"
        placeholder="제목을 입력하세요"
      />
    </h1>
    <div class="flex justify-between items-center">
      <div class="flex flex-row items-center text-sm">
        <span class="mr-2">{{ formatDate() }}</span>
        <span class="inline-block w-40"> 수정한 사람 : </span>
        <input
          type="text"
          v-model="author"
          class="block w-full h-10 pl-3 pr-12 focus:outline-0 sm:text-sm"
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
  <Editor v-model:modelValue="content" />
</template>
<script setup>
import { FolderArrowDownIcon } from "@heroicons/vue/24/outline";
import ListBox from "@/components/atomic/ListBox.vue";
import { ref } from "vue";
import Editor from "./atomic/Editor.vue";
import { createPost, updatePost } from "@/api/posts";
import { useRoute, useRouter } from "vue-router";
import { sweetalert } from "@/assets/common";

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
const author = ref(props?.author);
const content = ref(props?.content);

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
  console.log("params", params);

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
    sweetalert("제목 입력안했어요!", "error");
    return false;
  } else if (params.author == undefined || params.author == "") {
    sweetalert("저자 입력안했어요!", "error");
    return false;
  } else if (params.content == undefined || params.content == "") {
    sweetalert("내용 입력안했어요!", "error");
    return false;
  } else return true;
}

function changeUpper(value) {
  console.log("value, ", value);
  let condition = {};
  condition.upperCategoryCode = value.Code;
  thisSub.value.fetchCategory(condition);
}

function changeSub(value) {
  let condition = {};
  condition.upperCategoryCode = thisUpper.value.bringCategory();
  condition.subCategoryCode = value.Code;
  thisDetail.value.fetchCategory(condition);
}
</script>
<style></style>
