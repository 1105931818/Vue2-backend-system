<template>
  <div ref="charts" class="charts" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'BarChart',
  data() {
    return {

    }
  },
  mounted() {
    // 初始化echarts实例
    const barChart = echarts.init(this.$refs.charts)
    // 配置数据
    barChart.setOption({
      xAxis: {
        // 隐藏X轴
        show: false,
        type: 'category'
      },
      yAxis: {
        // 隐藏Y轴
        show: false
      },
      // 系列
      series: [
        {
          type: 'bar',
          data: [68, 48, 36, 53, 58, 64, 45, 41, 50, 75, 68, 99],
          color: 'green'
        }
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
    })
  }
}

</script>

<style>

.charts{
    width: 100%;
    height: 100%;
}

</style>

