<template>
  <div style="margin: 20px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--条码支付-->
      <el-tab-pane label="被扫支付" name="micro">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款码">
            <el-input v-model="formData.authCode" placeholder="付款码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="microPay">支付</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refund">退款</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cancel">撤销</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--主扫支付-->
      <el-tab-pane label="主扫支付" name="preCreate">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item>
            <div class="qr-box">
              <canvas id="qrcode"></canvas>
            </div>
            <el-button type="primary" @click="preCreate">扫码</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refund">退款</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--jsapi-->
      <el-tab-pane label="公众号/服务窗" name="jsPay">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <div class="qr-box">
            <canvas id="js_qrcode"></canvas>
          </div>
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="jsPay">创建订单</el-button>
            <!--<el-button type="primary" @click="aliJsPay">手机支付宝支付</el-button>-->
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="refund">退款</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--预授权-->
      <el-tab-pane label="预授权" name="preAuth">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="付款码">
            <el-input v-model="formData.authCode" placeholder="付款码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preAuthMicroPay">预授权支付</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preAuthQuery">预授权查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preAuthFinish">预授权完成</el-button>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="支付类型">
            <el-select v-model="formData.orderType" placeholder="支付类型">
              <el-option label="微信" value="wx"></el-option>
              <el-option label="支付宝" value="ali"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formData.orderNum" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preAuthCancel">预授权撤销</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <p style="color: red">接口结果：{{result}}</p>
  </div>

</template>

<script>
  import {
    micro,
    preCreate,
    jsPay,
    query,
    cancel,
    refund,
    preAuthMicropay,
    preAuthQuery,
    preAuthCancel,
    preAuthFinish
  } from '@/modules/fuiou/api/index'
  import QRCode from 'qrcode'

  export default {
    data () {
      return {
        activeName: 'micro',
        result: '',
        formData: {
          orderType: 'wx',
          authCode: '',
          orderNum: '',
          tradeNo: ''
        }
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      microPay () {
        micro(this.formData.orderType, this.formData.authCode).then(response => {
          this.result = response.obj
          this.formData.orderNum = response.obj.reserved_mchnt_order_no
        }).catch(() => {
        })
      },
      query () {
        query(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },
      refund () {
        refund(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },
      cancel () {
        cancel(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },

      preCreate () {
        this.formData.orderType = 'ali'
        preCreate(this.formData.orderType).then(response => {
          this.result = response.obj
          // 将获取到的数据（url）画到msg（canvas）上
          let url = this.result.qr_code
          let msg = document.getElementById('qrcode')
          QRCode.toCanvas(msg, url, function (error) {
            console.log(error)
          })
          this.formData.orderNum = response.obj.reserved_mchnt_order_no

        }).catch(() => {
        })
      },
      jsPay () {
        jsPay(this.formData.orderType).then(response => {
          this.result = response.obj
          this.formData.tradeNo = response.obj.reserved_transaction_id
          this.formData.orderNum = response.obj.reserved_mchnt_order_no
          let url = 'http://wangtl.55555.io/pay.html?tradeNo=' + this.formData.tradeNo
          // 将获取到的数据（url）画到msg（canvas）上
          let msg = document.getElementById('js_qrcode')
          QRCode.toCanvas(msg, url, function (error) {
            console.log(error)
          })
        }).catch(() => {
        })
      },
      preAuthMicroPay () {
        preAuthMicropay(this.formData.orderType, this.formData.authCode).then(response => {
          this.result = response.obj
          this.formData.orderNum = response.obj.reserved_mchnt_order_no
        }).catch(() => {
        })
      },
      preAuthQuery () {
        preAuthQuery(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },
      preAuthFinish () {
        preAuthFinish(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },
      preAuthCancel () {
        preAuthCancel(this.formData.orderType, this.formData.orderNum).then(response => {
          this.result = response.obj
        }).catch(() => {
        })
      },
    }
  }
</script>
