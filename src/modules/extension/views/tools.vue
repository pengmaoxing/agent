<template>
  <div class="app-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>运营工具</span>
      </div>
      <div>
        <div class="tools-group">
          <!--二维码扩展-->
          <div class="tools-item" @click="goPage('/extension/views/QRgeneratedRecords')">
            <div class="tools-item-img">
              <img src="../../../assets/images/extension/qr.png" alt="">
            </div>
            <div class="tools-item-content">
              <p>收款码</p>
              <p>可批量生成无归属二维码</p>
            </div>
          </div>

        </div>
      </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>广告系统</span>
      </div>
      <div>
        <div class="tools-group">
          <!--二维码扩展-->
          <div class="tools-item" @click="goPage('/extension/views/postPaymentAD')">
            <div class="tools-item-img">
              <img src="../../../assets/images/extension/ad.png" alt="">
            </div>
            <div class="tools-item-content">
              <p>支付后广告</p>
              <p>多维度营销传播、流量变现</p>
            </div>
          </div>

          <!--二维码扩展-->
          <div class="tools-item" @click="goPage('/extension/views/appAd')">
            <div class="tools-item-img">
              <img src="../../../assets/images/extension/ad.png" alt="">
            </div>
            <div class="tools-item-content">
              <p>App广告</p>
              <p>App广告</p>
            </div>
          </div>

        </div>
      </div>
    </el-card>


  </div>
</template>

<script>
  export default {
    name: 'tools',
    data() {
      return {}
    },
    methods: {
      /**
       * 前往页面
       * @param handle url路径
       */
      goPage(handle) {
        if (handle != '' && handle != null) {
          this.$router.push({path: handle})
        } else {
          this.$message.error('URL错误')
        }

      }
    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
    vertical-align: middle;
  }

  .box-card {
    margin-bottom: 16px;
  }

  .tools-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .tools-item {
    width: 500px;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0px 3px 5px 0px #eeeeee;
    padding: 0 20px;
    cursor: pointer;
    margin-right: 20px;
  }

  .tools-item:hover {
    box-shadow: 0px 3px 5px 0px #d8d8d8;
  }

  .tools-item-content p {
    margin: 0 0 0 20px;
    color: #1f2d3d;
  }

  .tools-item-content p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
  }

  .tools-item-content p:nth-child(2) {
    margin-top: 8px;
    font-size: 13px;
    color: #808080;
  }

</style>
