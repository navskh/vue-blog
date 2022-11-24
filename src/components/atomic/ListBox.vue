<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox
    as="div"
    v-model="selected"
    @update:modelValue="(value) => emits('update:modelValue', value)"
  >
    <div class="relative mt-1">
      <ListboxButton
        class="relative py-2 pl-3 pr-10 text-left text-base-content rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary-focus hover:cursor-pointer"
      >
        <span class="flex items-center">
          <span class="block truncate">{{ selected["Name"] }}</span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-56 w-max overflow-auto rounded-md bg-base-100 text-primary-content py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                active ? 'text-white bg-primary-focus' : 'text-base-content ',
                'relative select-none py-2 pl-3 pr-9 hover:cursor-pointer',
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
                  active ? 'text-white' : 'text-base-content ',
                  'absolute inset-y-0 right-0 flex items-center pr-4 hover:cursor-pointer',
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
import { ref, watchEffect } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { getCategory } from "@/api/posts";

const categorys = ref({});
const selected = ref({ Name: null });
const props = defineProps({
  type: {},
  code: String,
  isSubRefreshed: Boolean,
  isDetailRefreshed: Boolean,
});

/** PostInputBar에서 카테고리 변경 이벤트 발생, 상위 카테고리를 선택하지 않았을 경우 선택값 초기화  */
watchEffect(() => {
  if (props.isSubRefreshed) {
    fetchCategory(initCondition);
    emits("update:isRefreshed", "sub");
  } else if (props.isDetailRefreshed) {
    fetchCategory(initCondition);
    emits("update:isRefreshed", "detail");
  }
});

const emits = defineEmits(["update:modelValue", "update:isRefreshed"]);

const fetchCategory = async (condition) => {
  const { data } = await getCategory(props.type?.value, condition);
  categorys.value = [...data];

  if (props.code) {
    // console.log(data);
    var result = data.find((d) => d.Name == props.code);
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
