<template>
  <div id="app">
    <header>
      <span class="title">zuo-statistics统计</span>
      <nav>
        <router-link to="dashboard">概览</router-link>
        <router-link to="realtime">实时统计</router-link>
      </nav>
    </header>
    <div class="main">
      <router-view></router-view>
    </div>
    <footer>
      Powered by
      <a href="https://github.com/zuoxiaobai/zuo-statistics" target="_blank">
        zuo-statistics
      </a>
    </footer>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
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
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 5px #ccc;
    .title {
      font-size: 24px;
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
