import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      siteId: "183281668cc3440449274d1f93c04de6",
      menuCollapse: false,
    };
  },
});
