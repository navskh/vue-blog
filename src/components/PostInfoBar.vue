<template>
  <div class="w-full border-b-2 pb-1">
    <div class="text-sm breadcrumbs text-primary-focus">
      <ul>
        <li><a>원서</a></li>
        <li><a>예외처리</a></li>
        <li><a>출력물</a></li>
        <li></li>
      </ul>
    </div>
    <h1 class="font-bold text-3xl">일어나~ 고양이들! 엄마 츄르값 벌러간다?</h1>
    <div class="flex justify-between items-center">
      <div class="text-sm">
        <span class="mr-1">2022.09.19</span>
        <span>작성자 ㅇㅇㅇ</span>
      </div>
      <div>
        <button class="btn btn-ghost">
          <ShareIcon class="w-5 h-5" />
        </button>
        <button class="ml-0.5 btn btn-ghost">
          <PencilIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ShareIcon, PencilIcon } from "@heroicons/vue/24/solid";

export default {
  name: "PostInfoBar",
  components: { ShareIcon, PencilIcon },
};
</script>
<style></style>
