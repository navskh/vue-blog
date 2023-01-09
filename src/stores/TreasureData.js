import { defineStore } from "pinia";

/** SidebarCategory */
import ApplySidebarCategory, {
  PimsSidebarCategory,
} from "@/assets/sidebarCategory.js";

const useTreasureInfoStore = defineStore("treasureInfoData", {
  state: () => ({
    mode: 'apply',
  }),
  actions: {},
  getters: {
    categoryList: (state) => {
      console.log(state.mode);
      if (!state.mode) {
				return ApplySidebarCategory;
			}
      
      return state.mode == 'apply' ? ApplySidebarCategory : PimsSidebarCategory;
    },
  },
});

export default useTreasureInfoStore;
