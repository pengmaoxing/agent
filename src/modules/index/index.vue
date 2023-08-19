<template>
  <div class="app-container" v-loading="loading">
     <el-dialog
    :close-on-click-modal="false"
      title="公告内容"
      :visible.sync="addManager"
      width="850px"
      :before-close="addManagerClose">
      <div>
        <div class="tb_text" style="text-align: center;font-size: 19px;">{{notice2.title}}</div>  <!--内容--></br>
            <div class="tb_text" style="font-size: 17px;letter-spacing: 2px;line-height:150%">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{notice2.content}}</div>  <!--内容--></br>
            <div class="tb_text" style="text-align: right;font-size: 14px;">{{notice2.createTime}}</div> </br> <!--内容-->
        <div v-if="notice2.filepath!=''" class="tb_text" style="text-align: right;font-size: 16px;"><a @click="downloadFile()">点击附件下载</a></div>  <!--内容-->

      </div>
      <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>


    <!--卡片-->
    <div class="header_bar">

        <el-card class="box-card" style="width: 28%;height:235px">
          <div slot="header" class="clearfix">
            <span>公告</span>
          </div>
          <div style="margin-right: 15px; word-break: break-all">
            <ol type="1">
              <div v-for="(notice,i) in notices"  class="paragraph_indent" style="width: 100%">
                <li @click="addManagerOpen(i)" style="padding: 3px;" >{{notice.title}}<span style="float:right">{{getPartTime(notice.createTime)}}</span></li>
              </div>
            </ol>
          </div>
        </el-card>

        <el-card class="box-card " style="width: 72%;">
          <div slot="header" class="clearfix">
            <span>数据总览</span>
          </div>
          <div class="totalData">
            <!--userType1-->
            <template v-if="userType=='1'">
              <div class="total-card-item">
                <div class="total-card-icon">
                  <img src="../../assets/images/index/组 993.png" alt="">
                  <p class="total_title">下级商总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.subCompanyCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/组 1005.png" alt="">-->
                  <p class="total_title">今日新增下级商</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.newSubCompanyCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/组 995.png" alt="">-->
                  <p class="total_title">商户总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.merchantCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4803.png" alt="">-->
                  <p class="total_title">订单金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderMoney}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">订单数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderCount}}</p>
                </div>
              </div>
            </template>
            <!--userType2-->
            <template v-if="userType=='2'">
              <div class="total-card-item" style="display: flex;flex-direction: row;">
                <img src="../../assets/images/index/组 993.png" alt="" style="padding-top: 5%;" hspace="20">
                <div style="flex-direction: column;">
                  <div class="total-card-icon">
                    <p class="total_title">下级商总数</p>
                  </div>
                  <div class="total-card-text" style="">
                    <p class="total_num">{{cardData.subCompanyCount}}</p>
                  </div>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <img src="../../assets/images/index/组 1005.png" alt="">
                  <p class="total_title">今日新增下级商</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.newSubCompanyCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <img src="../../assets/images/index/组 995.png" alt="">
                  <p class="total_title">商户总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.merchantCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <img src="../../assets/images/index/路径 4803.png" alt="">
                  <p class="total_title">订单金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderMoney}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <img src="../../assets/images/index/路径 4801.png" alt="">
                  <p class="total_title">订单数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderCount}}</p>
                </div>
              </div>

            </template>
            <!--userType3-->
            <template v-if="userType=='3'">
              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">下级商总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.subCompanyCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">今日新增下级商</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.newSubCompanyCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">商户总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.merchantCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">订单金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderMoney}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">订单数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderCount}}</p>
                </div>
              </div>

            </template>
            <!--userType4-->
            <template v-if="userType=='4'">
              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">商户总数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.merchantCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">订单金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderMoney}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">退款金额</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.refundOrderMoney}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">订单数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.orderCount}}</p>
                </div>
              </div>

              <div class="total-card-item">
                <div class="total-card-icon">
                  <!--<img src="../../assets/images/index/路径 4801.png" alt="">-->
                  <p class="total_title">退款数</p>
                </div>
                <div class="total-card-text">
                  <p class="total_num">{{cardData.refundOrderCount}}</p>
                </div>
              </div>

            </template>
          </div>
        </el-card>
    </div>

    <!--数据卡片-->
    <div class="middle_chart">

      <el-card class="box-card chart_card0">
        <div id="left_chart" class="chart_img"
             v-loading="merchantDevelopmentLineChartDataNull"
             element-loading-text="没有数据"
             element-loading-spinner="el-icon-view"
             element-loading-background="rgba(255, 255, 255, 1)"></div>
      </el-card>

      <el-card class="box-card chart_card">
        <div id="right_chart" class="chart_img"
             v-loading="salesmanDevelopmentListDataNull"
             element-loading-text="没有数据"
             element-loading-spinner="el-icon-view"
             element-loading-background="rgba(255, 255, 255, 1)"></div>
      </el-card>

    </div>

    <div class="middle_chart">
      <el-card class="box-card chart_card">
        <div id="left_chart1" class="chart_img"
             v-loading="payWayDataNull"
             element-loading-text="没有数据"
             element-loading-spinner="el-icon-view"
             element-loading-background="rgba(255, 255, 255, 1)"></div>
      </el-card>


      <el-card class="box-card chart_card_right" style="height:340px">
        <el-tabs class="right_tabs" v-model="rightActiveName" @tab-click="changeOrderTabs">
          <el-tab-pane label="订单" name="0">
            <div id="right_charts0" class="chart_img"
                 v-loading="orderDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
          <el-tab-pane label="退款" name="1">
            <div id="right_charts1" class="chart_img"
                 v-loading="orderDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
          <el-tab-pane label="佣金" name="2">
            <div id="right_charts2" class="chart_img"
                 v-loading="orderDataNull"
                 element-loading-text="没有数据"
                 element-loading-spinner="el-icon-view"
                 element-loading-background="rgba(255, 255, 255, 1)">
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>
</template>

