<template>
  <!-- base chart -->
  <div class="z-chart" ref="zChart"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import { debounce } from "lodash";
import { onBeforeMount, onBeforeUnmount, watch, onMounted, ref } from "vue";

// console.log("===>", addListener, removeListener);
const props = withDefaults(
  defineProps<{
    options: Record<string, any>;
    autoResize?: boolean;
  }>(),
  {
    autoResize: true,
  }
);

onBeforeMount(() => {
  // 监听 options 改动，改动后重绘数据
  watch(
    () => props.options,
    () => {
      refresh();
    }
  );
});

onMounted(() => {
  console.log("onMounted");
  init();
});

onBeforeUnmount(() => {
  destroy();
});

const zChart = ref();
let chart: any = {};
let __resizeHandler: any = null;

const init = () => {
  console.log(zChart.value, props.options);
  // chart = echarts.init(document.querySelector(".z-chart") as HTMLElement);
  chart = echarts.init(zChart.value);
  chart.setOption(props.options || {});
  // 当元素宽高改变时resize执行重绘
  if (props.autoResize) {
    __resizeHandler = debounce(
      () => {
        chart.resize();
      },
      100,
      { leading: true }
    );
    // console.log(">>>this.$el", this.$el);
    addListener(zChart.value, __resizeHandler);
  }
};

const destroy = () => {
  // 销毁实例，防止 柱状图 动态切换到 饼图 时，柱状图部分属性依旧留存的问题
  chart.value?.dispose();
  chart.value = null;
  props.autoResize && removeListener(zChart.value, __resizeHandler);
};

// 销毁后重绘，用于options变更后刷新图表
const refresh = () => {
  destroy();
  init();
};
</script>

<style lang="scss" scoped>
.z-chart {
  width: 100%;
  height: 100%;
}
</style>
