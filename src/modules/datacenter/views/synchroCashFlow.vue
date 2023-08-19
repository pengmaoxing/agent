<template>
  <div class="app-container" v-loading="false">
    <!--头部搜索选项-->
    <div class="header_bar">
      <el-card class="box-card">
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
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </div>
            </div>

            <!-- 下拉框 -->
            <div style="margin:20px 0px;">
              <!-- 支持关键字搜索 -->
              <el-select
                v-model="param.company"
                class="input-width-2"
                clearable
                @change="flowGetLabel"
                filterable
                placeholder="支持关键字搜索"
              >
                <el-option
                  v-for="item in companyOption"
                  :key="item.id"
                  :label="item.name"
                  :value="`${item.id},${item.name}`"
                ></el-option>
              </el-select>

              <!-- 支付通道 -->
              <el-select
                v-model="param.payChannel"
                @change="flowCollectGetPayChannelLabel"
                placeholder="支付通道"
                clearable
                class="formItem"
              >
                <el-option
                  v-for="item in PayChannelOption"
                  :key="item.value"
                  :label="item.name"
                  :value="`${item.value},${item.name}`"
                ></el-option>
              </el-select>
              <!-- 支付方式 -->
              <el-select
                v-model="param.payWay"
                @change="flowDetailGetPayWayLabel"
                placeholder="支付方式"
                clearable
                class="formItem"
              >
                <el-option
                  v-for="item in PayWayOption"
                  :key="item.value"
                  :label="item.name"
                  :value="`${item.value},${item.name}`"
                ></el-option>
              </el-select>

              <!-- 搜索 -->
              <el-button type="primary" size="small" @click="submitSearch">搜索</el-button>
            </div>
            <!-- 下拉框 -->
          </div>
        </div>
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
          <el-table :data="flowTableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column
              prop="orderNumber"
              label="订单号"
            >
            </el-table-column>
            <el-table-column
              prop="name"
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

            <!-- <el-table-column prop="prepayCloseSum" label="预授权冻结金额总和"></el-table-column> -->
            <!-- <el-table-column prop="prepayCloseTotal" label="预授权冻结订单总数"></el-table-column> -->
<!--            <el-table-column prop="priceSum" label="有效金额总和"></el-table-column>-->
            <!--2020-01-08添加 有效交易笔数-->
<!--            <el-table-column prop="total" label="有效订单总数"></el-table-column>-->
            <!-- <el-table-column prop="totalElements" label="总元素"></el-table-column> -->
<!--            <el-table-column prop="validPriceSum" label="退款金额总和"></el-table-column>-->
<!--            <el-table-column prop="validTotal" label="退款订单总数"></el-table-column>-->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="goDetail(scope.row.merchantId)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--翻页-->
        <pagination :total-elements="flowTotalElement" :change-callback="getFlowList" ref="page"></pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import {
  findPayWay,
  synchroFlowTableData
} from "@/modules/datacenter/api/datacenter";

import {
  findPayChannel,
  findCompany
} from "@/modules/serviceprovider/api/service_provider";

import pagination from "@/components/pagination/index";