<script>

  import {
    getEssentialInformation, //获取服/运基本信息
    getDistributorEssentialInformation, //渠道商
    getStatisticsOrder,//获取当然订单
    getNoticeTop5
  } from './api/index.js'
  import {url} from '@/utils/request'


  export default {
    components: {},
    name: 'index',
    data() {
      return {
        loading: false,//加载转圈
        userType: '',
        notices:"",
        notice2:"",
        addManager:false,
        cardData: {
          merchantCount: '',
          newSubCompanyCount: '',
          orderCount: '',
          orderMoney: '',
          refundOrderCount: '',
          refundOrderMoney: '',
          subCompanyCount: '',
        },
        leftDataNull: true,
        payWayDataNull: true,
        salesmanDevelopmentListDataNull: true,
        merchantDevelopmentLineChartDataNull: true,
        orderDataNull: true,
        rightActiveName: '0', //右侧图表标签页Index
        type: '',


        //业务员发展占比
        salesmanDevelopmentList: [],
        //区域发展
        merchantDevelopmentLineChart: [],
        //支付方式
        payWayList: [],

        // 当日数据


        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted() {
      this.userType = sessionStorage.getItem('userType');


      //获取卡片数据
      if (this.userType == 1 || this.userType == 2 || this.userType == 3) {
        this.getEssentialInformation()
      } else if (this.userType==4){
        this.getDistributorEssentialInformation()
      }
      this.getnotice();
    },
    methods: {

      downloadFile: function () {
          window.open(this.imgFil(this.notice2.filepath));
      },

      imgFil: function (val) {
        //resource
        //C:\temp\md5\0B19C4398D0C4D5E82D717EA73A9D164.jpg
        if (val == '' || val == null) {
          return ''
        }
        let arrayStr = val.split('\\'); // 凭\\分割出文件名

        console.log(arrayStr);
        if(arrayStr.length>4){
          return url + '/filepath/'+arrayStr[(arrayStr.length - 2)]+"/" + arrayStr[(arrayStr.length - 1)];
        }else{
          return url + '/filepath/' + arrayStr[(arrayStr.length - 1)];
        }
      },

      addManagerClose: function () {
        this.notice2 = {
        };
        this.addManager = false
      },
      addManagerOpen: function (obj) {
        this.notice2 =this.notices[obj];
     //   this.notice2.urlpath=this.imgFil(this.notice2.filepath);
        this.addManager = true
      },

      getPartTime(val){
        //let ti = val.split(' ');
        var timearr = val.replace(" ", ":").replace(/\:/g, "-").split("-");
        var timestr = ""+ Number(timearr[1])+ "月" + timearr[2]+"日";
        console.log(4444,val)
        return timestr;
      },

      getnotice: function(){
        getNoticeTop5().then(res => {
          let data = res.obj;
          if (data) {
            this.notices=data.content;
          } else {
            this.$message.error('数据不完整');
            this.loading = true
          }
          //获取当日订单
          this.getStatisticsOrder(0)
        }).catch(e => {
        })
      },

      /**
       * 获取卡片数据 服务商/运营商/渠道商
       */
      getEssentialInformation: function () {
        getEssentialInformation().then(res => {
          let data = res.obj;
          if (data) {
            this.dataSet(data)
          } else {
            this.$message.error('数据不完整');
            this.loading = true
          }

          //获取当日订单
          this.getStatisticsOrder(0)
        }).catch(e => {

        })
      },

      /**
       *获取卡片数据 推广商
       */
      getDistributorEssentialInformation: function () {
        getDistributorEssentialInformation().then(res => {
          let data = res.obj;
          if (data) {
            this.dataSet(data)
          } else {
            this.$message.error('数据不完整');
            this.loading = true
          }
          //获取当日订单
          this.getStatisticsOrder(0)
        }).catch(e => {

        })
      },


      //数据填充
      dataSet: function (data) {
        let ut = this.userType
        if (ut == 1 || ut == 2 || ut == 3) {
          this.cardData.subCompanyCount = data.subCompanyCount || 0;
          this.cardData.newSubCompanyCount = data.newSubCompanyCount || 0;
          this.cardData.merchantCount = data.merchantCount || 0;
          this.cardData.orderMoney = data.orderMoney || 0;
          this.cardData.orderCount = data.orderCount || 0;

          this.salesmanDevelopmentList = data.salesmanDevelopmentList;
          this.merchantDevelopmentLineChart = data.merchantDevelopmentLineChart;
          this.payWayList = data.payWayList;

          this.drawSalesmanDevelopmentListData();
          this.drawPayWayDatail()
          this.drawDevelopmentDatail()

        } else if (ut == 4) {
          this.cardData.merchantCount = data.merchantCount || 0;
          this.cardData.orderMoney = data.orderMoney || 0;
          this.cardData.orderCount = data.orderCount || 0;
          this.cardData.refundOrderCount = data.refundOrderCount || 0;
          this.cardData.refundOrderMoney = data.refundOrderMoney || 0;

          this.salesmanDevelopmentList = data.salesmanDevelopmentList;
          this.merchantDevelopmentLineChart = data.merchantDevelopmentLineChart;
          this.payWayList = data.payWayList;

          this.drawSalesmanDevelopmentListData();
          this.drawPayWayDatail()
          this.drawDevelopmentDatail()
        }

      },
      /**
       * 切换当日订单图表标签页
       */
      changeOrderTabs() {
        let tabs = this.rightActiveName;
        this.getStatisticsOrder(tabs) //3
      },
      /**
       * 获取订单数据
       */
      getStatisticsOrder: function (chartType) {
        let ut = this.userType
        getStatisticsOrder(ut, chartType).then(res => {
          let data = res.obj;
          this.drawOrderDatail(data) //渲染当日订单
        }).catch(e => {

        })
      },

      /**
       * Echart----------------------------------
       * @param res
       */

      drawLeftData: function (res) {
        if (res == null) {
          this.leftDataNull = true;
          return
        }
        var left_chart = this.$echarts.init(document.getElementById('left_chart'));
        //定义图表
        this.leftDataNull = false;
        left_chart.setOption({
          color: ['#FE9E7F', '#37A1D9'],
          title: {text: '商户发展区域统计', textStyle: {color: '#333', fontWeight: 'bold', fontSize: '16'}},
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} 家',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.xdata,
          },//X轴标题
          legend: {
            data: ['全部', '当月新增'],

          },//不同选项
          yAxis: {
            type: 'value'
          },
          series: [{
            data: res.ydata,
            name: '全部',
            type: 'line',
            areaStyle: {
              color: 'white'
            },

          },
            {
              data: res.num,
              name: '当月新增',
              type: 'line',
              areaStyle: {
                color: 'white'
              },

            }]  //数据数组，多个数据，legend需要对于标题name
        });
        this.loading = false

      },

      /**
       * 业务员发展
       */
      drawSalesmanDevelopmentListData: function () {
        let charata = this.salesmanDevelopmentList;

        let staff = [];
        let res = [];
        if (charata) {
          for (let i in charata) {
            staff.push(charata[i].name);
            res.push(charata[i].value)
          }
        }
        let ut = this.userType
        let title;
        if (ut == 1) {
          title = `业务员发展下级商占比`
        } else if (ut == 2) {
          title = `业务员发展下级商占比`
        } else if (ut == 3) {
          title = `业务员发展下级商占比`
        }else if (ut == 4) {
          title = `业务员发展商户占比`
        }

        console.log(staff, res)

        var salesmanDevelopmentList_chart = this.$echarts.init(document.getElementById('right_chart'));
        //定义图表
        this.salesmanDevelopmentListDataNull = false;
        salesmanDevelopmentList_chart.setOption({
          color: ['#37A1D9', '#FE9E7F', '#66DFE2', '#FFE38F'],
          title: {text: title, textStyle: {color: '#333', fontWeight: 'bold', fontSize: '16'}},
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} 家 (占{d}%)'
          },
          legend: {
            orient: 'vertical',
            top: '30',
            right: '0',
            data: staff
          },
          series: [
            {
              name: '发展商户数量及占比',
              type: 'pie',
              radius: ['55%', '70%'],
              center: ['50%', '50%'],
              data: charata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },

            }
          ]
        });
      },

      /**
       * 支付方式
       * @param res
       */
      drawPayWayDatail: function () {

        let charata = this.payWayList;
        let payType = [];
        let res = [];
        if (charata) {
          for (let i in charata) {
            payType.push(charata[i].name);
            res.push(charata[i].value)
          }
        }
        var payWay_chart = this.$echarts.init(document.getElementById('left_chart1'));
        //定义图表
        this.payWayDataNull = false;
        payWay_chart.setOption({
          color: ['#66DFE2', '#3EBDFF', '#8fe097'],
          title: {text: '支付方式', textStyle: {color: '#333', fontWeight: 'bold', fontSize: '16'}},
          tooltip: {
            trigger: 'item',
            formatter: '{a} (占{d}%)'
          },
          legend: {
            orient: 'vertical',
            top: '30',
            right: '0',
            data: payType
          },
          series: [
            {
              name: '支付方式及占比',
              type: 'pie',
              radius: '70%',
              center: ['50%', '50%'],
              data: charata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },


      /**
       * 当日订单数据
       * @param orderRes
       */
      drawOrderDatail: function (orderRes) {
        if (!orderRes) {
          this.orderDataNull = true;
          return;
        }
        this.orderDataNull = false;
        var order_chart = this.$echarts.init(document.getElementById('right_charts' + this.rightActiveName));
        //定义图表
        order_chart.setOption({
          color: '#37A1D9',
          title: {text: '当日数据', textStyle: {color: '#333', fontWeight: 'bold', fontSize: '14'}},
          tooltip: {
            trigger: 'item',
            formatter: '{b}的数据{c}'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: orderRes.xdata
          },//X轴标题

          yAxis: {
            type: 'value',
          },
          series: [{
            data: orderRes.ydata,
            name: '金额',
            type: 'line',
            areaStyle: {},
            itemStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#3EBDFF'},  //0%处的颜色
                    {offset: 0.5, color: '#66DFE2'},//50%处的颜色
                    {offset: 1, color: 'white'}  //100%处的颜色
                  ]
                )
              }
            }
          }]  //数据数组，多个数据，legend需要对于标题name
        });
        setTimeout(() => {
          order_chart.resize();
        }, 200);
      },


      /**
       * 区域发展
       * @param orderRes
       */
      drawDevelopmentDatail: function () {
        let dateRes = this.merchantDevelopmentLineChart
        console.log(dateRes)
        this.merchantDevelopmentLineChartDataNull = false;
        var development_chart = this.$echarts.init(document.getElementById('left_chart'));
        //定义图表
        development_chart.setOption({
          color: '#37A1D9',
          title: {text: '商户发展区域统计', textStyle: {color: '#333', fontWeight: 'bold', fontSize: '14'}},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            orient: 'horizontal',
            top: '0',
            data: ['全部','当日新增']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateRes.xdata
          },//X轴标题
          yAxis: [
            {name: '全部', type: 'value'},
            {name: '当日新增', type: 'value'},
          ],
          series: [{
            data: dateRes.num,
            name: '全部',
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
                    {offset: 0, color: '#fe9e7f'},  //0%处的颜色
                    {offset: 0.5, color: '#fe9e7f'},//50%处的颜色
                    {offset: 1, color: 'white'}  //100%处的颜色
                  ]
                )
              }
            }
          },
            {
              data: dateRes.ydata,
              name: '当日新增',
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
                      {offset: 0, color: '#3EBDFF'},  //0%处的颜色
                      {offset: 0.5, color: '#66DFE2'},//50%处的颜色
                      {offset: 1, color: 'white'}  //100%处的颜色
                    ]
                  )
                }
              }
            }]  //数据数组，多个数据，legend需要对于标题name
        });
        setTimeout(() => {
          development_chart.resize();
        }, 200);
      }

    }
  }
