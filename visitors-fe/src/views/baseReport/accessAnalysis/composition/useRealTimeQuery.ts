import { reactive, ref, computed } from "vue";
import { cloneDeep } from "lodash";

export const useRealTimeQuery = ({ queryTableData }: any) => {
  const INIT_FORM_DATA = {
    ip: "",
    referrer: "",
    deviceType: "",
    isOldUser: "",
    date: "",
  };
  const searchFormData = cloneDeep(INIT_FORM_DATA);
  const searchForm: any = reactive(searchFormData);
  const searchFormPayload = computed(() => {
    const tempObj: any = {};
    const needProcessProps = ["date"];
    Object.keys(INIT_FORM_DATA).forEach((prop) => {
      if (needProcessProps.includes(prop)) {
        return;
      }
      tempObj[prop] = searchForm[prop];
    });

    Object.assign(tempObj, {
      date: searchForm.date ? searchForm.date?.join(",") : "",
    });
    return tempObj;
  });

  const queryData = () => {
    console.log("query", searchForm);
    queryTableData && queryTableData();
  };

  const resetData = () => {
    Object.assign(searchForm, cloneDeep(INIT_FORM_DATA));
  };

  const referrerList = ref([
    { label: "全部", code: "" },
    { label: "直接访问", code: "direct" },
    { label: "外部链接", code: "otherLink" },
    { label: "百度", code: "baidu.com" },
    { label: "Google", code: "google.com" },
    { label: "360", code: "so.com" },
  ]);

  const fastDateOption = [
    {
      text: "今天",
      value: () => {
        const end = new Date();
        const start = new Date();
        return [start, end];
      },
    },
    {
      text: "昨天",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
        return [start, end];
      },
    },
    {
      text: "最近一周",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
    },
    {
      text: "最近一个月",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: "最近三个月",
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
  ];

  return {
    searchForm,
    searchFormPayload,
    referrerList,
    fastDateOption,
    queryData,
    resetData,
  };
};
