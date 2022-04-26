<template>
  <div class="overview">
    <div class="right-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.overview {
  display: flex;
  min-height: inherit;
  .right-main {
    flex: 1;
    width: 100%; // 如果不加 el-table 只能窗口放大时宽度增加，缩写时不能缩小 2.1.9
    min-height: inherit;
  }
}
</style>
