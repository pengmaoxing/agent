<template>
  <div class="app-container" v-loading="loading">
    <div class="filter-container">
      <el-input
        style="width: 200px"
        class="filter-item"
        placeholder="商户名称"
        v-model="merchantName" @keyup.enter.native="search" size="small"></el-input>
      <el-button type="primary" icon="el-icon-search" class="filter-item" @click="search" size="small">查询</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        label="商户名">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.name" placement="top">
            <span>{{ scope.row.name }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="商户账号">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.phone" placement="top">
            <span>{{ scope.row.phone }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="联系人">
        <!--防止字符串过长，影响表格，加了一个鼠标经过文字提示-->
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.contact" placement="top">
            <span>{{ scope.row.contact }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openChannelDialog(scope.row)">支付通道配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页-->
    <pagination
      :total-elements="totalElements"
      :change-callback="getMerchantList"
      ref="page"></pagination>

     <el-dialog
    :close-on-click-modal="false"
      title="支付通道配置"
      :visible.sync="configDialog"
      :before-close="closeConfigDialog">
      <el-tabs type="border-card">
        <el-tab-pane label="微信">
          <span>付款码支付(B扫C)</span>
          <el-radio v-model="form.wx.scanPay" label="1" border style="margin-left: 40px;">微信服务商</el-radio>
          <el-radio v-model="form.wx.scanPay" label="5" border>惠闪付</el-radio>
          <el-radio v-model="form.wx.scanPay" label="3" border>易融码</el-radio>
          <el-radio v-model="form.wx.scanPay" label="7" border>微信买单</el-radio>
          <el-radio v-model="form.wx.scanPay" label="8" border>传化</el-radio>
          <br><br><br>
          <span>公众号支付(C扫B)</span>
          <el-radio v-model="form.wx.wapPay" label="1" border style="margin-left: 40px;">微信服务商</el-radio>
          <el-radio v-model="form.wx.wapPay" label="2" border>会员宝</el-radio>
          <el-radio v-model="form.wx.wapPay" label="7" border>微信买单</el-radio>
          <el-radio v-model="form.wx.wapPay" label="3" border>易融码</el-radio>
          <el-radio v-model="form.wx.wapPay" label="8" border>传化</el-radio>
        </el-tab-pane>
        <el-tab-pane label="支付宝">
          <span>付款码支付(B扫C)</span>
          <el-radio v-model="form.ali.scanPay" label="1" border style="margin-left: 40px;">支付宝服务商</el-radio>
          <el-radio v-model="form.ali.scanPay" label="5" border>惠闪付</el-radio>
          <el-radio v-model="form.ali.scanPay" label="3" border>易融码</el-radio>
          <el-radio v-model="form.ali.scanPay" label="8" border>传化</el-radio>
          <br><br><br>
          <span>公众号支付(C扫B)</span>
          <el-radio v-model="form.ali.wapPay" label="1" border style="margin-left: 40px;">支付宝服务商</el-radio>
          <el-radio v-model="form.ali.wapPay" label="2" border>会员宝</el-radio>
          <el-radio v-model="form.ali.wapPay" label="3" border>易融码</el-radio>
          <el-radio v-model="form.ali.wapPay" label="8" border>传化</el-radio>
          <br><br><br>
          <span>预授权支付(B扫C)</span>
          <el-radio v-model="form.ali.prePay" label="1" border style="margin-left: 40px;">支付宝服务商</el-radio>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeConfigDialog">取 消</el-button>
        <el-button type="primary" @click="configSave">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>

  import {getMerchant, findPayChannel, configSave} from '@/modules/pay/api/pay_config'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'payConfig',
    components: {pagination},
    data() {
      return {
        loading: true,
        tableData: [], // 表格数据
        totalElements: 0, // 数据条数
        merchantName: '',
        configDialog: false,
        merchantId: '',
        form: {
          wx: {
            scanPay: '',
            wapPay: ''
          },
          ali: {
            scanPay: '',
            wapPay: '',
            prePay: '',
          }

        },
        // 支付参数
        payDialog: false,
        fileList: []
      }
    },
    mounted() {
      this.getMerchantList()
    },
    methods: {

      /*
     * 获取运营商对应的商户列表
     * */
      getMerchantList(number, pageSize) {
        this.loading = true
        getMerchant(number, pageSize, this.merchantName).then(response => {
          let data = response.obj
          this.totalElements = data.totalElements
          this.tableData = data.content
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },
      search() {
        this.$refs.page.search()
      },
      openChannelDialog(row) {
        this.configDialog = true
        this.merchantId = row.id
        this.findPayChannel(this.merchantId)
      },
      closeConfigDialog() {
        this.configDialog = false
        this.clearForm()
      },

      // 获取商户对应的支付配置
      findPayChannel(merchantId) {
        findPayChannel(merchantId).then(response => {
          let data = response.obj
          for (let i = 0; i < data.length; i++) {
            let obj = data[i]
            if (obj.payWay == 1) {
              this.form.wx.scanPay = obj.scanPayChannel + ''
              this.form.wx.wapPay = obj.webPayChannel + ''
            } else if (obj.payWay == 2) {
              this.form.ali.scanPay = obj.scanPayChannel + ''
              this.form.ali.wapPay = obj.webPayChannel + ''
              this.form.ali.prePay = obj.prePayChannel + ''
            }
          }
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },

      clearForm() {
        this.form.wx.scanPay = ''
        this.form.wx.wapPay = ''
        this.form.ali.scanPay = ''
        this.form.ali.wapPay = ''
        this.form.ali.prePay = ''
      },

      /**
       * 保存支付配置
       */
      configSave() {
        configSave(JSON.stringify(this.form), this.merchantId).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.clearForm()
          this.configDialog = false
        }).catch(() => {
          this.loading = false
        })
      },

    }
  }
</script>

<style scoped>
  .logo-uploader {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .logo-uploader:hover {
    border-color: #409EFF;
  }

  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .logo {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
