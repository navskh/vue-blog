<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<Listbox
		as="div"
		v-model="selected"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<div class="relative mt-1">
			<ListboxButton
				class="relative w-max cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-focus sm:text-sm"
			>
				<span class="flex items-center">
					<span class="block truncate">{{ selected['Name'] }}</span>
				</span>
				<span
					class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
				>
					<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
				</span>
			</ListboxButton>

			<transition
				leave-active-class="transition ease-in duration-100"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<ListboxOptions
					class="absolute z-10 mt-1 max-h-56 w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				>
					<ListboxOption
						as="template"
						v-for="category in categorys"
						:key="category"
						:value="category"
						v-slot="{ active, selected }"
					>
						<li
							:class="[
								active ? 'text-white bg-primary-focus' : 'text-gray-900',
								'relative cursor-default select-none py-2 pl-3 pr-9',
							]"
						>
							<div class="flex items-center">
								<span
									:class="[
										selected ? 'font-semibold' : 'font-normal',
										'ml-3 block truncate',
									]"
									>{{ category.Name }}</span
								>
							</div>

							<span
								v-if="selected"
								:class="[
									active ? 'text-white' : 'text-primary',
									'absolute inset-y-0 right-0 flex items-center pr-4',
								]"
							>
								<CheckIcon class="h-5 w-5" aria-hidden="true" />
							</span>
						</li>
					</ListboxOption>
				</ListboxOptions>
			</transition>
		</div>
	</Listbox>
</template>

<script setup>
import { ref } from 'vue';
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { getCategory } from '@/api/posts';

const categorys = ref({});
const selected = ref({ Name: null });
const props = defineProps({
	type: {},
	code: String,
});

const emit = defineEmits(['update:modelValue']);

const fetchCategory = async condition => {
	console.log(props.code);
	const { data } = await getCategory(props.type?.value, condition);
	categorys.value = [...data];

	if (props.code) {
		console.log(data);
		var result = data.find(d => d.Name == props.code);
		selected.value = result;
	} else {
		selected.value = categorys.value[0];
	}
};

const initCondition = {
	upperCategoryCode: 0,
	subCategoryCode: 0,
};

fetchCategory(initCondition);

function bringCategory() {
	return selected.value.Code;
}

defineExpose({
	bringCategory,
	fetchCategory,
});
</script>
