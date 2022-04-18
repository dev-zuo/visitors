<template>
  <div class="realtime">
    <el-table
      :data="tableData.list"
      style="width: 100%; overflow: auto"
      v-loading="loading"
      @expand-change="expandChange"
      row-key="id"
      :expand-row-keys="expandRowKeys"
    >
      <el-table-column type="expand">
        <template #default="scope">
          <RealTimeDetail :row="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="No." width="60">
        <template #default="scope">
          <span
            class="ellipsis-text"
            :title="(currentPage - 1) * pageSize + scope.$index + 1"
          >
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="访问时间" width="136">
        <template #default="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column
        prop="region"
        label="地域"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          {{ scope.row.region?.split(" ")[0] || "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="referer" label="来源" width="100">
        <template #default="scope">
          <span v-if="!scope.row.referer">直接访问</span>
          <a
            v-else
            :href="scope.row.referer"
            target="_blank"
            class="ellipsis-text"
            :title="scope.row.referer"
          >
            <span>{{ getRefererSimple(scope.row.referer) }}</span>
          </a>
        </template>
      </el-table-column>

      <el-table-column prop="href" label="入口页面">
        <template #default="scope">
          <a
            v-if="getSimpleHref(scope.row.href)"
            :href="scope.row.href"
            target="_blank"
          >
            {{ getSimpleHref(scope.row.href) }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="访问ip" />
      <!-- <el-table-column prop="ua" label="ua" /> -->
      <el-table-column prop="screen" label="分辨率" />
      <el-table-column
        prop="uuidUaIp"
        label="访客 id"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column prop="visitDuration" label="访问时长">
        <template #default="scope">
          <span :title="`${scope.row.visitDuration}s`">{{
            durationFormat(scope.row.visitDuration)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="pageCount" label="访问页数" />
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { durationFormat } from "@/utils/util";
import { usePagination } from "@/composition/usePagination";
import { useTableData } from "./composition/useRealTimeTable";
import RealTimeDetail from "./components/RealtimeDetail.vue";

onBeforeMount(() => {
  findAccess();
});

const {
  currentPage,
  pageSize,
  tableData,
  handleSizeChange,
  handleCurrentChange,
  resetPage,
} = usePagination({
  sizeChange: () => reloadTableData.call(),
  currentChange: () => reloadTableData.call(),
});

const {
  loading,
  getSimpleHref,
  findAccess,
  getRefererSimple,
  expandChange,
  expandRowKeys,
  reloadTableData,
} = useTableData({
  currentPage,
  pageSize,
  resetPage,
  tableData,
});
</script>

<style lang="scss" scoped>
.realtime {
  padding: 20px;
  a,
  a:hover {
    color: #1276e5;
    cursor: pointer;
    text-decoration: none;
  }
  .ellipsis-text {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>
