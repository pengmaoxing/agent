<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" placeholder="公司" size="small" class="formItem">
      </el-input>
      <!--支付通道-->
      <el-select v-model="flowDetailForm.payChannel" @change="flowDetailGetPayChannelLabel" placeholder="支付通道" size="small" clearable class="formItem">
        <el-option
          v-for="item in PayChannelOption"
          :key="item.value"
          :label="item.name"
          :value="`${item.value},${item.name}`">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
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
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="payTime"
        label="支付时间"
      >
      </el-table-column>
      <el-table-column
        prop="merchantName"
        label="商户名"
        width="250">
      </el-table-column>
      <el-table-column
        prop="validAmount"
        label="有效交易基数(元)"
      >
      </el-table-column>
      <el-table-column
        prop="merchantInterestRate"
        label="商户费率"
      >
      </el-table-column>
      <el-table-column
        prop="finalAgentFeeRate"
        label="推广商费率"
      >
      </el-table-column>
      <el-table-column
        prop="subAgentFeeRate"
        label="渠道商费率"
      >
      </el-table-column>
      <el-table-column
        prop="agentFeeRate"
        label="运营商费率"
      >
      </el-table-column>
      <el-table-column
        prop="officialFeeRate"
        label="通道费率"
      >
      </el-table-column>
      <el-table-column
        prop="payWayStr"
        label="支付方式"
      >
      </el-table-column>
    </el-table>

    <pagination
      :total-elements="totalElements"
      :change-callback="getList"
      ref="page"></pagination>
  </div>
</template>
<script>
  import {detailById} from '../api/service_flow_detail'
  import {mixins} from "../../../components/mixins/mixins";
  import pagination from '@/components/pagination/index'
  import {findPayChannel} from "../api/service_provider";

  export default {
    name: "service_flow_detail",
    mixins: [mixins], //混入
    components: {pagination},
    data(){
      return{
        id: '',
        totalElements: 0,
        days: [],
        loading: false,
        PayChannelOption: [],
        tableData:[{
          index: '',
          merchantName: '',
          validAmount: '',
          merchantInterestRate: '',
          finalAgentFeeRate: '',
          subAgentFeeRate: '',
          agentFeeRate: '',
          officialFeeRate: '',
          payTime: '',
          payWayStr:'',
          orderNumber:''
        }],
        flowDetailForm:{
          begin:'',
          end:'',
          companyId: '',
          payChannel: '',
          payChannelId: '-1',
          payChannelName: ''
        },
        searchForm:{
          name:''
        }
      }
    },
    mounted() {
      //获取id
      this.id = this.$route.query.id;  //接收ID
      this.findPayChannel()
      //获取列表
      this.getList()
    },
    methods: {
      getList(number, pageSize) {
        console.log(number+""+pageSize);
        console.log("!!!!!!!!!!!!!!!")
        this.loading = true;
        let id = this.id;
        let form = JSON.parse(JSON.stringify(this.flowDetailForm));
        let submitForm = {};
        if (this.days.length != 0) {
          submitForm.begin = form.days[0];
          submitForm.end = form.days[1];
        }
        submitForm.begin = '';
        submitForm.end = '';
        submitForm.companyId = id;
        submitForm.payChannel = form.payChannelId;
        submitForm.name = this.searchForm.name;
        console.log(this.flowDetailForm);
        console.log(submitForm);
        console.log(form);

        detailById(number, pageSize, submitForm).then(response => {
          console.log(response)
          let data = response.obj;
          this.tableData = data.content;
          this.totalElements = data.totalElements;
          setTimeout(() => {
            this.loading = false
          }, 5000)
        }).catch(() => {
          this.loading = false
        })
      },
      flowDetailGetPayChannelLabel: function (val) {
        console.log(val)
        let [id, name] = ['', ''];
        if (val) {
          [id, name] = val.split(',')
        }
        this.flowDetailForm.payChannel = val;
        this.flowDetailForm.payChannelId = id;
        this.flowDetailForm.payChannelName = name;
        console.log(this.flowDetailForm)
      },
      //支付方式
      findPayChannel: function () {
        findPayChannel().then(res => {
          this.PayChannelOption = res.obj
          //添加查询全部
          this.PayChannelOption.splice(0, 0 ,{value:"-1",name:"全部"});
        }).catch(e => {

        })
      },
      search(number, pageSize){
        if (number.isTrusted){
          number = 0;
        }
        this.getList(number, pageSize);
      }
    }
  }

</script>

<style scoped>
  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }

</style>
