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
          <span class="ellipsis-text" :title="(currentPage - 1) * pageSize + scope.$index + 1">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="访问时间" width="136">
        <template #default="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="region" label="地域" width="100" :show-overflow-tooltip="true">
        <template #default="scope">
          {{ scope.row.region?.split(" ")[0] || "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="referer" label="来源" width="100">
        <template #default="scope">
          <span v-if="!scope.row.referer">直接访问</span>
          <a v-else :href="scope.row.referer" target="_blank" class="ellipsis-text" :title="scope.row.referer">
            <span>{{ getRefererSimple(scope.row.referer) }}</span>
          </a>
        </template>
      </el-table-column>

      <el-table-column prop="href" label="入口页面">
        <template #default="scope">
          <a v-if="getSimpleHref(scope.row.href)" :href="scope.row.href" target="_blank">
            {{ getSimpleHref(scope.row.href) }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="访问ip" />
      <!-- <el-table-column prop="ua" label="ua" /> -->
      <el-table-column prop="screen" label="分辨率" />
      <el-table-column prop="uuidUaIp" label="访客 id" width="100px" show-overflow-tooltip />
      <el-table-column prop="visitDuration" label="访问时长">
        <template #default="scope">
          <span :title="`${scope.row.visitDuration}s`">{{ durationFormat(scope.row.visitDuration) }}</span>
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
import { watch } from "vue";
import axios from "@/utils/axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import RealTimeDetail from "./RealtimeDetail.vue";
import { useGlobalStore } from "@/stores/global";
import { durationFormat } from "@/utils/util";

const globalStore = useGlobalStore();
onBeforeMount(() => {
  findAccess();
});

watch(
  () => globalStore.siteId,
  (newsiteId, oldsiteId) => {
    console.log("watch siteId change", newsiteId, oldsiteId);
    resetPage();
    findAccess();
  }
);

const useTableData = () => {
  const loading = ref(false);
  const params = computed(() => {
    return {
      pageIndex: currentPage.value,
      pageCount: pageSize.value,
      siteId: globalStore.siteId,
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
    if (referer.startsWith("https://www.baidu.com") || referer.startsWith("https://m.baidu.com")) {
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
      // row.accessPathLoading = true;
      const res = await axios.get("/base/accessPath", {
        params: { ...params.value, uuid: row.uuid },
      });
      setTimeout(() => {
        row.accessPathCount = res.data?.data?.total || 0;
        row.children = res.data?.data?.list || [];
        row.children.length &&
          (row.visitDuration = row.children
            .map((item: Record<string, any>) => item.visitDuration - 0)
            ?.reduce((prev: number, next: number) => {
              return prev + next;
            }));
        expandRowKeys.value = expandedRows.map((item: any) => item.id);
      }, 0);
    } catch (e: any) {
      ElMessage.error(e.message);
      console.error(e);
    } finally {
      // row.accessPathLoading = false;
    }
  };
  const expandChange = async (row: Record<string, any>, expandedRows: Array<Record<string, any>>) => {
    let isExpand = expandedRows.some((item) => item.id === row.id);
    console.log(row, isExpand, expandedRows);
    if (!isExpand) {
      return;
    }
    getAccessPath(row, expandedRows);
  };

  return {
    loading,
    getSimpleHref,
    findAccess,
    getRefererSimple,
    expandChange,
    expandRowKeys,
  };
};
const { loading, getSimpleHref, findAccess, getRefererSimple, expandChange, expandRowKeys } = useTableData();

const usePagination = () => {
  const currentPage = ref(1);
  const pageSize = ref(20);
  const tableData: any = reactive({
    total: 0,
    list: [],
  });

  const handleSizeChange = () => {
    currentPage.value = 1;
    findAccess();
  };
  const handleCurrentChange = () => {
    findAccess();
  };
  const resetPage = () => {
    currentPage.value = 1;
    pageSize.value = 20;
    expandRowKeys.value = [];
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
const { currentPage, pageSize, tableData, handleSizeChange, handleCurrentChange, resetPage } = usePagination();
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
