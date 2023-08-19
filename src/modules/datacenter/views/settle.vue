<template>
  <div class="app-container">
    <!--头部-->
    <div class="header_bar">

      <div class="block">
        <el-radio-group v-model="searchForm.type" size="small" @change="changeName($event)">
          <el-radio-button label="1" v-if="userType==1">{{agentName}}</el-radio-button>
          <el-radio-button label="2" v-if="userType==1 || userType==2">{{disName}}</el-radio-button>
          <el-radio-button label="3" v-if="userType==1 || userType==2 || userType==3">商户</el-radio-button>
        </el-radio-group>
      </div>

      <div class="block">
        <el-select v-model="searchForm.id" placeholder="请选择" size="small">
          <el-option
            v-for="item in searchOption"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="block">
        <el-select v-model="searchForm.payType" placeholder="请选择" size="small">
          <el-option
            v-for="item in payOption"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div class="block">
        <el-input v-model="searchForm.name" :placeholder="searchName" size="small"></el-input>
      </div>

      <div class="block">
        <el-button size="small" type="primary">查询</el-button>
      </div>


      <div class="block" style="float: right">
        <el-button size="small" type="primary">佣金结算导出</el-button>
      </div>

    </div>

    <!--卡片-->
    <div class="card_group">


      <!--有效交易基数-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/有效交易基数.png" alt="">
            </div>
            <div class="tools_text">
              <p>有效交易基数</p>
              <p>￥128.00</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--佣金-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/有效交易笔数.png" alt="">
            </div>
            <div class="tools_text">
              <p>有效交易笔数</p>
              <p>128</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--顾客实付-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/到账佣金.png" alt="">
            </div>
            <div class="tools_text">
              <p>到账佣金</p>
              <p>￥128.00</p>
            </div>
          </div>
        </el-card>
      </div>

      <!--优惠金额-->
      <div class="card_item">
        <el-card class="box-card">
          <div class="text item tools_box">
            <div class="tools_img">
              <img src="../../../assets/images/datacenter/下级佣金.png" alt="">
            </div>
            <div class="tools_text">
              <p>下级佣金</p>
              <p>￥1.28</p>
            </div>
          </div>
        </el-card>
      </div>


    </div>

    <!--表格-->
    <div class="flow_table">
      <el-card class="box-card">
        <!--表格-->
        <div class="flow_table_list">
          <el-table
            :data="settleData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              :label="disName+'名称'"
              show-overflow-tooltip
              width="300">
            </el-table-column>
            <el-table-column
              prop="channel"
              label="返佣渠道">
            </el-table-column>
            <el-table-column
              prop="effective"
              label="有效交易基数">
            </el-table-column>
            <el-table-column
              prop="effTotal"
              label="有效交易笔数">
            </el-table-column>
            <el-table-column
              prop="effSettle"
              label="有效佣金">
            </el-table-column>
            <el-table-column
              prop="proportion"
              label="分佣比例">
            </el-table-column>
            <el-table-column
              prop="belong"
              label="应得分佣">
            </el-table-column>
          </el-table>
        </div>
        <!--翻页-->
        <!--<pagination-->
        <!--:total-elements="settleDataTotal"-->
        <!--:change-callback="getSettleList"-->
        <!--ref="page"></pagination>-->
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settle',
    data () {
      return {
        userType: '',
        searchName: '',
        searchForm: {
          id: '',//ID
          payType: '',//支付渠道
          type: '',//类型
          name: '',

        },
        searchOption: [
          {id: 1, name: '店铺1'},
          {id: 2, name: '店铺2'},
          {id: 3, name: '店铺3'},
          {id: 4, name: '店铺4'},
        ],
        payOption: [
          {id: 1, name: '支付宝'},
          {id: 2, name: '口碑'},
          {id: 3, name: '微信'},
          {id: 4, name: '其他'},
        ],
        settleData: [
        ],//表格
        settleDataTotal: 0,//条数

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,

      }
    },
    mounted () {
      this.userType = sessionStorage.getItem('userType')
      //默认选项
      this.searchForm.type = this.userType
      //修改默认placeholder
      this.changeName(this.userType)
    },
    methods: {
      /**
       *修改搜索框placeholder
       */
      changeName (ev) {
        if (ev == '0') {
          this.searchName = this.agentName+'名称'
        } else if (ev == '1') {
          this.searchName = this.disName+'名称'
        } else if (ev == '2') {
          this.searchName = '商户名称'
        }
      },
      getSettleList () {

      },
      /**
       * 提交查询
       */
      submitSearch: function () {
        console.log(this.searchForm)
      },
    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
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
    width: 49%;
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
