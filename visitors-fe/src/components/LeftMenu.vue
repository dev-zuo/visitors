<template>
  <div class="app-left" :class="{ 'expand-menu': !globalStore.menuCollapse }">
    <div class="app-left-top">
      <div class="alt-left">
        <img
          class="cursor-pointer"
          src="@/assets/peach.png"
          :title="title"
          @click="gotoHome"
        />
        <h1>{{ title }}</h1>
      </div>
      <div
        class="alt-collapse"
        @click="globalStore.menuCollapse = !globalStore.menuCollapse"
      >
        <el-icon :title="globalStore.menuCollapse ? '展开' : '收起'">
          <Expand v-if="globalStore.menuCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <div class="app-left-menu">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :router="true"
        active-text-color="#2846dc"
        :collapse="globalStore.menuCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="selectMenu"
      >
        <el-menu-item index="home" :route="{ name: 'home' }">
          <el-icon title="首页"><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item
          index="websiteSummary"
          :route="{ name: 'websiteSummary' }"
        >
          <el-icon title="概览"><PieChart /></el-icon>
          <span>概览</span>
        </el-menu-item>
        <el-menu-item
          index="accessAnalysis"
          :route="{ name: 'accessAnalysis' }"
        >
          <el-icon title="实时访客"><Histogram /></el-icon>
          <span>实时访客</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  House,
  Histogram,
  PieChart,
  Expand,
  Fold,
} from "@element-plus/icons-vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();
const title = ref("Visitors");
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
const gotoHome = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped>
.app-left {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  height: 100%;
  width: 64px;
  border-right: 1px solid #fafafa;
  transition: width 0.6s;
  background-color: #fff;

  :deep(.el-menu) {
    border-right: none;
    .el-menu-item {
      border-left: 5px solid #fff;
    }
    .el-menu-item.is-active {
      background-color: #fafbff;
      border-left: 5px solid #2d4bdc;
    }
  }
  &.expand-menu {
    width: 200px;
    .app-left-top {
      flex-direction: row;
      height: 60px;
    }
    h1 {
      display: block !important;
    }
  }
  .app-left-top {
    @include flex-center();
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 1px 1px #fafafa;
    .alt-left {
      @include flex-center();
    }
    .alt-left img {
      width: 45px;
      height: 45px;
    }
    .alt-left h1 {
      display: none;
      margin-left: 4px;
      font-size: 18px;
      font-weight: bold;
      color: #414359;
    }
    .alt-collapse {
      @include flex-center();
      font-size: 18px;
      color: #666;
    }
  }
  .app-left-menu {
    margin-top: 20px;
  }
}
</style>
