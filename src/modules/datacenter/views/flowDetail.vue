<template>
  <div class="app-container" v-loading="loading">
    <!--头部搜索选项-->
    <div class="header_bar">
      <el-card class="box-card ">
        <div class="search_bar">
          <div>
            <!--日期选择-->
            <div class="block">
              <el-date-picker
                @change="checkDataRange"
                v-model="searchForm.days"
                type="daterange"
                :clearable=false
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

          <div>
            <el-button style="float: right;font-size: 16px" type="text" @click="goBack"><i class="el-icon-back"></i>
              返回列表
            </el-button>
          </div>

        </div>
        <!--第二行-->
        <div>
          <el-checkbox-group v-model="searchForm.type" @change="submitSearch">
            <el-checkbox-button v-for="item in paytype" :label="item.value" :key="item.value">{{item.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div class="total-line">
          <span>总交易金额：{{totalAmount||0}}&nbsp元</span>
          <span>总交易笔数：{{validCount||0}}&nbsp笔</span>
          <span>退款金额：{{refundAmount||0}}&nbsp元</span>
          <span>退款笔数：{{refundCount||0}}&nbsp笔</span>
          <span>有效交易金额：{{validAmount||0}}&nbsp元</span>
        </div>
      </el-card>
    </div>

    <!--列表-->
    <div>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        v-loading="tableLoading"
        empty-text="暂时没有数据"
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="formatPayTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="支付方式">
          <template slot-scope="scope">
            {{payWay(scope.row.payWay)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="订单金额">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="订单数量">
        </el-table-column>
        <el-table-column
          prop="refundAmount"
          label="退款金额">
        </el-table-column>
        <el-table-column
          prop="refundNum"
          label="退款数量">
        </el-table-column>
        <el-table-column
          prop="validDealAmount"
          label="有效交易基数">
        </el-table-column>

        <el-table-column
          prop="customerPaidAmount"
          label="顾客实付">
        </el-table-column>
        <!--停用优惠-->
        <!--<el-table-column-->
        <!--prop="discountAmount"-->
        <!--label="优惠">-->
        <!--</el-table-column>-->

        <!--不同层级，column显示不同-->
        <el-table-column
          v-if="userType==1"
          prop="commissionAmount"
          :label="topName+'佣金'">
        </el-table-column>
        <el-table-column
          v-if="userType==1||userType==2"
          prop="agentCommissionAmount"
          :label="agentName+'佣金'">
        </el-table-column>
        <el-table-column
          v-if="userType==1||userType==2||userType==3"
          prop="subAgentCommissionAmount"
          :label="disName+'佣金'">
        </el-table-column>
        <!--推广商-->
        <el-table-column
          v-if="userType==1||userType==2||userType==3||userType==4"
          prop="finalAgentCommissionAmount"
          :label="subName+'佣金'">
        </el-table-column>
      </el-table>

      <!--翻页-->
      <pagination
        :total-elements="totalElement"
        :change-callback="getMerchantList"
        ref="page"></pagination>

    </div>

  </div>
</template>

<script>
  import {getPayWayOption, getMerchantList} from '@/modules/datacenter/api/datacenter'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'flowDetail',
    components: {pagination},
    data() {
      return {
        loading: false,//加载动画
        userType: '',//登录用户类型
        searchDays: '0',//搜索天数
        searchForm: {
          id: '',
          days: [],//日期
          type: [],//类型
        },
        paytype: [
          {value: '1', name: '支付宝'},
          {value: '2', name: '微信'},
          {value: '3', name: '银联'},
        ],
        tableData: [],
        totalElement: 0,

        //总数
        validCount: 0, //笔数
        validAmount: 0, //基数
        totalAmount:0,//总金额
        refundAmount:0,//总退款
        refundCount:0,//总退款数
        OrderIndexArr: [],//合并项下标记录
        hoverOrderArr: [],
        tableLoading: false,//表格加载圈

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted() {
      this.userType = sessionStorage.getItem('userType');
      //接收查询ID
      this.searchForm.id = this.$route.query.id;  //接收ID

      let st = this.$route.query.st;
      let et = this.$route.query.et;
      //设置默认日期
      this.defaultDays(st, et);
      //获取支付渠道
      this.getPayWay()

    },
    computed: {
      //动态计算支付类型
      payWay: function (val) {
        return function (val) {
          let str = '未知';
          let pt = this.paytype;
          for (let i in pt) {
            if (pt[i].value == val) {
              str = pt[i].name;//赋值匹配名字
              break//停止循环
            }
          }
          return str
        }
      }

    },
    methods: {
      /**
       *设置默认查询日期
       */
      defaultDays: function (st, et) {
        let startTime = new Date(st.replace(/-/g, '/')).getTime();
        let endTime = new Date(et.replace(/-/g, '/')).getTime();
        // let startTime = this.searchForm.days[0];
        // let endTime = this.searchForm.days[1];
        this.$set(this.searchForm.days, 0, startTime);
        this.$set(this.searchForm.days, 1, endTime)
      },

      /**
       *检查时间
       * 如果不对，则修改为最近的31天日期
       */
      checkDataRange() {
        let startTime = this.searchForm.days[0];
        let endTime = this.searchForm.days[1];
        if (endTime - startTime > 24 * 60 * 60 * 1000 * 90) {
          this.$message('前后时间不能超过90天');
          let timestamp = (new Date()).getTime();
          this.$set(this.searchForm.days, 0, timestamp - (24 * 60 * 60 * 1000 * 90));
          this.$set(this.searchForm.days, 1, timestamp)
        } else {
          this.submitSearch()
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
          this.getMerchantList(1, 10)
        }).catch(e => {

        })
      },

      /**
       * 获取列表
       */
      getMerchantList: function (pageNum, pageSize) {

        let companyId = sessionStorage.getItem('companyId');
        let startTime = this.format(this.searchForm.days[0]);
        let endTime = this.format(this.searchForm.days[1]);
        let type = sessionStorage.getItem('userType');
        let merchantId = this.searchForm.id;
        let payWay = this.searchForm.type.join(',');
        console.log(this.searchForm.days[0]+'!!!!!'+this.searchForm.days[1])

        getMerchantList(pageNum, pageSize, companyId, startTime, endTime, type, merchantId, payWay).then(res => {
          console.log(res);
          this.tableData = res.obj.data;
          this.totalElement = res.obj.totalElement;

          this.validCount = res.obj.validCount;
          this.validAmount = res.obj.validAmount;
          this.totalAmount = res.obj.totalAmount;
          this.refundAmount = res.obj.refundAmount;
          this.refundCount = res.obj.refundCount;
          if (res.obj.data != null) {
            this.listFormat()
          }
        }).catch(e => {
        })
      },

      /**
       *数据预先格式化
       */
      listFormat() {
        console.log(this.tableData);
        this.OrderIndexArr = [];
        let OrderObj = {};
        //遍历现有的流水表格
        this.tableData.forEach((element, index) => {
          element.rowIndex = index;
          if (OrderObj[element.formatPayTime]) {
            OrderObj[element.formatPayTime].push(index)
          } else {
            OrderObj[element.formatPayTime] = [];
            OrderObj[element.formatPayTime].push(index)
          }
        });

        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
          if (OrderObj[k].length > 1) {
            this.OrderIndexArr.push(OrderObj[k])
          }
        }
      },

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          for (let i = 0; i < this.OrderIndexArr.length; i++) {
            let element = this.OrderIndexArr[i];
            for (let j = 0; j < element.length; j++) {
              let item = element[j];
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
        this.tableLoading = false //关闭加载圈动画
      },

      /**
       * 发起查询
       */
      submitSearch: function () {
        this.getMerchantList()
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
      format(ts) {
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
      add0(m) {
        return m < 10 ? '0' + m : m
      },

    },
    filters: {}
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

  .total-line {
    margin-top: 10px;
  }

  .total-line span {
    font-size: 15px;
    color: #636c80;
    margin-right: 10px;
  }


</style>
