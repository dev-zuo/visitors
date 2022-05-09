<template>
  <!-- z-chart -->
  <div class="z-chart-container">
    <base-chart
      v-if="!loading && hasData"
      :options="options"
      v-bind="$attrs"
    ></base-chart>
    <base-loading v-if="loading"></base-loading>

    <!-- no data slot -->
    <slot v-if="!loading && !hasData"></slot>
  </div>
</template>

<script lang="ts" setup>
import BaseChart from "./BaseChart.vue";
import BaseLoading from "./BaseLoading.vue";

withDefaults(
  defineProps<{
    loading?: boolean;
    options: Record<string, any>;
    hasData?: boolean;
  }>(),
  {
    loading: false,
    hasData: true,
  }
);
</script>

<style>
.z-chart-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
