<template>
  <div>
    <!--显示详情-->
    <el-drawer
      title="代理商详情"
      :visible.sync="agentDetailVisible"
      :direction="agentDetailDirection"
      :close-delay="agentDetailClose">
      <div class=app-container>
        <table class="agentDetail-table">
          <tr>
            <td>公司名称：</td>
            <td>{{agentDetailData.name}}</td>
          </tr>
          <tr>
            <td>联系人：</td>
            <td>{{agentDetailData.contact}}</td>
          </tr>
          <tr>
            <td>联系方式：</td>
            <td>{{agentDetailData.phone}}</td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>{{agentDetailData.province}}&nbsp{{agentDetailData.city}}&nbsp{{agentDetailData.address}}</td>
          </tr>
          <tr>
            <td>级别：</td>
            <td>{{agentDetailData.agentLevelName}}</td>
          </tr>
        </table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "agentDetail",
    props: [],
    data() {
      return {
        agentDetailVisible: false,
        agentDetailDirection: 'rtl',
        agentDetailData: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          userId: '',//推荐人id
          agentLevel: '',//代理级别
        },
      }
    },
    mounted() {
    },
    methods: {
      /**
       * 打开组件并赋值
       */
      agentDetailOpen: function (row) {

        this.agentDetailReview(row);
        this.agentDetailVisible = true
      },
      /**
       * 回显数据
       */
      agentDetailReview: function (row) {
        this.agentDetailData.name = row.name;
        this.agentDetailData.contact = row.contact;
        this.agentDetailData.phone = row.phone;
        this.agentDetailData.province = row.province;
        this.agentDetailData.city = row.city;
        this.agentDetailData.address = row.address;
        this.agentDetailData.agentLevelName = row.agentLevelName
      },
      /**
       * 关闭
       */
      agentDetailClose: function () {
        this.agentDetailVisible = false
      },
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .agentDetail-table {
    font-size: 14px;

    tr {
      height: 60px;

      td {
        width: 50%;

      }

      td:nth-child(1) {
        color: #717171;
      }

      td:nth-child(2) {
        color: black;
      }
    }
  }

</style>
