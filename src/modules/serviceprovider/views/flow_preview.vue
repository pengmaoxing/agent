<template>
  <div class="app-container" v-loading="loading">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>流水概览</span>
        </div>
        <div>
          <div>
            <div class="search_bar">
              <div>
                <div>
                  <!-- 支持关键字搜索 -->
                  <el-select v-model="param.company" class="input-width-2" clearable @change="flowGetLabel"
                             filterable placeholder="支持关键字搜索">
                    <el-option
                      v-for="item in companyOption"
                      :key="item.id"
                      :label="item.name"
                      :value="`${item.id},${item.name}`">
                    </el-option>
                  </el-select>
                  
                  <el-select v-model="param.payChannel" @change="flowCollectGetPayChannelLabel" placeholder="支付通道" clearable class="formItem">
                    <el-option
                      v-for="item in PayChannelOption"
                      :key="item.value"
                      :label="item.name"
                      :value="`${item.value},${item.name}`">
                    </el-option>
                  </el-select>
                  <el-select v-model="param.payWay" @change="flowDetailGetPayWayLabel" placeholder="支付方式" clearable class="formItem">
                    <el-option
                      v-for="item in PayWayOption"
                      :key="item.value"
                      :label="item.name"
                      :value="`${item.value},${item.name}`">
                    </el-option>
                  </el-select>
                  <!--日期选择-->
                  <div class="block dataSearch" prop="begin">
                    <el-date-picker
                      v-model="param.begin"
                      type="datetime"
                      placeholder="选择开始日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 200px;">
                    </el-date-picker>
                  </div>
                  <div class="block dataSearch" prop="end">
                    <el-date-picker
                      v-model="param.end"
                      type="datetime"
                      placeholder="选择结束日期"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      style="width: 200px;">
                    </el-date-picker>
                  </div>
                  <!--按钮-->
                  <div class="block">
                    <el-button type="primary" size="medium" @click="searchFlow" style="margin-left: 10px">搜 索
                    </el-button>
                  </div>
                  <el-button type="warning" size="small" @click="flowDetailDownLoadSubmit(1)">商户流水明细导出</el-button>
                  <el-button type="warning" size="small" @click="flowDetailDownLoadSubmit(2)">商户流水汇总导出</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--卡片区-->
        <div>
          <div class="card_group">
            <!--订单金额-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/有效交易数.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>有效交易笔数
                      <el-tooltip class="item" effect="light" content="有效订单总笔数" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.total}}</p>
                  </div>
                </div>
              </el-card>
            </div>
            <!--退款金额-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/订单金额.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>有效交易金额
                      <el-tooltip class="item" effect="light" content="有效订单金额总和" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.priceSum}}元</p>
                  </div>
                </div>
              </el-card>
            </div>
            <!--订单总数-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/退款数.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>退款笔数
                      <el-tooltip class="item" effect="light" content="退款订单总笔数" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.validTotal}}</p>
                  </div>
                </div>
              </el-card>
            </div>
            <!--退款总数-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/退款金额.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>退款金额
                      <el-tooltip class="item" effect="light" content="退款订单金额总和" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.validPriceSum}}元</p>
                  </div>
                </div>
              </el-card>
            </div>
            <!--预授权冻结笔数-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/订单数.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>预授权冻结笔数
                      <el-tooltip class="item" effect="light" content="预授权冻结笔数" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.prepayCloseTotal}}</p>
                  </div>
                </div>
              </el-card>
            </div>
            <!--预授权冻结金额-->
            <div class="card_item">
              <el-card class="box-card">
                <div class="text item tools_box">
                  <div class="tools_img">
                    <img src="../../../assets/images/flow/佣金.png" alt="">
                  </div>
                  <div class="tools_text">
                    <p>预授权冻结金额
                      <el-tooltip class="item" effect="light" content="预授权冻结金额" placement="top-start">
                        <i class="el-icon-info"></i>
                      </el-tooltip>
                    </p>
                    <p>{{result.prepayCloseSum}}元</p>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--表格区-->
    <div>
      <el-card class="box-card table_box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <div class="action-container" id="flow">
            <!--公司-->
            <el-input v-model="param.name" :placeholder="flag" size="small"
                      class="formItem"></el-input>
            <!--按钮-->
            <!--<el-button type="primary" size="small" @click="searchFlowList(3,0,10)">查询</el-button>
            <el-button type="primary" size="small" @click="searchFlowList()">加载</el-button>-->
            <el-button type="primary" size="small" @click="searchBtn()">查询</el-button>
          </div>
          <el-tab-pane label="服务商流水汇总" name="1">
            <!--表格-->
            <el-table
              :data="serviceTableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="merchantName"
                label="服务商名"
                width="280">
              </el-table-column>
              <el-table-column
                prop="total"
                label="有效交易笔数"
              >
              </el-table-column>
              <el-table-column
                prop="prepayCloseTotal"
                label="预授权冻结笔数"
              >
              </el-table-column>
              <el-table-column
                prop="validTotal"
                label="退款笔数"
              >
              </el-table-column>
              <el-table-column
                prop="priceSum"
                label="有效交易金额"
              >
              </el-table-column>
              <el-table-column
                prop="prepayCloseSum"
                label="预授权冻结金额"
              >
              </el-table-column>
              <el-table-column
                prop="validPriceSum"
                label="退款金额"
              >
              </el-table-column>
            </el-table>
            <pagination
              :total-elements="totalElements1"
              :change-callback="serviceFlowList"
              ref="page"></pagination>
          </el-tab-pane>
          <el-tab-pane label="商户流水汇总" name="2">
            <!--表格-->
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="merchantName"
                label="商户名"
                width="280">
              </el-table-column>
              <el-table-column
                prop="total"
                label="有效交易笔数"
              >
              </el-table-column>
              <el-table-column
                prop="validTotal"
                label="退款笔数"
              >
              </el-table-column>
              <el-table-column
                prop="priceSum"
                label="有效交易金额"
              >
              </el-table-column>
              <el-table-column
                prop="validPriceSum"
                label="退款金额"
              >
              </el-table-column>
              <!--操作-->
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <!--流水明细-->
                  <el-button type="text" @click="flowDetail(scope.row)">流水明细</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              :total-elements="totalElements2"
              :change-callback="searchFlowList"
              ref="page"></pagination>
          </el-tab-pane>
          <el-tab-pane label="商户流水明细查询" name="3">
            <el-table
              :data="detailTableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="orderNumber"
                label="订单号"
              >
              </el-table-column>
              <el-table-column
                prop="storeName"
                label="商户名"
              >
              </el-table-column>
              <el-table-column
                prop="actPayPrice"
                label="订单金额"
              >
              </el-table-column>
              <el-table-column
                prop="refundPayPrice"
                label="退款金额"
              >
              </el-table-column>
              <el-table-column
                prop="payChannel"
                label="支付通道"
              >
              </el-table-column>
              <el-table-column
                prop="payWay"
                label="支付方式"
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="订单状态"
              >
              </el-table-column>
              <el-table-column
                prop="payTime"
                label="支付时间"
              >
              </el-table-column>
            </el-table>
            <pagination
              :total-elements="totalElements"
              :change-callback="getDetailList"
              ref="page"></pagination>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {downloadCollect, downloadDetail, findCompany, findPayChannel, findPayWay} from "../api/service_provider";
  import {downloadFlowExcel, getFlow, getFlowDetail, getFlowList, getServiceFlowList} from "../api/flow_preview";
  import pagination from '@/components/pagination/index'

    export default {
        name: "flow_preview",
      components: {pagination},
      data(){
        return {
          result: {
            merchantId: '',
            merchantName: '',
            priceSum: 0,
            validPriceSum: 0,
            prepayCloseSum: 0,
            total: 0,
            validTotal: 0,
            prepayCloseTotal: 0
          },
          param: {
            company: '',
            companyId: '',
            companyName: '',
            payChannel: '',
            payChannelId: '',
            payChannelName: '',
            payWay: '',
            payWayId: '',
            payWayName: '',
            begin: '',
            end: '',
            pageSize: 0,
            pageNumber: 0,
            name:''
          },
          /*paramData: {
            date: '',
            merchantId: '',
            payChannelId: '',
            companyId: ''
          },*/
          tableData: [],
          serviceTableData: [],
          detailTableData: [],
          totalElements: 0,
          totalElements1: 0,
          totalElements2: 0,
          PayChannelOption: [],
          PayWayOption: [],
          companyOption: [],
          loading: false,
          pageNumber:0,
          activeName:'1',
          flowDetailVisible: false,
          orderNumber: '',
          flag:'公司'
        };
      },
      mounted() {
        this.getDate()
        this.findCompany()
        this.findPayChannel()
        this.findPayWay()
      },
      methods:{
        searchBtn: function () {
          if (this.activeName == '2') {
            this.searchFlowList(1, 10);
          } else if (this.activeName == '1') {
            this.serviceFlowList(1, 10);
          } else if (this.activeName == '3'){
            this.getDetailList(1,10);
          }
        },
        handleClick: function () {
          if (this.activeName != '3') {
            this.flag = '公司'
            if (!this.check()) {
              return;
            }
            if (this.activeName == '1' && this.serviceTableData.length == 0) {
              this.serviceFlowList(1, 10);
            }
            if (this.activeName == '2' && this.tableData.length == 0) {
              this.searchFlowList(1, 10);
            }
          } else {
            if (this.detailTableData.length == 0) {
              this.getDetailList(1, 10);
            }
            this.param.name = '';
            this.flag = '订单号'
          }
        },
        serviceFlowList(number, pageSize) {
          if (!this.check()){
            return;
          }
          this.loading = true;
          getServiceFlowList(number, pageSize, this.param).then(res => {
            this.serviceTableData = res.obj.records;
            this.totalElements1 = res.obj.total;
            this.loading = false;
          }).catch(e => {
            this.loading = false;
          })
        },
        flowDetail:function (data) {
          let paramData = {};
          paramData.begin = this.param.begin;
          paramData.end = this.param.end;
          paramData.companyId = data.merchantId;
          paramData.payChannelId = this.param.payChannelId;
          paramData.payWayId = this.param.payWayId;
          this.$router.push({path: '/serviceprovider/views/flow_detail', query: {data:paramData}})
        },
        searchFlow(){
          this.loading = true;
          if (!this.check()){
            return;
          }
          getFlow(this.param).then(res => {
            this.result = res.obj.pandect;
            this.loading = false
          }).catch(e => {
            this.loading = false
          });
        },
        searchFlowList(number, pageSize){
          this.loading = true;
          getFlowList(number, pageSize,this.param).then(res => {
            this.tableData = res.obj.records;
            this.totalElements2 = res.obj.total;
            this.loading = false;
          }).catch(e => {
            this.loading = false;
          })
        },
        getDate(){
          //获取当前时间
          let now   = new Date();
          let month = now.getMonth()+1;
          let yearn  = now.getFullYear();
          this.param.date = yearn+"-"+month;
        },
        //支付通道
        findPayChannel(){
          findPayChannel().then(res => {
            this.PayChannelOption = res.obj
          }).catch(e => {

          })
        },
        //支付方式
        findPayWay: function () {
          findPayWay().then(res => {
            this.PayWayOption = res.obj
            console.log(this.PayWayOption);
          }).catch(e => {

          })
        },
        flowCollectGetPayChannelLabel(val){
          console.log(val)
          let [id, name] = ['', ''];
          if (val) {
            [id, name] = val.split(',')
          }
          this.param.payChannel = val;
          this.param.payChannelId = id;
          this.param.payChannelName = name;
        },
        
        flowDetailGetPayWayLabel: function (val) {
          let [id, name] = ['', ''];
          if (val) {
            [id, name] = val.split(',')
          }
          this.param.payWay = val;
          this.param.payWayId = id;
          this.param.payWayName = name;
        },
        //同时获取名字和id
        flowGetLabel(val){
          let [id, name] = ['', ''];
          if (val) {
            [id, name] = val.split(',')
          }
          this.param.company = val;
          this.param.companyId = id;
          this.param.companyName = name;
          console.log(this.param)
        },
        //代理商
        findCompany: function () {

          if (this.companyOption.length > 0) {
            return
          }

          findCompany().then(res => {
            this.companyOption = res.obj
          }).catch(e => {

          })
        },
        check: function () {
          if (this.param.begin == '' || this.param.end == '') {
            this.$message({
              message: '请选择查询时间区间',
              type:'warning'
            });
            this.loading = false;
            return false;
          }
          return true;
        },
        flowDetailDownLoadClose: function () {
          this.flowDetailVisible = false
        },
        //导出明细
        flowDetailDownLoadSubmit: function (type) {
          if (!this.check()){
            return;
          }
          downloadFlowExcel(this.param, type).then(res => {
            let a = document.createElement('a');
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            a.setAttribute("href", objectUrl);
            a.setAttribute("download", `${this.param.companyName.split('|')[0]}${this.param.begin}至${this.param.end}商户流水明细导出(${this.param.payChannelName}${this.param.payWay ? '-' + this.param.payWayName : ''}).xls`);
            a.click();

          }).catch(e => {

          })
        },
        flowCollectDownLoadSubmit: function () {
          if (!this.check()){
            return;
          }
          downloadCollect(this.param).then(res => {
            let a = document.createElement('a');
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let objectUrl = URL.createObjectURL(blob);
            a.setAttribute("href", objectUrl);
            a.setAttribute("download", `${this.param.companyName.split('|')[0]}${this.param.begin}至${this.param.end}商户流水汇总导出(${this.param.payChannelName}${this.param.payWay ? '-' + this.param.payWayName : ''}).xls`);
            a.click();

          }).catch(e => {

          })

        },
        getDetailList(number, pageSize){
          this.loading = true
          let payWay = ["未知","微信","支付宝", "银行卡","会员卡"]
          let map = {}
          map['1'] = '支付宝官方';
          map['2'] = '微信官方';
          map['101'] = '会员宝';
          map['102'] = '易融码';
          map['103'] = '统统收';
          map['104'] = '惠闪付';
          map['105'] = '富友';
          map['106'] = '乐刷';
          map['107'] = '合利宝';
          map['108'] = '信汇';
          map['109'] = '银盛';
          map['110'] = '通联';
          map['120'] = '微信买单';
          map['121'] = '传化';
          map['123'] = '海科';
          map['124'] = '电信';
          map['125'] = '瑞银信';

          let map2 = {};
          map2['1'] = '未支付';
          map2['2'] = '支付成功';
          map2['3'] = '支付失败';
          map2['4'] = '已撤销';
          map2['5'] = '全额退款成功';
          map2['6'] = '部分退款成功';
          map2['7'] = '退款失败';
          map2['8'] = '预授权冻结';
          getFlowDetail(number, pageSize, this.param).then(response => {
            let flag = response.obj.records;
            this.totalElements = response.obj.total;
            for (let i = 0; i < flag.length; i++) {
              flag[i].status = map2[flag[i].status]
              flag[i].payChannel = map[flag[i].payChannel]
              if (flag[i].payWay == 99){
                flag[i].payWay = '未知'
              }else{
                flag[i].payWay = payWay[flag[i].payWay]
              }
            }
            this.detailTableData = flag;
            this.loading = false
            setTimeout(() => {
              this.loading = false
            }, 5000)
          }).catch(() => {
            this.loading = false
          });
        }
      },
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
    justify-content: flex-start;
    align-items: center;
  }

  .card_item {
    padding: 0;
    width: 23%;
    max-width: 100%;
    margin: 20px 1% 0 1%;
  }


  .tools_box {
    padding: 0 0;
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
    font-size: 12px;
    color: #888;
  }

  .tools_text p:nth-child(2) {
    padding: 5px 0 0 0;
    font-size: 20px;
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

  /*表格*/
  .table_box {
    margin-top: 20px;
  }
  /*支付通道*/
  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }
  .el-input__inner {
    width: 40px !important;
    line-height: 40px !important;
  }

  /*搜索框位置调整*/
  .dataSearch{
    position: relative;
    top: -1px;
  }
</style>
