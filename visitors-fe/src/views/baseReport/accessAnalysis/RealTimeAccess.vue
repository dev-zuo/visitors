<template>
  <div class="realtime">
    <section class="table-search common-white-bg">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <div>
          <el-form-item label="设备类型">
            <el-radio-group v-model="searchForm.deviceType" @change="queryData">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="pc">PC</el-radio-button>
              <el-radio-button label="mobile">移动端</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="访客">
            <el-radio-group v-model="searchForm.isOldUser" @change="queryData">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button :label="false">新访客</el-radio-button>
              <el-radio-button :label="true">老访客</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="queryData">查询</el-button> -->
            <el-button type="default" @click="resetData">重置</el-button>
          </el-form-item>
        </div>
        <div class="middle-query">
          <el-form-item label="IP">
            <el-input
              v-model="searchForm.ip"
              placeholder="请输入IP"
              @input="queryDataDebounce"
            />
          </el-form-item>
          <el-form-item label="来源">
            <el-select
              v-model="searchForm.referrer"
              placeholder="Activity zone"
              @change="queryData"
            >
              <el-option
                v-for="item in referrerList"
                :key="item.label"
                :label="item.label"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              unlink-panels
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :shortcuts="fastDateOption"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              @change="queryData"
            />
          </el-form-item>
        </div>
      </el-form>
    </section>
    <section class="common-white-bg table-wrap">
      <el-table
        :data="tableData.list"
        style="width: 100%; overflow: auto"
        v-loading="loading"
        @expand-change="expandChange"
        row-key="id"
        :expand-row-keys="expandRowKeys"
        @sort-change="sortChange"
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
        <el-table-column prop="time" label="访问时间" max-width="136">
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
        <el-table-column prop="visitDuration" label="访问时长" sortable>
          <template #default="scope">
            <span :title="`${scope.row.visitDuration}s`">{{
              durationFormat(scope.row.visitDuration)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pageCount" label="访问页数" sortable />
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
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { durationFormat } from "@/utils/util";
import { usePagination } from "@/composition/usePagination";
import { useTableData } from "./composition/useRealTimeTable";
import RealTimeDetail from "./components/RealtimeDetail.vue";
import { useRealTimeQuery } from "./composition/useRealTimeQuery";
import { debounce } from "lodash";

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
  searchForm,
  searchFormPayload,
  referrerList,
  fastDateOption,
  resetData,
  queryData,
} = useRealTimeQuery({ queryTableData: () => reloadTableData.call() });

const {
  loading,
  getSimpleHref,
  findAccess,
  getRefererSimple,
  expandChange,
  expandRowKeys,
  reloadTableData,
  sortChange,
} = useTableData({
  currentPage,
  pageSize,
  resetPage,
  tableData,
  searchFormPayload,
});

const queryDataDebounce = debounce(queryData, 500, {
  leading: false,
  trailing: true,
});
</script>

<style lang="scss" scoped>
.realtime {
  .ellipsis-text {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .table-search {
    margin-bottom: 20px;
    padding: 15px 20px;
    .middle-query {
      margin: 20px 0 0;
    }
  }
  .table-wrap {
    padding: 5px 20px 20px;
  }
}
.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>
