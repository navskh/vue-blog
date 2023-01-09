import { defineStore } from "pinia";

/** SidebarCategory */
import ApplySidebarCategory, {
  PimsSidebarCategory,
} from "@/assets/sidebarCategory.js";

const useTreasureInfoStore = defineStore("treasureInfoData", {
  state: () => ({
    mode: true,
  }),
  actions: {},
  getters: {
    categoryList: (state) => {
      return state.mode ? ApplySidebarCategory : PimsSidebarCategory;
    },
  },
});

export default useTreasureInfoStore;
