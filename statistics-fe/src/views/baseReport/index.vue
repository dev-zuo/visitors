<template>
  <div class="overview">
    <div class="left-menu">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :router="true"
        active-text-color="rgb(0, 0, 255, 0.6)"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenu"
      >
        <el-menu-item index="websiteSummary" :route="{ name: 'websiteSummary' }">
          <span>概览</span>
        </el-menu-item>
        <el-menu-item index="accessAnalysis" :route="{ name: 'accessAnalysis' }">
          <span>实时访客</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";

const activeMenu = computed(() => {
  let router = useRouter();
  let curRouteName = router.currentRoute.value.name;
  return curRouteName;
});
const selectMenu: (data: string) => void = (data) => {
  console.log(data);
};
const handleOpen = () => {
  console.log("handleOpen");
};
const handleClose = () => {
  console.log("handleClose");
};
</script>

<style lang="scss" scoped>
.overview {
  display: flex;
  min-height: inherit;

  .left-menu {
    flex-shrink: 0;
    width: 200px;
    min-height: inherit;
    border-right: 1px solid #eee;
    :deep(.el-menu) {
      border-right: none;
    }
  }

  .right-main {
    flex: 1;
    min-height: inherit;
  }
}
</style>
