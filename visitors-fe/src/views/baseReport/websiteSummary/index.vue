<template>
  <div class="website-summary">
    <p class="website-summary-title">网站概况</p>
    <div class="common-white-bg">
      <table class="summary-table">
        <tr>
          <th></th>
          <th>浏览量(PV)</th>
          <th>访客数(UV)</th>
          <th>IP数</th>
        </tr>
        <tr>
          <td>今天</td>
          <td>{{ todayData.pv || 0 }}</td>
          <td>{{ todayData.uv || 0 }}</td>
          <td>{{ todayData.ip || 0 }}</td>
        </tr>
        <tr>
          <td>昨日</td>
          <td>{{ yesterdayData.pv || 0 }}</td>
          <td>{{ yesterdayData.uv || 0 }}</td>
          <td>{{ yesterdayData.ip || 0 }}</td>
        </tr>
        <tr>
          <td>最近7天</td>
          <td>{{ weekData.pv || 0 }}</td>
          <td>{{ weekData.uv || 0 }}</td>
          <td>{{ weekData.ip || 0 }}</td>
        </tr>
        <tr>
          <td>最近30天</td>
          <td>{{ lastMonthDate.pv || 0 }}</td>
          <td>{{ lastMonthDate.uv || 0 }}</td>
          <td>{{ lastMonthDate.ip || 0 }}</td>
        </tr>
      </table>
    </div>
    <div class="common-white-bg">
      <el-radio-group v-model="timeType" @change="timeTypeChange">
        <el-radio-button label="今天">今天</el-radio-button>
        <el-radio-button label="昨天">昨天</el-radio-button>
        <el-radio-button label="最近一周">最近7天</el-radio-button>
        <el-radio-button label="最近一个月">最近30天</el-radio-button>
        <el-radio-button label="最近三个月">最近三个月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="overview-card">
      <div class="a sec">
        <p>趋势图</p>
        <ZChart :options="chartOptions" />
      </div>
      <div class="b sec">
        <p>Top10来源网站</p>
        <table>
          <tr>
            <th>来源网站</th>
            <th>浏览量(PV)</th>
            <th>占比</th>
          </tr>
          <tr>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
          </tr>
        </table>
      </div>
      <div class="c sec">
        <p>Top10入口页面</p>
        <table>
          <tr>
            <th>入口页面</th>
            <th>浏览量(PV)</th>
            <th>占比</th>
          </tr>
          <tr>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
          </tr>
        </table>
      </div>
      <div class="d sec">
        <p>Top10受访页面</p>
        <table>
          <tr>
            <th>受访页面</th>
            <th>浏览量(PV)</th>
            <th>占比</th>
          </tr>
          <tr>
            <td>xxx</td>
            <td>xxx</td>
            <td>xxx</td>
          </tr>
        </table>
      </div>
      <div class="e sec">
        <p>新老访客</p>
      </div>
      <div class="f sec">
        <p>地域分布</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "@/utils/axios";
import { ref, reactive, onBeforeMount } from "vue";
import type { summaryData } from "./dto.d";
import { useRealTimeQuery } from "@/views/baseReport/accessAnalysis/composition/useRealTimeQuery";
import dayjs from "dayjs";
import ZChart from "@/components/z-chart/src/ZChart.vue";
import { useGlobalStore } from "@/stores/global";
import { ElMessage } from "element-plus";

const globalStore = useGlobalStore();
const todayData: summaryData = reactive({});
const yesterdayData: summaryData = reactive({});
const weekData: summaryData = reactive({});
const lastMonthDate: summaryData = reactive({});

const timeType = ref("今天");
const { fastDateOption } = useRealTimeQuery({});
const timeTypeChange = () => {
  console.log("query");
  let [start, end] = fastDateOption
    .filter((item) => item.text === timeType.value)[0]
    .value();
  console.log(
    dayjs(start).format("YYYY-MM-DD"),
    dayjs(end).format("YYYY-MM-DD")
  );
};

const chartOptions = {
  xAxis: {
    type: "category",
    data: ["A", "B", "C"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150],
      type: "line",
    },
  ],
};

const getUvPv = async (startDate: string, endDate: string, cb) => {
  try {
    const res = await axios.get("/base/overview/getUvPv", {
      params: {
        siteId: globalStore.siteId,
        startDate,
        endDate,
      },
    });
    if (res.data.code === 0) {
      let data = res.data.data;
      // Object.assign(todayData, data);
      console.log("data", data, todayData);
      cb && cb(data);
    } else {
      ElMessage.error(res.data.msg);
    }
  } catch (e: any) {
    ElMessage.error(e.message);
  }
};

onBeforeMount(async () => {
  const t = (date: Date) => dayjs(date).format("YYYY-MM-DD");
  let dateInfoArr = [
    { dateTypeIndex: 0, model: todayData },
    { dateTypeIndex: 1, model: yesterdayData },
    { dateTypeIndex: 2, model: weekData },
    { dateTypeIndex: 3, model: lastMonthDate },
  ];
  dateInfoArr.forEach(({ dateTypeIndex, model }) => {
    let [start, end] = fastDateOption[dateTypeIndex].value();
    getUvPv(t(start), t(end), (data: any) => Object.assign(model, data));
  });

  // let [startToday, endToday] = fastDateOption[0].value(); // 今天
  // let [startYes, endYes] = fastDateOption[1].value(); // 昨天
  // let [startMon, endMon] = fastDateOption[3].value(); // 最近 30 天
  // getUvPv(t(startToday), t(endToday), (data: any) =>
  //   Object.assign(todayData, data)
  // );
  // getUvPv(t(startYes), t(endYes), (data: any) =>
  //   Object.assign(yesterdayData, data)
  // );
  // getUvPv(t(startMon), t(endMon), (data: any) =>
  //   Object.assign(lastMonthDate, data)
  // );
});
</script>

<style lang="scss" scoped>
.website-summary {
  font-size: 14px;
  .common-white-bg {
    margin-bottom: 20px;
  }
  &-title {
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 16px;
  }
  .summary-table {
    th,
    td {
      padding: 5px 50px;
    }
  }
  .overview-card {
    display: grid;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    grid-template-areas:
      "a b"
      "c d"
      "e f";
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    .sec {
      height: 392px;
      padding: 20px;
      background-color: #fff;
    }
    .sec p {
      padding-bottom: 10px;
      font-weight: bold;
    }
  }
  $areas: "a", "b", "c", "d", "e", "f";
  @each $area in $areas {
    .#{$area} {
      grid-area: $area;
    }
  }
  table {
    th,
    td {
      padding-right: 100px;
    }
  }
}
</style>
