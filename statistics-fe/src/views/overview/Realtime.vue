<template>
  <div class="realtime">
    <el-table :data="tableData.list" style="width: 100%; overflow: auto" v-loading="loading">
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
      <el-table-column prop="uid" label="访客 id" />
      <el-table-column prop="duration" label="访问时长" />
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
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import RealTimeDetail from "./RealtimeDetail.vue";
import { useGlobalStore } from "@/stores/global";

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
      const res = await axios.get("http://zuo11.com:3000/base/access", {
        // const res = await axios.get("http://127.0.0.1:3000/base/access", {
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

  return {
    loading,
    getSimpleHref,
    findAccess,
    getRefererSimple,
  };
};
const { loading, getSimpleHref, findAccess, getRefererSimple } = useTableData();

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
