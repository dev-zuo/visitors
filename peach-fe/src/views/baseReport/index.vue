<template>
  <div class="overview">
    <div class="left-menu" :class="{ 'expand-menu': !menuCollapse }">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :router="true"
        active-text-color="rgb(0, 0, 255, 0.6)"
        :collapse="menuCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenu"
      >
        <el-menu-item
          index="websiteSummary"
          :route="{ name: 'websiteSummary' }"
        >
          <el-icon title="概览"><Aim /></el-icon>
          <span>概览</span>
        </el-menu-item>
        <el-menu-item
          index="accessAnalysis"
          :route="{ name: 'accessAnalysis' }"
        >
          <el-icon title="实时访客"><Apple /></el-icon>
          <span>实时访客</span>
        </el-menu-item>
      </el-menu>
      <div class="left-menu-collapse" @click="menuCollapse = !menuCollapse">
        <el-icon :title="menuCollapse ? '展开' : '收起'">
          <Expand v-if="menuCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <div class="right-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Aim, Apple, Expand, Fold } from "@element-plus/icons-vue";
const menuCollapse = ref(true);
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
    position: relative;
    flex-shrink: 0;

    min-height: inherit;
    border-right: 1px solid #eee;
    :deep(.el-menu) {
      border-right: none;
    }
    &.expand-menu {
      width: 200px;
    }
  }
  .left-menu-collapse {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 25px;
    color: #666;
  }

  .right-main {
    flex: 1;
    min-height: inherit;
  }
}
</style>
