import { ref, reactive } from "vue";
import type { Ref } from "vue";
import type {
  PaginationParams,
  PaginationRes,
} from "@/composition/composition.d";

/**
 * 分页组件封装
 * @param sizeChange 分页大小改变回调函数
 * @param currentChange 分页切换回调函数
 * @returns
 */

export const usePagination: (obj: PaginationParams) => PaginationRes = ({
  sizeChange,
  currentChange,
}) => {
  const currentPage: Ref<number> = ref(1);
  const pageSize: Ref<number> = ref(20);
  const tableData: any = reactive({
    total: 0,
    list: [],
  });

  const handleSizeChange = () => {
    currentPage.value = 1;
    typeof sizeChange === "function" && sizeChange();
  };

  const handleCurrentChange = () => {
    typeof currentChange === "function" && currentChange();
  };

  const resetPage = () => {
    currentPage.value = 1;
    pageSize.value = 20;
  };

  return {
    currentPage,
    pageSize,
    tableData,
    handleSizeChange,
    handleCurrentChange,
    resetPage,
  };
};
