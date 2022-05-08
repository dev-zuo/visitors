<template>
  <!-- 左侧菜单 -->
  <LeftMenu />
  <div class="app-right" :class="{ 'menu-collapse': globalStore.menuCollapse }">
    <!-- @start 顶部导航 -->
    <header>
      <div class="header-left">
        <el-select v-model="globalStore.siteId">
          <el-option
            label="zuo11.com"
            value="183281668cc3440449274d1f93c04de6"
          ></el-option>
          <el-option
            label="fe.zuo11.com"
            value="283281668cc3440449274d1f93c04de6"
          ></el-option>
        </el-select>
      </div>
      <div class="header-right">
        <nav>
          <router-link to="/">首页</router-link>
          <router-link to="baseReport">基础报告</router-link>
        </nav>
      </div>
    </header>
    <!-- @end 顶部导航 -->

    <!-- @start 主内容区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- @end 主内容区域 -->

    <!-- @start footer -->
    <!-- <footer>
      Powered by
      <a href="https://github.com/zuoxiaobai/zuo-statistics" target="_blank">
        zuo-statistics
      </a>
    </footer> -->
  </div>
  <!-- @end footer -->
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";
import LeftMenu from "@/components/LeftMenu.vue";

const globalStore = useGlobalStore();
</script>

<style lang="scss">
body {
  margin: 0;
  font-size: 12px;
  // min-width: 1366px;
  overflow: auto;
}

#app .el-table {
  font-size: 12px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-color: #f8f8f8;

  .app-right {
    width: calc(100% - 200px);
    margin-left: 200px;
    background-color: #f8f8f8;
    box-shadow: 5px 5px 10px #efefef;
    transition: all 0.6s;
    overflow: hidden;
    &.menu-collapse {
      width: calc(100% - 64px);
      margin-left: 64px;
    }
    &.menu-collapse header {
      width: calc(100% - 64px);
    }
  }

  header,
  footer {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    background-color: #fff;
    a {
      margin-left: 20px;
      color: #333;
      text-decoration: none;
    }
    a:hover {
      color: rgb(0, 0, 255, 0.6);
    }
  }

  header {
    @include flex-center();
    position: fixed;
    z-index: 10;
    width: calc(100% - 200px);
    justify-content: space-between;
    box-shadow: 0 1px 1px #fafafa;
    .header-left {
      @include flex-center();
    }
  }

  .main {
    min-height: calc(100vh - 120px);
    padding: 20px;
    margin-top: 60px;
  }

  footer {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.01);
  }
}
</style>
