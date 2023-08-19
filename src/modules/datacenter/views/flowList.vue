<template>
  <div class="app-container">
    <div class="header_bar">
      <el-card class="box-card ">
        <div class="search_bar">
          <div>
            <div class="block">
              <el-input v-model="searchForm.name" placeholder="商户名" size="small"></el-input>
            </div>
            <!--日期选择-->
            <div class="block">
              <el-date-picker
                @change="checkDataRange"
                v-model="searchForm.days"
                :clearable=false
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                size="small">
              </el-date-picker>
            </div>

            <div class="block" style="margin-left: 20px">
              <el-button type="primary" size="small" @click="submitSearch">搜索</el-button>
              <el-button type="primary" size="small" @click="resetForm">重置</el-button>
            </div>


          </div>

<!--          <div>-->
<!--            <el-button style="float: right;font-size: 16px" size="small" @click="exportTable">导出</el-button>-->
<!--          </div>-->

        </div>
        <!--第二行-->
        <div class="checkbox_group">
          <el-checkbox-group v-model="searchForm.type">
            <el-checkbox v-for="item in paytype" :label="item.value" :key="item.value">{{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-card>
    </div>

    <!--流水表格-->
    <div class="flow_table">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>流水明细</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">导出</el-button>-->
        </div>
        <!--表格-->
        <div class="flow_table_list">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              v-if="userType==1"
              prop="agentName"
              :label="agentName"
              show-overflow-tooltip
              width="200">
            </el-table-column>
            <el-table-column
              v-if="userType==1 || userType==2"
              prop="subAgentName"
              :label="disName"
              show-overflow-tooltip
              width="200">
            </el-table-column>
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
        <!--<pagination-->
        <!--:total-elements="flowTotalElement"-->
        <!--:change-callback="getFlowList"-->
        <!--ref="page"></pagination>-->
      </el-card>
    </div>

  </div>
</template>

<script>
  import {getPayWayOption, merchantList} from '@/modules/datacenter/api/flowList'

  export default {
    name: 'flowList',
    data () {
      return {
        loading: false,//加载动画
        userType: '',//登录用户类型
        searchDays: '0',//搜索天数
        searchForm: {
          id: '',
          name: '',
          days: [],//日期
          type: [],//类型
        },
        paytype: [],

        //表格
        tableData: [],
        totalElement: 0,

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    mounted () {
      this.userType = sessionStorage.getItem('userType');
      this.defaultDays();
      //获取支付方法
      this.getPayWay()
    },
    methods: {
      /**
       *设置默认查询日期
       */
      defaultDays: function () {
        let timestamp = (new Date()).getTime();
        this.$set(this.searchForm.days, 0, timestamp - (24 * 60 * 60 * 1000 * 6));
        this.$set(this.searchForm.days, 1, timestamp)
      },

      /**
       *检查时间
       * 如果不对，则修改为最近的31天日期
       */
      checkDataRange () {
        let startTime = this.searchForm.days[0];
        let endTime = this.searchForm.days[1];
        if (endTime - startTime > 24 * 60 * 60 * 1000 * 90) {
          this.$message('前后时间不能超过90天');
          let timestamp = (new Date()).getTime();
          this.$set(this.searchForm.days, 0, timestamp - (24 * 60 * 60 * 1000 * 90));
          this.$set(this.searchForm.days, 1, timestamp)
        } else {
          //this.submitSearch()
        }
      },

      /**
       * 获取支付渠道
       */
      getPayWay: function () {
        getPayWayOption().then(res => {
          //console.log(res.obj)
          let data = res.obj;
          //获取支付渠道
          this.paytype = data;

          for (let i in data) {
            this.searchForm.type.push(data[i].value)
          }
          //this.getFlowList()
        }).catch(e => {

        })
      },

      /**
       * 渲染列表
       */
      getFlowList: function (pageNum, pageSize) {
        let companyId = sessionStorage.getItem('companyId');
        let type = '';
        type = this.searchForm.type.join(',');
        let merchantName = this.searchForm.name;
        let st = this.format(this.searchForm.days[0]);
        let et = this.format(this.searchForm.days[1]);
        this.tableData = [];
        merchantList(pageNum, pageSize, merchantName, companyId, type, st, et).then(res => {
          this.totalElement = res.obj.totalElement;
          this.tableData = res.obj.data
        }).catch(e => {
          this.$message('oops')
        })
      },

      /**
       * 发起查询
       */
      submitSearch: function () {
        this.getFlowList()
      },
      resetForm: function () {
        let data = this.paytype;
        for (let i in data) {
          this.searchForm.type.push(data[i].value)
        }

        this.defaultDays()
      },
      goBack: function () {
        this.$router.go('-1')
      },

      /**
       * 工具
       * @param ts 时间戳
       * @returns {string} 格式化事时间
       */
      //时间格式化
      format (ts) {
        let time = new Date(ts);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
      },

      /**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       */
      add0 (m) {
        return m < 10 ? '0' + m : m
      },
      //导出
      exportTable: function () {
        this.$message('开发中')
      }
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

  .checkbox_group {
    margin-top: 10px;
  }

  /*流水表格*/
  .flow_table {
    margin-top: 20px;
  }

</style>
