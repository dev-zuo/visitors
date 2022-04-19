import axios from "@/utils/axios";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import type { TableDataReq } from "@/views/baseReport/accessAnalysis/dto.d";
import { watch } from "vue";
import { useGlobalStore } from "@/stores/global";

export const useTableData: (obj: TableDataReq) => any = ({
  currentPage,
  pageSize,
  tableData,
  resetPage,
  searchFormPayload,
}) => {
  const globalStore = useGlobalStore();
  const loading = ref(false);
  console.log("searchFormPayload", searchFormPayload);
  const params = computed(() => {
    return {
      pageIndex: currentPage.value,
      pageCount: pageSize.value,
      siteId: globalStore.siteId,
      ...searchFormPayload.value,
    };
  });

  const findAccess = async () => {
    try {
      loading.value = true;
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // sleep, test loading
      // const res = await axios.get("/base/access", {
      const res = await axios.get("/base/access", {
        params: params.value,
      });
      console.log(res);
      tableData.total = res.data?.data?.total || 0;
      tableData.list = res.data?.data?.list || [];

      tableData.list = tableData.list.map((item: any) => {
        item.prefObj = JSON.parse(item.perf_calcData);
        item.uaObj = JSON.parse(item.uaInfo);
        item.screenObj = JSON.parse(item.screen_info);
        return item;
      });
      window.scrollTo(0, 0); // 分页后，滚动到顶部
    } catch (e) {
      console.error(e);
      ElMessage.error((e as Error).message);
    } finally {
      loading.value = false;
    }
  };

  const getSimpleHref = (href: string) => {
    const path = href?.split("http://www.zuo11.com")[1];
    return path === "/" ? href : path;
  };

  const getRefererSimple = (referer: string) => {
    if (
      referer.startsWith("https://www.baidu.com") ||
      referer.startsWith("https://m.baidu.com")
    ) {
      return "百度";
    } else if (referer.startsWith("https://www.google.com")) {
      return "Google";
    } else {
      return referer;
    }
  };

  const expandRowKeys = ref([]);
  const getAccessPath = async (row: any, expandedRows: any) => {
    try {
      row.accessPathLoading = true;
      const res = await axios.get("/base/accessPath", {
        params: {
          uuid: row.uuid,
          siteId: globalStore.siteId,
          pageIndex: 1,
          pageCount: 30, // 如果不够后续再加
        },
      });
      row.accessPathCount = res.data?.data?.total || 0;
      row.children = res.data?.data?.list || [];
      row.children.length &&
        (row.visitDuration = row.children
          .map((item: Record<string, any>) => item.visitDuration - 0)
          ?.reduce((prev: number, next: number) => {
            return prev + next;
          }));
      expandRowKeys.value = expandedRows.map((item: any) => item.id);
    } catch (e: any) {
      ElMessage.error(e.message);
      console.error(e);
    } finally {
      row.accessPathLoading = false;
    }
  };
  const expandChange = async (
    row: Record<string, any>,
    expandedRows: Array<Record<string, any>>
  ) => {
    const isExpand = expandedRows.some((item) => item.id === row.id);
    console.log(row, isExpand, expandedRows);
    if (!isExpand) {
      return;
    }
    getAccessPath(row, expandedRows);
  };

  const reloadTableData = () => {
    expandRowKeys.value = [];
    findAccess();
  };

  watch(
    () => globalStore.siteId,
    (newsiteId, oldsiteId) => {
      console.log("watch siteId change", newsiteId, oldsiteId);
      resetPage();
      reloadTableData();
    }
  );

  return {
    loading,
    getSimpleHref,
    findAccess,
    getRefererSimple,
    expandChange,
    reloadTableData,
    expandRowKeys,
  };
};
