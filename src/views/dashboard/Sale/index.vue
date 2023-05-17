<template>
  <div class="sale">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
          <el-tab-pane label="销售额" name="sale" />
          <el-tab-pane label="访问量" name="visite" />
        </el-tabs>
        <div class="right">
          <span @click="setday">今日</span>
          <span @click="setweek">本周</span>
          <span @click="setmonth">本月</span>
          <span @click="setyear">本年</span>
          <el-date-picker
            v-model="value1"
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
          />
        </div>
      </div>
      <div class="">
        <el-row>
          <el-col :span="18">
            <div ref="charts1" class="charts1" />
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <div class="list">
                <h3>门店{{ title }}排名</h3>
                <ul>
                  <li>
                    <p><span class="rindex">1</span> 肯德基</p>
                    <span>362,156</span>
                  </li>
                  <li>
                    <p><span class="rindex">2</span> 麦当劳</p>
                    <span>348,764</span>
                  </li>
                  <li>
                    <p><span class="rindex">3</span> 华莱士</p>
                    <span>298,114</span>
                  </li>
                  <li>
                    <p><span>4</span> 海底捞</p>
                    <span>244,312</span>
                  </li>
                  <li>
                    <p><span>5</span> 汉堡王</p>
                    <span>219,778</span>
                  </li>
                  <li>
                    <p><span>6</span> 小龙虾</p>
                    <span>215,189</span>
                  </li>
                  <li>
                    <p><span>7</span> 烧烤</p>
                    <span>209,889</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs'

export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      value1: [],
      barChart: null
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    arrlist() {
      return this.activeName === 'sale' ? [180, 392, 200, 154, 170, 160, 200, 152, 176, 234, 290, 330] : [280, 332, 340, 204, 140, 150, 170, 162, 216, 204, 230, 220]
    }
  },
  watch: {
    title() {
      this.barChart.setOption({
        title: {
          text: this.title + '趋势'
        },
        series: [
          {
            name: this.title,
            type: 'bar',
            barWidth: '60%',
            data: this.arrlist
          }
        ]
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.barChart = echarts.init(this.$refs.charts1)
    // 配置数据
    this.barChart.setOption({
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: this.title,
          type: 'bar',
          barWidth: '60%',
          data: this.arrlist
        }
      ]
    })
  },
  methods: {
    handleClick(tab, event) {

    },
    setday() {
      const day = dayjs().format('YYYY-MM-DD')
      this.value1 = [day, day]
    },
    setweek() {
      const week = dayjs().day(1).format('YYYY-MM-DD')
      const week1 = dayjs().day(7).format('YYYY-MM-DD')
      this.value1 = [week, week1]
    },
    setmonth() {
      const week = dayjs().startOf('month').format('YYYY-MM-DD')
      const week1 = dayjs().endOf('month').format('YYYY-MM-DD')
      this.value1 = [week, week1]
    },
    setyear() {
      const week = dayjs().startOf('year').format('YYYY-MM-DD')
      const week1 = dayjs().endOf('year').format('YYYY-MM-DD')
      this.value1 = [week, week1]
    }
  }
}

</script>

<style scoped>

.sale{
    margin-top: 20px;
}
  .box-card {
    width: 100%;
  }

  .clearfix{
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .tab{
    width: 100%;
  }

.right{
    position: absolute;
    right: 0;
}

.right span {
    margin-left: 30px;
    font-size: 14px;
}

.date{
    margin-left: 30px;
    width: 250px;
}

.charts1{
    width: 100%;
    height: 300px;
}

.list{
    width: 100%;
    height: 300px;
}

.list h3{
 margin: 0;
 padding: 0;
 margin-bottom: 15px;
}

.list ul {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}

.list ul li{
    height: 37px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list ul li p{
    display: flex;
    width: 80px;
}

.list ul li p span{
    margin-right: 10px;
}
.rindex{
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: black;
    color: white;
    text-align: center;
    line-height: 18px;
}
</style>

