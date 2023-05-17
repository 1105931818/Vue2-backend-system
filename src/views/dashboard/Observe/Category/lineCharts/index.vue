<template>
  <div class="">
    <div class="header">
      <span>{{ title }}</span>
      <svg t="1683705112769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2368" width="24" height="24"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" fill="#515151" p-id="2369" /></svg>
    </div>
    <div class="main">
      <span class="main_title">123</span>
      <span class="main_cont">12331</span>
      <svg t="1683707068477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357" width="16" height="16"><path d="M929.408 202.752l-205.269333 24.661333a8.234667 8.234667 0 0 0-4.864 13.994667l61.141333 60.928-232.96 232.32-104.874667-104.533333a16.469333 16.469333 0 0 0-23.296 0l-331.52 330.752a8.234667 8.234667 0 0 0 0 11.605333l46.336 46.464a8.277333 8.277333 0 0 0 11.648 0l285.184-284.288 104.789334 104.533333c6.485333 6.357333 16.896 6.357333 23.296 0l279.722666-278.784 61.098667 60.970667c4.821333 4.821333 13.226667 1.962667 14.037333-4.821333l24.746667-204.8a8.106667 8.106667 0 0 0-9.216-9.002667z" fill="#1afa29" p-id="3358" /></svg>
      <svg t="1683707186150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4601" width="16" height="16"><path d="M938.581333 812.117333l-24.746666-204.714666a8.277333 8.277333 0 0 0-13.994667-4.821334l-61.098667 61.013334-279.637333-278.698667a16.597333 16.597333 0 0 0-23.253333 0l-104.96 104.533333-285.141334-284.373333a8.277333 8.277333 0 0 0-11.648 0L87.722667 251.52a8.234667 8.234667 0 0 0 0 11.605333l331.52 330.794667c6.4 6.485333 16.938667 6.485333 23.338666 0l104.917334-104.533333 232.96 232.277333-61.098667 60.970667a8.234667 8.234667 0 0 0 4.864 13.952l205.312 24.661333a8.106667 8.106667 0 0 0 9.045333-9.130667z" fill="#d81e06" p-id="4602" /></svg>
    </div>
    <div class="footer">
      <div ref="charts" class="charts" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'LineCharts1',
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'arry'],
  data() {
    return {

    }
  },
  mounted() {
    // 初始化echarts实例
    const lineChart = echarts.init(this.$refs.charts)
    // 配置数据
    lineChart.setOption({
      xAxis: {
        // 隐藏X轴
        show: false,
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        // 隐藏Y轴
        show: false
      },
      // 系列
      series: [
        {
          type: 'line',
          smooth: true,
          data: [28, 18, 36, 43, 32, 54, 75, 88],
          // 拐点样式设置
          itemStyle: {
            opactiy: 0
          },
          // 线条样式
          lineStyle: {
            color: 'blue'
          },
          // 区域填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'blue'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ],
              global: false
            }
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

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.main_title{
  margin-right: 120px;
}

.main_cont{
  margin-right: 10px;
}

.charts{
  width: 100%;
  height: 150px;
}
</style>

