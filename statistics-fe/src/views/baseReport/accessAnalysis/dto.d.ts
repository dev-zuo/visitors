export interface TableDataReq {
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  resetPage: () => void;
  tableData: Record<string, any>;
}
