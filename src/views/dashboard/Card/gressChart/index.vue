<template>
  <div ref="charts" class="charts" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'GressChart',
  data() {
    return {

    }
  },
  mounted() {
    // 初始化echarts实例
    const gressChart = echarts.init(this.$refs.charts)
    // 配置数据
    gressChart.setOption({
      xAxis: {
        // 隐藏X轴
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        // 隐藏Y轴
        show: false,
        type: 'category'
      },
      // 系列
      series: [
        {
          type: 'bar',
          data: [78],
          color: 'yellowgreen',
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }

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

