<template>
  <div class="realtime">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-table :data="tableData.list" style="width: 100%; overflow: scroll">
      <el-table-column prop="time" label="访问时间">
        <template #default="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="region" label="地域" />
      <!-- <el-table-column prop="referer" label="来源" /> -->
      <el-table-column prop="href" label="入口页面" />
      <el-table-column prop="ip" label="访问ip" />
      <!-- <el-table-column prop="ua" label="ua" /> -->
      <el-table-column prop="screen" label="分辨率" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";

onBeforeMount(() => {
  findAccess();
});

const params = computed(() => {
  return {
    pageIndex: currentPage.value,
    pageCount: pageSize.value,
  };
});

const findAccess = async () => {
  try {
    const res = await axios.get("http://zuo11.com:3000/base/access", {
      // const res = await axios.get("http://127.0.0.1:3000/base/access", {
      params: params.value,
    });
    console.log(res);
    tableData.total = res.data?.data?.total || 0;
    tableData.list = res.data?.data?.list || [];
  } catch (e) {
    console.error(e);
    ElMessage.error((e as Error).message);
  }
};

const usePagination = () => {
  const currentPage = ref(1);
  const pageSize = ref(20);
  const tableData = reactive({
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

  return {
    currentPage,
    pageSize,
    tableData,
    handleSizeChange,
    handleCurrentChange,
  };
};

const {
  currentPage,
  pageSize,
  tableData,
  handleSizeChange,
  handleCurrentChange,
} = usePagination();
</script>

<style lang="scss" scoped>
.realtime {
  padding: 20px;
}
</style>
