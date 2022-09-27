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
					<tr v-for="(data, index) in posts" :key="index">
						<td>
							<p
								class="hover:cursor-pointer w-max hover:after:content-['#'] hover:after:ml-2 hover:after:font-semibold hover:after:text-secondary-focus hover:text-secondary-focus"
								@click="goPage(data)"
							>
								{{ truncate(data.Title) }}
							</p>
						</td>
						<td>
							<p>{{ truncate(data.Author, 10) }}</p>
						</td>
						<td>{{ formatDate(data.WriteTime) }}</td>
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
/* eslint-disable */
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { getLists } from '@/api/posts';

const router = useRouter();

let isActive = ref(1);
const handleButtonClick = n => {
	isActive.value = n;
};

const truncate = (text, maxLength = 45) => {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	} else {
		return text;
	}
};

const formatDate = dateData => {
	var thisData = dateData.substring(0, 10).replaceAll('-', '.');
	return thisData;
};

const goPage = dataMap => {
	router.push({
		name: 'detail',
		params: {
			nav: 'wonseo',
			id: dataMap.Idx,
		},
	});
};

var posts = ref();

// const { response, data: posts, error, loading } = useAxios('/treasure/list');

const fetchList = async () => {
	try {
		const { data } = await getLists();
		posts.value = data;
		console.log(data);
	} catch (err) {
		console.error(err);
	}
};

// 가져온 것들을 그대로 실행하려면 watchEffect
watchEffect(fetchList);
</script>
<style>
.btn-selected {
	font-weight: 600;
	font-size: 1.2rem;
}
</style>
