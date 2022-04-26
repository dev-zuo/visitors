<template>
  <div class="home">
    <h1>首页</h1>
    <div class="common-white-bg" style="width: 100%; height: 600px">
      <el-input v-model="input1" class="w-50 m-2" placeholder="Pick a date" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const input1 = ref("");
</script>

<style lang="scss" scoped>
.home {
  h1 {
    font-weight: normal;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #414359;
  }
}
</style>
