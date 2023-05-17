<template>
  <div class="card">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" cont="¥ 12650">
            <template slot="charts">
              <span style="font-size: 14px;">周同比 &nbsp;&nbsp; 56.67% <svg t="1683707068477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357" width="16" height="16"><path d="M929.408 202.752l-205.269333 24.661333a8.234667 8.234667 0 0 0-4.864 13.994667l61.141333 60.928-232.96 232.32-104.874667-104.533333a16.469333 16.469333 0 0 0-23.296 0l-331.52 330.752a8.234667 8.234667 0 0 0 0 11.605333l46.336 46.464a8.277333 8.277333 0 0 0 11.648 0l285.184-284.288 104.789334 104.533333c6.485333 6.357333 16.896 6.357333 23.296 0l279.722666-278.784 61.098667 60.970667c4.821333 4.821333 13.226667 1.962667 14.037333-4.821333l24.746667-204.8a8.106667 8.106667 0 0 0-9.216-9.002667z" fill="#1afa29" p-id="3358" /></svg></span>
              <span style="font-size: 14px;">日同比 &nbsp;&nbsp; 19.16% <svg t="1683707186150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4601" width="16" height="16"><path d="M938.581333 812.117333l-24.746666-204.714666a8.277333 8.277333 0 0 0-13.994667-4.821334l-61.098667 61.013334-279.637333-278.698667a16.597333 16.597333 0 0 0-23.253333 0l-104.96 104.533333-285.141334-284.373333a8.277333 8.277333 0 0 0-11.648 0L87.722667 251.52a8.234667 8.234667 0 0 0 0 11.605333l331.52 330.794667c6.4 6.485333 16.938667 6.485333 23.338666 0l104.917334-104.533333 232.96 232.277333-61.098667 60.970667a8.234667 8.234667 0 0 0 4.864 13.952l205.312 24.661333a8.106667 8.106667 0 0 0 9.045333-9.130667z" fill="#d81e06" p-id="4602" /></svg></span>
            </template>
            <template slot="footer">
              <span style="font-size: 14px;">日销售额 &nbsp;¥12561</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="访问量" cont="88460">
            <template slot="charts">
              <lineChart />
            </template>

            <template slot="footer">
              <span style="font-size: 14px;">日访问量 &nbsp;6578</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" cont="62135">
            <template slot="charts">
              <barChart />
            </template>
            <template slot="footer">
              <span style="font-size: 14px;">转化率 &nbsp;65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" cont="78%">
            <template slot="charts">
              <gressChart />
            </template>
            <template slot="footer">
              <span style="font-size: 14px;">周同比 &nbsp;&nbsp; 12.7% <svg t="1683707068477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357" width="16" height="16"><path d="M929.408 202.752l-205.269333 24.661333a8.234667 8.234667 0 0 0-4.864 13.994667l61.141333 60.928-232.96 232.32-104.874667-104.533333a16.469333 16.469333 0 0 0-23.296 0l-331.52 330.752a8.234667 8.234667 0 0 0 0 11.605333l46.336 46.464a8.277333 8.277333 0 0 0 11.648 0l285.184-284.288 104.789334 104.533333c6.485333 6.357333 16.896 6.357333 23.296 0l279.722666-278.784 61.098667 60.970667c4.821333 4.821333 13.226667 1.962667 14.037333-4.821333l24.746667-204.8a8.106667 8.106667 0 0 0-9.216-9.002667z" fill="#1afa29" p-id="3358" /></svg></span>
              <span style="font-size: 14px;">日同比 &nbsp;&nbsp; 11.16% <svg t="1683707186150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4601" width="16" height="16"><path d="M938.581333 812.117333l-24.746666-204.714666a8.277333 8.277333 0 0 0-13.994667-4.821334l-61.098667 61.013334-279.637333-278.698667a16.597333 16.597333 0 0 0-23.253333 0l-104.96 104.533333-285.141334-284.373333a8.277333 8.277333 0 0 0-11.648 0L87.722667 251.52a8.234667 8.234667 0 0 0 0 11.605333l331.52 330.794667c6.4 6.485333 16.938667 6.485333 23.338666 0l104.917334-104.533333 232.96 232.277333-61.098667 60.970667a8.234667 8.234667 0 0 0 4.864 13.952l205.312 24.661333a8.106667 8.106667 0 0 0 9.045333-9.130667z" fill="#d81e06" p-id="4602" /></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import gressChart from './gressChart'

export default {
  name: 'Card',
  components: {
    Detail,
    lineChart,
    barChart,
    gressChart
  },
  data() {
    return {

    }
  }
}

</script>

<style scoped>

</style>
