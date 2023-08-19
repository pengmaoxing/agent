<template>
  <div class="app-container" v-loading="loading">
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
  </div>
</template>

<script>
    import {collectById} from "../api/service_flow_collect";
    import pagination from '@/components/pagination/index';
    import {getFlowDetail} from "../api/flow_detail";

    export default {
        name: "flow_detail",
      components: {pagination},
      data(){
        return{
          exData:{},
          tableData:[{
            index: '',
            merchantId: '',
            storeName: '',
            actPayPrice: '',
            refundPayPrice: '',
            payChannel: '',
            payWay: ''
          }],
          totalElements: 0,
          loading: false
        }
      },
      mounted() {
        this.exData = this.$route.query.data;
        console.log(this.exData);
        this.getDetailList();
      },
      methods: {
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
          map['126'] = '瑞银信通道';
          let map2 = {};
          map2['1'] = '未支付';
          map2['2'] = '支付成功';
          map2['3'] = '支付失败';
          map2['4'] = '已撤销';
          map2['5'] = '全额退款成功';
          map2['6'] = '部分退款成功';
          map2['7'] = '退款失败';
          map2['8'] = '预授权冻结';
          getFlowDetail(number, pageSize, this.exData).then(response => {
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
            this.tableData = flag;
            this.loading = false
            setTimeout(() => {
              this.loading = false
            }, 5000)
          }).catch(() => {
            this.loading = false
          });
        }
      }
    }
</script>

<style scoped>

</style>
