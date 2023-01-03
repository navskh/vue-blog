<template>
  <div
    class="DETAIL max-w-[calc(1500px-18rem)] h-full pb-1 overflow-y-scroll pr-3"
    @scroll="showTopBtn"
  >
    <div class="flex justify-between">
      <div class="text-sm breadcrumbs text-primary-focus flex-row">
        <ul>
          <li>
            <a>{{ props.upper }}</a>
          </li>
          <li>
            <a>{{ props.sub }}</a>
          </li>
          <li>
            <a>{{ props.detail }}</a>
          </li>
        </ul>
      </div>
    </div>
    <h1 class="font-bold text-3xl py-3">{{ props.title }}</h1>
    <div class="flex justify-between items-center border-b-2 pb-2">
      <div class="text-sm">
        <span class="mr-1">{{ formatDate(props.createdAt) }}</span>
        <span class="text-xs">
          마지막으로 수정한 사람 : {{ props.author }}</span
        >
      </div>
      <div>
        <button class="btn btn-ghost btn-sm" @click="doUrlCopy()">
          <ShareIcon class="w-5 h-5" />
        </button>
        <button class="btn btn-ghost btn-sm" @click="goEdit()">
          <PencilIcon class="w-5 h-5" />
        </button>
        <button class="btn btn-ghost btn-sm" @click="confirmDelete()">
          <TrashIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
    <div class="ProseMirror prose h-max">
      <div v-html="props.content"></div>
    </div>
  </div>
</template>
<script setup>
import { ShareIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import { deletePost } from "@/api/posts";
import { sweetalert, sweetconfirm } from "@/assets/common";

const router = useRouter();

const route = useRoute();

const id = route.params.id;

const emits = defineEmits(["update:scroll"]);

const props = defineProps({
  title: String,
  content: String,
  author: String,
  createdAt: String,
  upper: String,
  sub: String,
  detail: String,
});

const formatDate = (dateData) => {
  var thisData = dateData
    ?.substring(0, 16)
    .replaceAll("-", ".")
    .replace("T", " ");
  return thisData;
};

const nav = route.path.split("/detail").shift().split("/");
nav.shift();
const goEdit = () => {
  router.push({
    name: "edit",
    params: {
      nav,
      id: id,
    },
  });
};

const confirmDelete = () => {
  sweetconfirm("진짜로 삭제할건가요??", "warning").then((result) => {
    if (result.isConfirmed) doDelete();
    else return;
  });
};

const doDelete = async () => {
  var response = await deletePost(id);
  if (response.data.rowsAffected[0] >= 1) {
    sweetalert("글이 삭제되었습니다!", "success", function () {
      router.push({ name: "main", params: { nav: "wonseo" } });
    });
  }
};

/** scroll 이벤트 발생 시 scroll 길이를 PostDetail 페이지로 update:scroll emit */
const showTopBtn = () => {
  const length = document.getElementsByClassName("DETAIL")[0].scrollTop;
  emits("update:scroll", length);
};

const doUrlCopy = () => {
  sweetalert("글 주소가 복사되었습니다!", "success", function () {
    navigator.clipboard.writeText(window.location.href);
  });
};
</script>
<style scoped>
.DETAIL::-webkit-scrollbar {
  width: 5px;
}
.DETAIL::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: hsl(var(--p));
  border-radius: 20px;
}
.DETAIL::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0);
}
</style>