</script>

<style scoped>
  .clearfix span {
    /* color: #FF000000; */
    font-size: 18px;
    font-weight: bold
  }

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

  .total_title p {
    height: 15px;
  }

  .total-card-text {

  }

  .total-card-text > p {
    color: #3A3A3A;
    margin-top: 0;
    margin-bottom: 0;
    height: 40px;
    font-size: 50px;
    font-weight:bold;
  }

  /*小工具*/
  .header_left_bottom {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header_left_bottom > div {
    width: 32%;
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
    cursor: pointer;
  }

  .tools_text p:nth-child(1) {
    font-size: 16px;
    color: #4fa2ff;
  }

  .tools_text p:nth-child(2) {
    font-size: 14px;
    color: #888;
  }

  /*最新通告*/
  .public_news {
    height: 252px;
  }

  .public_news_box {
    height: 100%;
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

  .chart_card0, .chart_card_right {
    width: 59%;
  }

  .chart_card {
    width: 39%;

  }

  .chart_img {
    width: 100%;
    height: 300px;
  }


  @media (max-width: 1248px) {
    .header_bar {
      flex-direction: column;
    }

    .header_left {
      width: 100%;
    }

    .header_right {
      width: 100%;
      margin: 20px 0 0 0;
    }
  }

  @media (max-width: 768px) {
    .totalData {
      flex-direction: column;
    }

    .column_line {
      width: 80px;
      height: 1px;
    }

    .header_left_bottom {
      flex-direction: column;
    }

    .header_left_bottom > div {
      width: 100%;
      margin-bottom: 10px;
    }

    .tools_img {
      display: none;
    }

    .tools_text {
      width: 100%;
      text-align: center;
    }

    .middle_chart {
      width: 100%;
      flex-direction: column;
    }

    .chart_card {
      width: 100%;
      margin-bottom: 20px;
    }

    p {
      margin-block-start: 0em;
      margin-block-end: 0em;
    }
  }
</style>
