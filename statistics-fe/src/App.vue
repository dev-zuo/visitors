<template>
  <div id="app">
    <header>
      <div class="header-left">
        <span class="title">zuo-statistics统计</span>
        <nav>
          <router-link to="dashboard">概览</router-link>
          <router-link to="realtime">实时统计</router-link>
        </nav>
      </div>
      <div class="header-right">
        <el-select v-model="globalStore.siteId">
          <!-- <el-option label="127.0.0.1" value="123456"></el-option> -->
          <el-option label="zuo11.com" value="183281668cc3440449274d1f93c04de6"></el-option>
          <el-option label="fe.zuo11.com" value="283281668cc3440449274d1f93c04de6"></el-option>
        </el-select>
      </div>
    </header>
    <div class="main">
      <router-view></router-view>
    </div>
    <footer>
      Powered by
      <a href="https://github.com/zuoxiaobai/zuo-statistics" target="_blank"> zuo-statistics </a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();
</script>

<style lang="scss">
@mixin flex-center() {
  display: flex;
  align-items: center;
}

body {
  margin: 0;
  font-size: 12px;
  min-width: 1366px;
  overflow: auto;
}

#app .el-table {
  font-size: 12px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  header,
  footer {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;
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
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 5px #ccc;
    .title {
      font-size: 24px;
    }
    .header-left {
      @include flex-center();
    }
  }

  .main {
    min-height: calc(100vh - 120px);
  }

  footer {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.01);
  }
}
</style>
