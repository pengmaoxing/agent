<!--佣金统计-->
<template>
  <div class="app-container" v-loading="loading">

    <div divName="佣金统计列表" v-if="seeMode==0">
      <!--工具条 Start-->
      <div class="search-bar">
        <!--报表导出-->
        <div class="search-form">
          <el-input @keypress.enter.native="refreshStatisticsList"
                    v-model.trim="companyName" placeholder="按代理商搜索"
                    class="input_width"></el-input>
          <el-button type="primary" @click="refreshStatisticsList">搜 索</el-button>
        </div>
        <div class="comm-info">
          <!--<el-button type="primary" class="comm-set" @click="downloadReport">佣金报表导出</el-button>-->
        </div>
      </div>
      <!--工具条 End-->
      <el-divider content-position="left">代理商佣金统计</el-divider>
      <!--表格-->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="代理商名称">
          </el-table-column>
          <el-table-column
            prop="totalCommission"
            label="历史总佣金">
          </el-table-column>
          <el-table-column
            prop="availableCommission"
            label="当前佣金">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="changeSeeModeOfWithdrawal(scope.row)">提现明细</el-button>
              <!--<el-button type="text" @click="changeSeeModeOfaccountDetail(scope.row)">账户详情</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="tableTotalElement"
          :change-callback="getStatisticsList"
          ref="statisticsList"></pagination>
      </template>
    </div>


    <!--提现明细表格-->
    <div divName="提现明细列表" v-if="seeMode==1">
      <!--工具条 Start-->
      <div class="search-bar">
        <div class="comm-info">
          <el-button type="text" class="comm-set" @click="goBackStatistics">返回上一页</el-button>
        </div>
      </div>
      <!--工具条 End-->
      <el-divider content-position="left">代理商提现明细</el-divider>
      <!--表格-->
      <template>
        <el-table
          :data="currentData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="代理商名称">
          </el-table-column>
          <el-table-column
            label="申请结算金额">
            <template slot-scope="scope">
              ￥&nbsp{{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            label="提现方式">
            <template slot-scope="scope">
              <span>{{scope.row.companyAccount|withdrawWayFil}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyAccount.payee"
            :show-overflow-tooltip="true"
            label="开户名">
          </el-table-column>
          <el-table-column
            prop="companyAccount.accountNumber"
            :show-overflow-tooltip="true"
            label="账号">
          </el-table-column>
          <el-table-column
            label="银行及支行"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.companyAccount">
                <span v-if="scope.row.companyAccount.bankName!='' && scope.row.companyAccount.branchName!=''">
                  {{scope.row.companyAccount.bankName}}{{scope.row.companyAccount.branchName}}
                </span>
                <span v-else>——</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="successTime"
            label="提现成功时间">
          </el-table-column>
          <el-table-column
            prop="applyStatusStr"
            label="提现情况">
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="currentDatatotalElement"
          :change-callback="getWithdrawalDetailBefore"
          ref="getWithdrawalPage"></pagination>
      </template>
    </div>


    <!--账户详情-->
    <div divName="账户详情" v-if="seeMode==2">
      <!--工具条 Start-->
      <div class="search-bar">
        <div class="comm-info">
          <el-button type="text" class="comm-set" @click="goBackStatistics">返回上一页</el-button>
        </div>
      </div>
      <!--工具条 End-->
      <el-divider content-position="left">账户详情</el-divider>
      <!--详情表格-->
      <template divName="详情表格">
        <el-card class="box-card info-card">
          <div class="info-card-content">
            <table class="info-card-table">
              <tr class="info-card-table-tr">
                <td>联系人</td>
                <td>御坂御坂</td>
                <td>联系电话</td>
                <td>12365986598</td>
                <td>提现方式</td>
                <td>恰饭宝</td>
              </tr>
            </table>
          </div>
        </el-card>
      </template>
      <!--下属列表-->
      <template divName="下属列表">
        <el-card class="box-card list-card sub-list">
          <el-tabs v-model="tabsNum" @tab-click="subListChange">
            <el-tab-pane :label="`${disName}列表`" name="disList">1</el-tab-pane>
            <el-tab-pane label="商户列表" name="merList">2</el-tab-pane>
            <el-tab-pane label="业务员列表" name="manList">3</el-tab-pane>
          </el-tabs>
        </el-card>
      </template>
    </div>


  </div>
</template>

<script>
  import {
    getCommissionChildrenList,
    getWithdrawApplyList
  } from '../api/commStatistics'
  import pagination from '@/components/pagination/index'

  export default {
    name: "commStatistics",
    components: {pagination},
    data() {
      return {
        loading: '',//页面等待
        subordinateName: '', //下级用户类型（名称）
        btnLoading: false, //按钮锁定
        userType: '', //当前用户类型
        seeMode: 0, //0统计 1明细 2详情

        companyName: '', //代理商名称
        tableData: [],
        tableTotalElement: 0,

        //------------查看运渠的的提现明细---------------

        currentId: '', //当前运渠id
        currentData: [],//当前数据信息
        currentDatatotalElement: 0,

        //--------------运渠下属-----------------------
        cacheCurrentid: '', //当前操作的运渠id
        tabsNum: 'disList',// 当前下属标签页名称

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    filters: {
      //结算方式过滤
      withdrawWayFil: function (data) {
        if (data == undefined) {
          return ''
        }

        let val = data.withdrawWay;
        if (val === '' || val == null) {
          return ''
        }

        let text;
        if (val == 1) {
          text = '支付宝'
        } else if (val == 2) {
          text = '银行转账'
        } else {
          text = '未知'
        }
        return text
      }
    },
    mounted() {
      //服运渠类型获取  1服 2运 3渠

      this.currentPageByUsertype();

      //获取商户列表（统计）
      this.getStatisticsBefore()

    },
    methods: {

      /**
       * 区别页面
       */
      currentPageByUsertype: function () {
        this.userType = sessionStorage.getItem('userType');
        console.log(this.userType);
        if (this.userType == null) {
          this.$message.error('无法获取用户类型，请重新登录。');
          this.loading = true;
          return false
        } else {
          let val = parseInt(this.userType);
          let text = '';
          switch (val) {
            case 1:
              text = this.agentName;
              break;
            case 2:
              text = this.disName;
              break;
            case 3:
              text = this.subName;
              break;
            default:
              text = '';
              break;
          }
          this.subordinateName = text //下级名称赋值
        }
      },


      /**
       * 退回佣金统计列表
       */
      goBackStatistics: function () {
        this.seeMode = 0
      },

      /**
       * 切换显示  前往提现明细  1
       */
      changeSeeModeOfWithdrawal: function (data) {
        // console.log(id)
        let cid = data.companyId;
        this.cacheCurrentCompanyId(cid); //记录id

        this.getWithdrawalDetailBefore(1, 10); //获取第一页

        this.seeMode = 1; //切换到提现记录页


      },
      /**
       * 切换显示  前往账户详情 2
       */
      changeSeeModeOfaccountDetail: function (id) {
        // console.log(id);
        //获取id 判断用户类型  调用不同接口获取提现明细
        this.seeMode = 2;

      },

      /**
       *  获取佣金统计列表 先判断用户类型
       */
      getStatisticsBefore: function () {
        //暂无区别操作，直接查询
        this.getStatisticsList(1, 10)
      },

      /**
       * 获取统计列表
       */
      getStatisticsList: function (pageNum, pageSize) {
        let name = this.companyName
        getCommissionChildrenList(pageNum, pageSize, name).then(res => {
          let data = res.obj;
          this.tableData = data.data;
          this.tableTotalElement = data.totalElement
        }).catch(e => {

        })
      },

      /**
       * 刷新统计列表
       */
      refreshStatisticsList: function () {
        this.$refs['statisticsList'].refresh()
      },


      /**
       * -------------------------提现列表------------------------
       */

      /**
       * 记录当前查看的运渠id
       */
      cacheCurrentCompanyId: function (id) {
        this.cacheCurrentid = id
      },

      /**
       * 获取提现明细
       */
      getWithdrawalDetailBefore: function (pageNumber, pageSize) {
        let companyId = this.cacheCurrentid;
        getWithdrawApplyList(pageNumber, pageSize, companyId).then(res => {
          let data = res.obj;
          this.currentData = data.content;
          this.currentDatatotalElement = totalElements
        }).catch(e => {

        })
      },

      /**
       * 获取提现明细列表
       */
      getWithdrawalDetailList: function () {

      },


      /**
       * -------------------------账户详情------------------------
       */
      subListChange: function () {

      },


      /**
       * 工具----------------------
       */
      downloadReport: function () {
        this.$message.info('开发中')
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .search-bar {

    .search-form {
      float: left;

      .input_width {
        width: 275px;
      }

    }

    /*月份选择*/
    .half-month {
      width: 140px;
    }

    /*佣金信息*/
    .comm-info {
      padding: 0;
      height: 40px;
      line-height: 37px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .comm-money {
        margin-right: 15px;
        font-size: 18px;
        color: #1e6abc;
      }

      .comm-set {
        margin: 0;
      }
    }
  }


  .info-card {
    width: 100%;
    max-width: 100%;

    .info-card-content {

    }

    .info-card-table {
      width: 100%;

      .info-card-table-tr {
        font-size: 14px;

        td:nth-child(odd) {
          font-weight: bold;
          color: #3A3A3A;
          width: 6%;
          text-align: left;
        }

        td:nth-child(odd):after {
          content: '：';
        }

        td:nth-child(even) {
          text-align: left;
          color: #6b6b6b;
          width: 27%;
        }
      }
    }
  }

  .sub-list {
    margin-top: 10px;
  }

</style>
