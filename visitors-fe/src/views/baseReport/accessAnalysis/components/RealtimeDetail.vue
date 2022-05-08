<template>
  <div class="detail-fino">
    <div class="sec a">
      <p class="sec-title">操作系统、浏览器</p>
      <ul>
        <li>
          操作系统:
          {{ row.uaObj?.os?.name + " " + row.uaObj?.os?.version }}
        </li>
        <li>
          浏览器:
          {{ row.uaObj?.browser?.name + " " + row.uaObj?.browser?.version }}
        </li>
        <li>
          浏览器引擎:
          {{ row.uaObj?.engine?.name + " " + row.uaObj?.engine?.version }}
        </li>
      </ul>
    </div>
    <div class="sec b">
      <p class="sec-title">屏幕信息</p>
      <ul>
        <li>分辨率: {{ row.screenObj?.size }}</li>
        <li>设备像素比: {{ row.screenObj?.dpr }}</li>
        <li>颜色深度: {{ row.screenObj?.colorDepth }}位</li>
      </ul>
    </div>
    <div class="sec c">
      <p class="sec-title">基础信息</p>
      <ul>
        <li>user-agent: {{ row.ua }}</li>
        <li>href: {{ row.href }}</li>
        <li>referer: {{ row.referer }}</li>
        <li>客户端类型: {{ row.isMobile ? "移动端" : "PC" }}</li>
        <li>语言: {{ row.lang }}</li>
        <li>网络环境: {{ row.networkServe }}</li>
        <li>网速: {{ row.network }}</li>
        <li>平台: {{ row.platform }}</li>
        <li>CPU 核心/线程: {{ row.hardware_concurrency }}</li>
        <li>设备内存: {{ row.deviceMemory }}</li>
      </ul>
    </div>
    <div class="sec d">
      <p class="sec-title">页面性能数据</p>
      <ul>
        <li>【Redirect】网页重定向的耗时：{{ row.prefObj?.Redirect }}</li>
        <li>
          【AppCache】检查本地缓存的耗时:
          {{ row.prefObj?.AppCache }}
        </li>
        <li>【DNS】DNS查询的耗时: {{ row.prefObj?.DNS }}</li>
        <li>【TCP】TCP连接的耗时: {{ row.prefObj?.TCP }}</li>
        <li>
          【Waiting(TTFB)】从客户端发起请求到接收到响应的时间 / Time To First
          Byte:
          {{ row.prefObj ? row.prefObj["Waiting(TTFB)"] : "-" }}
          ms
        </li>
        <li>
          【Content Download】下载服务端返回数据的时间:
          {{ row.prefObj ? row.prefObj["Content Download"] : "-" }}
          ms
        </li>
        <li>
          【HTTP Total Time】http请求总耗时:
          {{ row.prefObj ? row.prefObj["HTTP Total Time"] : "-" }}
          ms
        </li>
        <li>
          【DOMContentLoaded】dom加载完成的时间:
          {{ row.prefObj?.DOMContentLoaded }} ms
        </li>
        <li>【Loaded】页面load的总耗时: {{ row.prefObj?.Loaded }} ms</li>
      </ul>
    </div>
    <div class="sec e visitors-path">
      <!-- {{ row.children }} -->
      <table>
        <tr>
          <th>访问路径</th>
          <th>打开时间</th>
          <th>停留时长</th>
          <th>页面地址</th>
        </tr>
        <tr v-for="item in row.children || []" :key="item.id">
          <td></td>
          <td>
            {{ new Date(item.navigationStartTime - 0).toLocaleString() }}
          </td>
          <td>{{ durationFormat(item.visitDuration) }}</td>
          <td>
            <a :href="item.href" target="_blank">{{ item.href }}</a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { durationFormat } from "@/utils/util";

defineProps<{
  row: Record<string, any>;
}>();
</script>

<style lang="scss" scoped>
.detail-fino {
  display: grid;
  grid-template-columns: 20% calc(40% - 40px) calc(40% - 40px);
  // grid-template-rows: 100% 100% 100%; // 内容自动撑开
  grid-template-areas:
    "a c d"
    "b c d"
    "e e e";
  grid-row-gap: 10px; /* 等价于 row-gap: 20px */
  grid-column-gap: 10px; /* 等价于 column-gap: 20px */
}
.sec {
  padding: 12px;
  border: 1px solid #efefef;
  color: white;
  font-size: 14px;
  border-radius: 8px;
}
.sec-title {
  margin: 0;
}
.a {
  grid-area: a;
  background: #6d6deb;
}
.b {
  grid-area: b;
  background: #3f92d2bd;
}
.c {
  grid-area: c;
  background: #45c18c;
}
.d {
  grid-area: d;
  background: #7373d9c4;
}
.e {
  grid-area: e;
  color: #333;
  background: #fff;
}
li {
  word-break: break-all;
}
.visitors-path {
  table td,
  table th {
    padding: 5px 20px;
  }
}
</style>
