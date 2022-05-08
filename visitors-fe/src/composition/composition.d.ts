export type CommonFunc = () => void;

export interface PaginationParams {
  sizeChange: CommonFunc;
  currentChange: CommonFunc;
}

export interface PaginationRes {
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  tableData: Record<string, any>;
  handleSizeChange: CommonFunc;
  handleCurrentChange: CommonFunc;
  resetPage: CommonFunc;
}
