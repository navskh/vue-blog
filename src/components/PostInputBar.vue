<template>
	<div class="w-full pb-1">
		<div
			class="text-sm breadcrumbs text-primary-focus"
			style="overflow: inherit"
		>
			<ul>
				<li
					><ListBox
						ref="thisUpper"
						:type="ref('UpperCategory')"
						@update:model-value="changeUpper"
					></ListBox
				></li>
				<li
					><ListBox
						ref="thisSub"
						:type="ref('SubCategory')"
						@update:model-value="changeSub"
					></ListBox
				></li>
				<li
					><ListBox ref="thisDetail" :type="ref('DetailCategory')"></ListBox
				></li>
			</ul>
		</div>
		<h1 class="font-bold text-3xl">
			<input
				type="text"
				v-model="headTitle"
				class="block w-full h-10 rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
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
					class="block w-full h-10 rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="작성자(닉네임)을 입력하세요"
				/>
			</div>
			<div>
				<button class="btn btn-ghost">
					<ShareIcon class="w-5 h-5" />
				</button>
				<button class="ml-0.5 btn btn-ghost" @click="doSave()">
					<PencilIcon class="w-5 h-5" />
				</button>
			</div>
		</div>
	</div>
	<Editor v-model:modelValue="content" />
</template>
<script setup>
import { ShareIcon, PencilIcon } from '@heroicons/vue/24/solid';
import ListBox from '@/components/atomic/ListBox.vue';
import { ref } from 'vue';
import Editor from './atomic/Editor.vue';
import { createPost } from '@/api/posts';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

const formatDate = () => {
	var dateData = new Date().toISOString();
	var thisData = dateData?.substring(0, 10).replaceAll('-', '.');
	return thisData;
};

const props = defineProps({
	title: String,
	content: String,
	author: String,
});

console.log(props);

const thisUpper = ref('');
const thisSub = ref('');
const thisDetail = ref('');
const headTitle = ref(props?.title);
const author = ref(props?.author);
const content = ref(props?.content);

async function doSave() {
	var params = {
		thisUpper: thisUpper.value.bringCategory(),
		thisSub: thisSub.value.bringCategory(),
		thisDetail: thisDetail.value.bringCategory(),
		headTitle: headTitle.value,
		author: author.value,
		content: content.value,
	};

	if (doValidate(params)) {
		var response = await createPost(params);
		if (response.data.rowsAffected[0] >= 1) {
			sweetalert('글이 등록되었습니다!', 'success', function () {
				router.push({
					name: 'main',
					params: {
						nav: 'wonseo',
					},
				});
			});
		}
	}
}

function sweetalert(textData, iconType, callback) {
	var text = '';
	if (iconType == 'error') text = '안돼 돌아가';
	else if (iconType == 'success') text = '조아써!';
	Swal.fire(
		{
			title: textData,
			text: text,
			icon: iconType,
			confirmButtonText: 'Ok',
		},
		callback(),
	);
}

function doValidate(params) {
	if (params.headTitle == '') {
		sweetalert('제목 입력안했어요!', 'error');
		return false;
	} else if (params.author == '') {
		sweetalert('저자 입력안했어요!', 'error');
		return false;
	} else if (params.content == '') {
		sweetalert('내용 입력안했어요!', 'error');
		return false;
	} else return true;
}

function changeUpper(value) {
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
