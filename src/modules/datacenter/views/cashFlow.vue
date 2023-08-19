<template>
  <div class="app-container" v-loading="false">
    <!--头部搜索选项-->
    <div class="header_bar">
      <el-card class="box-card ">
        <div class="search_bar">
          <div>
            <div>
              <!--选项条-->
              <div class="block">
                <el-radio-group v-model="searchDays" @change="changeDays($event)">
                  <el-radio-button label="0">今日</el-radio-button>
                  <el-radio-button label="1">昨日</el-radio-button>
                  <el-radio-button label="2">近7日</el-radio-button>
                </el-radio-group>
              </div>
              <!--日期选择-->
              <div class="block">
                <el-date-picker
                  @change="checkDataRange"
                  v-model="searchForm.days"
                  :clearable="false"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期时间"
                  end-placeholder="结束日期时间"
                  value-format="timestamp"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </div>
            </div>
            <!--下方选项-->
            <div style="margin-top: 10px">
              <div>
                <el-radio-group v-model="searchForm.type" size="small" @change="submitSearch">
                  <!--<el-radio-button label="1" >运营商</el-radio-button>-->
                  <el-radio-button label="2" v-if="userType==2||userType==3">下级</el-radio-button>
                  <el-radio-button label="1" v-if="userType==2||userType==3">商户</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div>
            <el-button type="primary" size="small" @click="submitSearch">搜索</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!--中间卡片-->
    <div class="card_group">
      <!--订单金额-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/订单金额.png" alt="">
            </div>
            <div class="tools_text">
              <p>订单金额</p>
              <p>￥{{cardData.orderAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>
      <!--订单数-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/订单数.png" alt="">
            </div>
            <div class="tools_text">
              <p>订单数</p>
              <p>{{cardData.orderCount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--退款金额-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/退款金额.png" alt="">
            </div>
            <div class="tools_text">
              <p>退款金额</p>
              <p>￥{{cardData.refundAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--订单数-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/订单数.png" alt="">
            </div>
            <div class="tools_text">
              <p>退款数</p>
              <p>{{cardData.refundCount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--有效交易基数-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/有效交易数.png" alt="">
            </div>
            <div class="tools_text">
              <p>有效交易基数</p>
              <p>{{cardData.validAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--佣金-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/佣金.png" alt="">
            </div>
            <div class="tools_text">
              <p>佣金</p>
              <p>￥{{cardData.commissionAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--顾客实付-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/顾客实付.png" alt="">
            </div>
            <div class="tools_text">
              <p>顾客实付</p>
              <p>￥{{cardData.actPayAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--优惠金额-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/优惠金额.png" alt="">
            </div>
            <div class="tools_text">
              <p>优惠金额</p>
              <p>￥{{cardData.discountAmount}}</p>
            </div>
          </div>
        </el-card>
      </div>


    </div>

    <!--数据图表-->
    <div class="data_chart">

      <el-card class="box-card chart_card_left">
        <el-tabs class="left_tabs" v-model="leftActiveName" @tab-click="leftChangeTabs">
          <el-tab-pane label="订单" name="1">
            <div id="left_chart1" class="chart_img"
                 v-loading="leftDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
          <el-tab-pane label="退款" name="2">
            <div id="left_chart2" class="chart_img"
                 v-loading="leftDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
          <el-tab-pane label="佣金" name="3">
            <div id="left_chart3" class="chart_img"
                 v-loading="leftDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-card class="box-card chart_card_right">
        <el-tabs v-model="rightActiveName" @tab-click="rightChangeTabs">
          <el-tab-pane label="终端比例" name="1">
            <div id="right_chart1" class="chart_img"
                 v-loading="rightDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
          <el-tab-pane label="支付方式" name="2">
            <div id="right_chart2" class="chart_img"
                 v-loading="rightDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>

    <!--流水表格-->
    <div class="flow_table">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>流水明细</span>
          <!--          <el-button style="float: right; padding: 3px 0" type="text">导出</el-button>-->
        </div>
        <!--表格-->
        <div class="flow_table_list">
          <el-table
            :data="flowData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              v-if="userType!=4"
              prop="subAgentName"
              label="下级商名称"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <!--<el-table-column-->
            <!--v-if="searchForm.type==1"-->
            <!--prop="agentName"-->
            <!--:label="agentName"-->
            <!--show-overflow-tooltip-->
            <!--width="200">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--v-if="searchForm.type==1 || searchForm.type==2"-->
            <!--prop="subAgentName"-->
            <!--:label="disName"-->
            <!--show-overflow-tooltip-->
            <!--width="200">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="merchantName"
              label="商户名称"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="订单金额">
            </el-table-column>
            <el-table-column
              prop="refundAmount"
              label="退款金额">
            </el-table-column>
            <!--2020-01-08添加 有效交易笔数-->
            <el-table-column
              prop="validCount"
              label="有效交易笔数">
            </el-table-column>
            <el-table-column
              prop="validDealAmount"
              label="有效交易基数">
            </el-table-column>
            <el-table-column
              prop="customerPaidAmount"
              label="顾客实际支付">
            </el-table-column>
            <el-table-column
              prop="discountAmount"
              label="优惠">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="goDetail(scope.row.merchantId)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--翻页-->
        <pagination
          :total-elements="flowTotalElement"
          :change-callback="getFlowList"
          ref="page"></pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import {
    flowData,
    flowTableData
  } from '@/modules/datacenter/api/datacenter'

  import pagination from '@/components/pagination/index'

  export default {
    name: 'cashFlow',
    components: {pagination},
    data() {
      return {
        loading: true,//加载动画
        userType: '',//登录用户类型
        searchDays: '2',//搜索天数
        searchForm: {
          days: [],//日期
          type: '1'//类型
        },
        leftActiveName: '1', //左侧图表标签页Index
        rightActiveName: '1', //右侧图表标签页Index
        cardData: {
          commissionAmount: '1',
          customerPaidAmount: '0',
          discountAmount: '0',
          orderAmount: '0',
          orderNum: '0',
          refundAmount: '0',
          refundNum: '0',
          validDealAmount: '0',
        },//卡片数据

        leftDataNull: true,
        rightDataNull: true,
        flowData: [],//流水列表
        flowTotalElement: 0,//流水条目总数

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted() {
      this.userType = sessionStorage.getItem('userType');
      //默认查询
      this.defaultSearch()
    },
    methods: {
      /**
       * 第一次默认查询
       */
      defaultSearch() {
        //设定7天日期//2
        this.changeDays(2)
      },

      /**
       * 手动发起查询
       */
      submitSearch: function () {
        this.loading = true;
        this.showCardData()
      },
      /**
       *检查时间
       * 如果不对，则修改为里结束日期的前31天。
       */
      checkDataRange() {
        let timestamp = (new Date()).getTime();
        let startTime = this.searchForm.days[0];
        let endTime = this.searchForm.days[1];
        if (endTime - startTime > 24 * 60 * 60 * 1000 * 90) {
          this.$message.error('前后时间不能超过90天');

          this.$set(this.searchForm.days, 0, timestamp - (24 * 60 * 60 * 1000 * 90));
          this.$set(this.searchForm.days, 1, timestamp);
          this.submitSearch() //限定范围后再发起搜索
        } else if (endTime > timestamp) {
          this.$message.error('搜索日期不能大于当天');
          this.$set(this.searchForm.days, 1, timestamp);
          this.submitSearch() //允许发起搜索
        } else {
          this.submitSearch() //允许发起搜索
        }
      },
      /**
       * 快捷方式修改日期
       * @param event 日期范围选项
       */
      changeDays: function (event) {
        let timestamp = (new Date()).getTime();
        if (event == 0) {
          //当日0点
          this.$set(this.searchForm.days, 0, new Date(new Date().toLocaleDateString()).getTime());
          this.$set(this.searchForm.days, 1, new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
        } else if (event == 1) {
          let startTime = new Date(new Date().toLocaleDateString()).getTime() - (24 * 60 * 60 * 1000);
          let endTime = new Date(new Date().toLocaleDateString()).getTime() - 1000;
          this.$set(this.searchForm.days, 0, startTime);
          this.$set(this.searchForm.days, 1, endTime)
        } else if (event == 2) {
          let startTime = new Date(new Date().toLocaleDateString()).getTime() - (24 * 60 * 60 * 1000 * 6);
          let endTime = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
          this.$set(this.searchForm.days, 0, startTime);
          this.$set(this.searchForm.days, 1, endTime)
        }
        this.submitSearch()


      },
      /**
       *渲染卡片
       */
      showCardData() {
        let st = this.format(this.searchForm.days[0]);
        let et = this.format(this.searchForm.days[1]);
        let ut = this.userType;
        let flag;

        if (ut == 1) {
          flag = false
        } else {
          if (this.searchForm.type == 1) {
            flag = true
          } else {
            flag = false
          }
        }

        flowData(st, et, flag).then(res => {
          let data = res.obj;
          this.cardData = data;

          this.loading = false; //取消遮罩

          this.leftChangeTabs(); //左图表
          this.rightChangeTabs();  //右图表
          this.getFlowList(1, 10) //底部列表

        }).catch(e => {

        })

      },

      /**
       * 切换左、右的图表标签页
       */
      leftChangeTabs() {
        this.drawLeftData()
      },
      rightChangeTabs() {
        this.drawRightData()
      },

      /**
       * 渲染图表数据 左、右
       */
      drawLeftData: function () {

        let dataRes = this.cardData.orderChartLineVO;
        let dataX = dataRes.xdata;
        console.log(this.leftActiveName);
        let dataAmount;
        let dataCount;

        if (this.leftActiveName == 1) {
          dataAmount = dataRes.orderAmountData;
          dataCount = dataRes.orderCountData
        } else if (this.leftActiveName == 2) {
          dataAmount = dataRes.refundAmountData;
          dataCount = dataRes.refundCountData
        } else if (this.leftActiveName == 3) {
          dataAmount = dataRes.commissionAmountData
        }

        if (dataX == null) {
          this.leftDataNull = true;
          return false
        }

        this.leftDataNull = false;
        if (this.leftActiveName == 1 || this.leftActiveName == 2) {
          var left_chart = this.$echarts.init(document.getElementById('left_chart' + this.leftActiveName));
          left_chart.setOption({
            title: {text: '统计', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: dataX,
            },//X轴标题
            yAxis: [
              {name: '金额', type: 'value'},
              {name: '数量', type: 'value'}
            ],
            legend: {
              data: ['金额', '数量'],
            },//不同选项
            series: [{
              data: dataAmount,
              name: '金额',
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
              data: dataCount,
              name: '数量',
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
        } else if (this.leftActiveName == 3) {
          var left_chart = this.$echarts.init(document.getElementById('left_chart' + this.leftActiveName));
          left_chart.setOption({
            title: {text: '统计', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: dataX,
            },//X轴标题
            yAxis: [
              {name: '金额', type: 'value'},
            ],
            legend: {
              data: ['金额'],
            },//不同选项
            series: [{
              data: dataAmount,
              name: '金额',
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
            }] //数据数组，多个数据，legend需要对于标题name
          })
        }
        setTimeout(() => {
          left_chart.resize();
        }, 200);

      },

      drawRightData: function () {
        let dataRes;
        if (this.rightActiveName == 1) {
          dataRes = this.cardData.payClientChartVO
        } else if (this.rightActiveName == 2) {
          dataRes = this.cardData.payWayChartVO
        }

        let titleArr = [];
        if (dataRes.length == 0) {
          this.rightDataNull = true;
          return false
        } else {
          for (let i in dataRes) {
            titleArr.push(dataRes[i].name)
          }
        }

        this.rightDataNull = false;
        var right_chart = this.$echarts.init(document.getElementById('right_chart' + this.rightActiveName));
        right_chart.setOption({
          // title: {text: '业务员发展商户占比', textStyle: {color: '#333', fontWeight: 'lighter', fontSize: '16'}},
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} @ (占{d}%)'
          },
          color: ['#37A1D9', '#fe9e7f', '#66DFE2', '#FFE38F'],
          legend: {
            data: titleArr,
          },//不同选项
          series: [
            {
              name: '占比',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: dataRes,
            }
          ]
        });

        setTimeout(() => {
          right_chart.resize();
        }, 200);
      },

      /**
       * 渲染列表
       */
      getFlowList: function (pageNum, pageSize) {
        let st = this.format(this.searchForm.days[0]);
        let et = this.format(this.searchForm.days[1]);
        flowTableData(st, et, pageNum, pageSize).then(res => {
          this.flowTotalElement = res.obj.totalElement;
          this.flowData = res.obj.data;

        }).catch(e => {
          //this.$message('oops')
        })
      },
      /**
       * 前往详情
       */
      goDetail(data) {
        //let id = data.id
        let id = data;
        let st = this.format(this.searchForm.days[0]);
        let et = this.format(this.searchForm.days[1]);
        this.$router.push({path: '/datacenter/views/flowDetail', query: {id: id, st: st, et: et}})
      },

      /**
       *
       * 工具
       * @param ts 时间戳
       * @returns {string} 格式化事时间
       */
      //时间格式化
      format(ts) {
        let time = new Date(ts);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        // return y + '-' + this.add0(m) + '-' + this.add0(d)
        return `${y}-${this.add0(m)}-${this.add0(d)} ${this.add0(hour)}:${this.add0(minute)}:${this.add0(second)}`
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0(m) {
        return m < 10 ? '0' + m : m
      },

    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
    vertical-align: middle;
  }

  .search_bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  /*卡片*/
  .card_group {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .card_item {
    width: 23%;
    margin: 20px 0 0 0;
  }


  .tools_box {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }


  .tools_img {
    width: 30%;
    text-align: left;
  }

  .tools_text {
    width: 70%;
    text-align: right;
  }

  .tools_text p {
    margin: 0;
    padding: 0;
    cursor: default;
  }

  .tools_text p:nth-child(1) {
    font-size: 14px;
    color: #888;
  }

  .tools_text p:nth-child(2) {
    padding: 5px 0 0 0;
    font-size: 26px;
    color: #3f3f3f;
  }

  /*图表*/
  .data_chart {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .chart_card_left {
    width: 59%;
  }

  .chart_card_right {
    width: 39%;
  }

  .chart_img {
    width: 100%;
    height: 500px;
  }


  /*流水表格*/
  .flow_table {
    margin-top: 20px;
  }


  @media (max-width: 1280px) {
    .search_bar {
      flex-direction: column;
    }

    .card_item {
      width: 49%;
    }
  }

  @media (max-width: 768px) {
    .tools_text {
      width: 100%;
      text-align: center;
    }

    .card_item {
      width: 100%;
    }

    .data_chart {
      flex-direction: column;
    }

    .chart_card_left {
      width: 100%;
    }

    .chart_card_right {
      margin-top: 20px;
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .tools_img {
      display: none;
    }

    .tools_text {
      width: 100%;
      text-align: center;
    }

    .card_item {
      width: 100%;
    }
  }
</style>
