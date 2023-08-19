<template>
  <div class="app-container" v-loading="loading">
    <!--卡片-->
    <div class="header_bar">

      <div class="header_top">
        <el-card class="box-card ">
          <div slot="header" class="clearfix">
            <span>数据总览</span>
          </div>
          <div class="totalData">
            <!--userType1-->
            <template>
              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">分佣代理商总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{previewData.commissionAgentAmount||'0'}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">分佣商户总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{previewData.commissionMerchantAmount||'0'}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">今日新增商户数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{previewData.newMerchantAmount||'0'}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">本月分佣订单金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num"><span class="money-tag">￥</span>{{previewData.monthOrderMoneyAmount||'0'}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">本月分佣订单数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{previewData.monthOrderAmount||'0'}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <p class="total_title">本月累计分佣</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num"><span class="money-tag">￥</span>{{previewData.monthCommissionAmount||'0'}}</p>
                </div>
              </div>
            </template>
          </div>
        </el-card>
      </div>
    </div>

    <!--数据-->
    <div class="middle_chart">

      <el-card class="box-card chart_card">
        <div id="left_charts" class="chart_img"
             v-loading="dataViewNull"
             element-loading-text="没有数据"
             element-loading-spinner="el-icon-view"
             element-loading-background="rgba(255, 255, 255, 1)">
        </div>
      </el-card>

      <el-card class="box-card chart_card">
        <div id="right_charts" class="chart_img"
             v-loading="orderViewNull"
             element-loading-text="没有数据"
             element-loading-spinner="el-icon-view"
             element-loading-background="rgba(255, 255, 255, 1)">
        </div>
      </el-card>

    </div>

  </div>

</template>

<script>
  import {getPreviewData} from '../api/teamData'

  export default {
    name: "teamData",
    data() {
      return {
        loading: false, //页面mask

        //页面数据
        dataViewNull: true,
        orderViewNull: true,
        left_active: '',
        right_active: '',

        //数据显示
        previewData: {}, //顶部数据总览
      }
    },
    mounted() {
      //获取数据
      this.getPreviewData()
    },
    methods: {

      /**
       * 获取数据
       */
      getPreviewData: function () {
        getPreviewData().then(res => {
          let data;
          data = res.obj;
          //全部数据赋值
          this.previewData = data;

          //如果没有图表数据
          if (data !== null || JSON.stringify(data) !== "{}") {
            this.showLeftChart();
            this.showRightChart()
          }
        }).catch(e => {

        })
      },

      /**
       * 渲染左侧图表
       */
      showLeftChart: function () {
        let data = this.previewData.commissionChartDataVO;  //request数据
        if (data === null || JSON.stringify(data) === "{}") {
          this.dataViewNull = true;
          return
        }
        var left_chart = this.$echarts.init(document.getElementById('left_charts'));
        //定义图表
        this.orderViewNull = false;
        left_chart.setOption({
          title: {text: '分佣历史统计', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.xdata,
          },//X轴标题
          yAxis: [
            {name: '分佣', type: 'value'}
          ],
          legend: {
            data: ['分佣'],
          },//不同选项
          series: [{
            data: data.ydata,
            name: '分佣',
            type: 'line',
            smooth: true,
            areaStyle: {},
            yAxisIndex: 0,
            tooltip: {
              trigger: 'axis'
            },
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#94beff'},  //0%处的颜色
                    {offset: 0.5, color: '#94beff'},//50%处的颜色
                    {offset: 1, color: '#94beff'}  //100%处的颜色
                  ]
                )
              }
            }
          }] //数据数组，多个数据，legend需要对于标题name
        })
      },

      /**
       * 渲染右侧图表
       */
      showRightChart: function () {
        let data = this.previewData.orderChartDataVO; //request数据
        if (data === null || JSON.stringify(data) === "{}") {
          this.orderViewNull = true;
          return
        }
        var right_chart = this.$echarts.init(document.getElementById('right_charts'));
        //定义图表
        this.orderViewNull = false;
        right_chart.setOption({
          title: {text: '订单数据', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.xdata,
          },//X轴标题
          yAxis: [
            {name: '订单金额', type: 'value'},
            {name: '订单数量', type: 'value'}
          ],
          legend: {
            data: ['订单金额', '订单数量'],
          },//不同选项
          series: [{
            data: data.ydata,
            name: '订单金额',
            type: 'line',
            smooth: true,
            areaStyle: {},
            yAxisIndex: 0,
            tooltip: {
              trigger: 'axis'
            },
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#ffc0cb'},  //0%处的颜色
                    {offset: 0.5, color: '#ffc0cb'},//50%处的颜色
                    {offset: 1, color: 'pink'}  //100%处的颜色
                  ]
                )
              }
            }
          }, {
            data: data.num,
            name: '订单数量',
            type: 'line',
            smooth: true,
            areaStyle: {},
            yAxisIndex: 1,
            tooltip: {
              trigger: 'axis'
            },
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#3ebdff'},  //0%处的颜色
                    {offset: 0.5, color: '#3ebdff'},//50%处的颜色
                    {offset: 1, color: 'white'}  //100%处的颜色
                  ]
                )
              }
            }
          }] //数据数组，多个数据，legend需要对于标题name
        })
      },
    }

  }
</script>

<style scoped>
  .header_bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .header_left {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header_top {
    width: 100%;
  }

  .header_right {
    width: 38%;
    margin-left: 2%;
  }

  /*数据简报*/
  .totalData {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .totalData > div > div {

  }

  .total-card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .total-card-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .total_title {
    color: #8d8d8d;
  }

  .total-card-text {
    text-align: center;
  }

  .total-card-text > p {
    color: #555555;
    margin-top: 0;
    margin-bottom: 0;
    height: 40px;
    font-size: 36px;
  }

  .money-tag {
    font-size: 24px;
    color: #6e798e;
  }

  /*图表*/
  .middle_chart {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .chart_card {
    width: 49%;
    height: 400px;
  }

  .chart_card > div {
    overflow-y: hidden;
  }

  .chart_img {
    width: 100%;
    height: 350px;
  }
</style>
