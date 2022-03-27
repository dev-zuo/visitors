<template>
  <div class="realtime">
    <el-table :data="tableData" style="width: 100%; overflow: scroll">
      <el-table-column prop="time" label="访问时间">
        <template #default="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="region" label="地域" />
      <el-table-column prop="referer" label="来源" />
      <el-table-column prop="href" label="入口页面" />
      <el-table-column prop="ip" label="访问ip" />
      <!-- <el-table-column prop="ua" label="ua" /> -->
      <el-table-column prop="screen" label="分辨率" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, onBeforeMount, ref } from "vue";
import { ElMessage } from "element-plus";

const pageIndex = ref(1);
const pageCount = ref(20);

onBeforeMount(() => {
  findAccess();
});

const tableData = ref([]);
const params = computed(() => {
  return {
    pageIndex: pageIndex.value,
    pageCount: pageCount.value,
  };
});

const findAccess = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/base/access", {
      params: params.value,
    });
    console.log(res);
    tableData.value = res.data.data.list;
  } catch (e) {
    console.error(e);
    ElMessage.error((e as Error).message);
  }
};
</script>

<style lang="scss" scoped>
.realtime {
  padding: 20px;
}
</style>