export default {
  name: "cashFlow",
  components: { pagination },
  data() {
    return {
      loading: true, //加载动画
      userType: "", //登录用户类型
      searchDays: "2", //搜索天数
      searchForm: {
        days: [], //日期
        type: "1" //类型
      },
      leftActiveName: "1", //左侧图表标签页Index
      rightActiveName: "1", //右侧图表标签页Index
      cardData: {
        commissionAmount: "1",
        customerPaidAmount: "0",
        discountAmount: "0",
        orderAmount: "0",
        orderNum: "0",
        refundAmount: "0",
        refundNum: "0",
        validDealAmount: "0"
      }, //卡片数据

      leftDataNull: true,
      rightDataNull: true,
      flowTableData: [], //流水列表
      flowTotalElement: 0, //流水条目总数
      PayWayOption: [],
      PayChannelOption: [],
      companyOption: [],

      //动态名称
      topName: this.globalAlias.topName,
      agentName: this.globalAlias.agentName,
      disName: this.globalAlias.disName,
      subName: this.globalAlias.subName,

      param: {
        company: "",
        companyId: "",
        companyName: "",
        payChannel: "",
        payChannelId: null,
        payChannelName: "",
        payWay: "",
        payWayId: "",
        payWayName: "",
        begin: "",
        end: "",
        pageSize: 0,
        pageNumber: 1,
        name: ""
      }
    };
  },

  mounted() {
    this.userType = sessionStorage.getItem("userType");
    //默认查询
    this.defaultSearch();
    this.findPayWay();
    this.findPayChannel();
    this.findCompany();
  },
  methods: {
    /**
     * 第一次默认查询
     */
    defaultSearch() {
      //设定7天日期//2
      this.changeDays(2);
    },

    /**
     * 手动发起查询
     */
    submitSearch: function() {
      this.loading = true;
      this.getFlowList(1, 10);
    },

    /**
     *检查时间
     * 如果不对，则修改为里结束日期的前31天。
     */
    checkDataRange() {
      let timestamp = new Date().getTime();
      let startTime = this.searchForm.days[0];
      let endTime = this.searchForm.days[1];
      if (endTime - startTime > 24 * 60 * 60 * 1000 * 90) {
        this.$message.error("前后时间不能超过90天");
        this.$set(
          this.searchForm.days,
          0,
          timestamp - 24 * 60 * 60 * 1000 * 90
        );
        this.$set(this.searchForm.days, 1, timestamp);
        this.submitSearch(); //限定范围后再发起搜索
      } else if (endTime > timestamp) {
        this.$message.error("搜索日期不能大于当天");
        this.$set(this.searchForm.days, 1, timestamp);
        this.submitSearch(); //允许发起搜索
      } else {
        this.submitSearch(); //允许发起搜索
      }
    },
    /**
     * 快捷方式修改日期
     * @param event 日期范围选项
     */
    changeDays: function(event) {
      let timestamp = new Date().getTime();
      if (event == 0) {
        //当日0点
        this.$set(
          this.searchForm.days,
          0,
          new Date(new Date().toLocaleDateString()).getTime()
        );
        this.$set(
          this.searchForm.days,
          1,
          new Date(new Date().toLocaleDateString()).getTime() +
            24 * 60 * 60 * 1000 -
            1
        );
      } else if (event == 1) {
        let startTime =
          new Date(new Date().toLocaleDateString()).getTime() -
          24 * 60 * 60 * 1000;
        let endTime =
          new Date(new Date().toLocaleDateString()).getTime() - 1000;
        this.$set(this.searchForm.days, 0, startTime);
        this.$set(this.searchForm.days, 1, endTime);
      } else if (event == 2) {
        let startTime =
          new Date(new Date().toLocaleDateString()).getTime() -
          24 * 60 * 60 * 1000 * 6;
        let endTime =
          new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1;
        this.$set(this.searchForm.days, 0, startTime);
        this.$set(this.searchForm.days, 1, endTime);
      }
      this.submitSearch();
    },

    /**
     * 渲染列表
     */
    getFlowList: function(pageNum, pageSize) {
      let st = this.format(this.searchForm.days[0]);
      let et = this.format(this.searchForm.days[1]);
      let companyId = sessionStorage.getItem("companyId");
      let WayId = this.param.payWayId;

      synchroFlowTableData(st, et, pageNum, pageSize, companyId, WayId)
        .then(res => {
          this.flowTotalElement = res.obj.total;
          this.flowTableData = res.obj.records;

          console.log(res.obj);
        })
        .catch(e => {});
    },
    //支付方式
    flowDetailGetPayWayLabel: function(val) {
      let [id, name] = ["", ""];
      if (val) {
        [id, name] = val.split(",");
      }
      this.param.payWay = val;
      this.param.payWayId = id;
      this.param.payWayName = name;
    },
    //支付方式
    findPayWay: function() {
      findPayWay()
        .then(res => {
          this.PayWayOption = res.obj;
        })
        .catch(e => {});
    },
    //支付通道
    findPayChannel() {
      findPayChannel()
        .then(res => {
          this.PayChannelOption = res.obj;
        })
        .catch(e => {});
    },
    flowCollectGetPayChannelLabel(val) {
      console.log(val);
      let [id, name] = ["", ""];
      if (val) {
        [id, name] = val.split(",");
      }
      this.param.payChannel = val;
      this.param.payChannelId = id;
      this.param.payChannelName = name;
    },
    //同时获取名字和id
    flowGetLabel(val) {
      let [id, name] = ["", ""];
      if (val) {
        [id, name] = val.split(",");
      }
      this.param.company = val;
      this.param.companyId = id;
      this.param.companyName = name;
      console.log(this.param);
    },
    //代理商
    findCompany: function() {
      if (this.companyOption.length > 0) {
        return;
      }

      findCompany()
        .then(res => {
          this.companyOption = res.obj;
        })
        .catch(e => {});
    },

    /**
     * 前往详情
     */
    goDetail(data) {
      //let id = data.id
      let id = data;
      let st = this.format(this.searchForm.days[0]);
      let et = this.format(this.searchForm.days[1]);
      this.$router.push({
        path: "/datacenter/views/flowDetail",
        query: { id: id, st: st, et: et }
      });
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
      return `${y}-${this.add0(m)}-${this.add0(d)} ${this.add0(
        hour
      )}:${this.add0(minute)}:${this.add0(second)}`;
    },

    /**
     * 补充0
     * @param  m 月和日，补齐2位
     * @returns {string} 补齐2二位后的时间
     */
    add0(m) {
      return m < 10 ? "0" + m : m;
    }
  }
};
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
