<template>
  <div class="app-container" v-loading="loading">
    <!--卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>惠闪付进件资料</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">退出编辑并返回</el-button>
      </div>
      <!--表单内容-->
      <div>
        <!--表单开始-->
        <el-form :model="form" ref="form" :rules="rules" :label-width="labelWidth" :size="inputSize">
          <!--经营联系信息-->
          <div class="info">
            <p>经营联系信息</p>
          </div>
          <el-form-item label="客服电话：" prop="shop_phone">
            <el-input v-model="form.shop_phone" class="standard-form"></el-input>
          </el-form-item>
          <!--商户基本信息-->
          <div class="info">
            <p>商户基本信息</p>
          </div>
          <el-form-item label="订单编号：" prop="order_id">
            <el-input v-model="form.order_id" class="standard-form"></el-input>
          </el-form-item>
          <el-form-item label="省份：" prop="province">
            <el-select v-model="form.province" placeholder="请选择省份"
                       class="formItem"
                       @change="getProv($event)">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataProv[0]['prov']">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市：" prop="city">
            <el-select v-model="form.city" placeholder="请选择城市"
                       class="formItem"
                       @change="getCity($event)">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataCity">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区/县：" prop="area">
            <el-select v-model="form.area" placeholder="请选择区/县"
                       class="formItem">
              <el-option :value="n"
                         :key="index"
                         :label="n"
                         v-for="(n,index) in dataCountry">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道：" prop="pay_type">
            <el-select v-model="form.pay_type" placeholder="请选择渠道">
              <el-option value="yirongma1" label="和融通三方通道（普通）"></el-option>
              <el-option value="yirongma2" label="和融通三方通道（优质）"></el-option>
              <el-option value="suixingfu" label="随行付三方通道"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户类型：" prop="business_type">
            <el-select v-model="form.business_type" placeholder="商户类型">
              <el-option value="1" label="企业商户"></el-option>
              <el-option value="2" label="个体工商户"></el-option>
              <el-option value="3" label="个人商户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户经营范围：" prop="type">
            <el-select v-model="form.type" placeholder="一级经营范围"
                       @change="getType($event)">
              <el-option v-for="item in typeData"
                         :key="item.key"
                         :value="item.value" :label="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户二级经营范围：" prop="classify">
            <el-select v-model="form.classify" placeholder="二级经营范围">
              <el-option v-for="item in classifyData"
                         :key="item"
                         :value="item" :label="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="微信费率：" prop="rate_wx">
            <el-input-number v-model="form.rate_wx" :min="0" :precision="4" :max="1" :step="0.0001" placeholder="微信费率"
                             class="standard-form"></el-input-number>
          </el-form-item>
          <el-form-item label="支付宝费率：" prop="rate_alipay">
            <el-input-number v-model="form.rate_alipay" :min="0" :precision="4" :max="1" :step="0.0001"
                             placeholder="支付宝费率"
                             class="standard-form"></el-input-number>
          </el-form-item>
          <el-form-item label="备注信息：" prop="description">
            <el-input
              type="textarea"
              :rows="8"
              :show-word-limit="true"
              :autosize="{ minRows: 8, maxRows: 15}"
              :maxlength="128"
              class="standard-form"
              placeholder="备注信息"
              v-model="form.description">
            </el-input>
          </el-form-item>
          <el-form-item label="合作商号：" prop="agent_id">
            <el-input v-model="form.agent_id" class="standard-form" placeholder="请输入合作商号"></el-input>
          </el-form-item>
          <!--企业法人/经办人信息-->
          <div class="info">
            <p>企业法人/经办人信息</p>
          </div>
          <el-form-item label="法人手机号：" prop="artif_phone">
            <el-input v-model="form.artif_phone" class="standard-form" placeholder="请输入法人手机号"></el-input>
          </el-form-item>

          <!--结算账户信息-->
          <div class="info">
            <p>结算账户信息</p>
          </div>
          <el-form-item label="结算人手机号：" prop="card_phone">
            <el-input v-model="form.card_phone" class="standard-form" placeholder="请输入结算人手机号"></el-input>
          </el-form-item>
          <el-form-item label="结算人身份证号：" prop="identity">
            <el-input v-model="form.identity" class="standard-form" placeholder="请输入结算人身份证号"></el-input>
          </el-form-item>

        </el-form>
        <!--表单结束-->
        <div class="btn-group">
          <el-button type="primary" @click="submitForm" v-loading="btnLoading" :disabled="btnLoading">提交进件材料</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import typeJson from '@/assets/businessClass/business.json'
  import {returnThumbnailUrl, uploadUrl} from '@/modules/file/api/upload' //图片操作API

  import {findHsfentryFile, hsfFileUpdate} from '@/modules/thirdMchInfo/agent/api/hsfMerchantInfo'

  export default {
    name: "hsfUniqueIncoming",
    data() {
      var checkShop_phon = (rule, value, callback) => {
        let reg = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
        if (!reg.test(value)) {
          callback(new Error('手机或电话号码格式错误'))
        } else {
          callback()
        }

      };
      var checkIdNum = (rule, value, callback) => {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!reg.test(value)) {
          callback(new Error('身份证号格式错误'))
        } else {
          callback()
        }

      };
      var rate = (rule, value, callback) => {
        let reg = /^-?\d+(\.\d{1,4})?$/;
        if (value > 1) {
          callback(new Error('费率错误'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('费率错误'))
          } else {
            callback()
          }
        }


      };
      return {
        loading: true,
        btnLoading: false,
        labelWidth: '150px',
        inputSize: 'medium',
        urlid: '',
        form: {
          id: '',
          shop_phone: '',
          order_id: '',
          province: '',
          city: '',
          area: '',
          pay_type: '',
          business_type: 1,
          rate_wx: 0,//微信费率
          rate_alipay: 0,//支付宝
          description: '', //基本信息
          agent_id: '', //合作商号
          artif_phone: '', //法人手机号
          card_phone: '', //结算人手机号
          identity: '', //法人身份证
          type: '',//一级经营范围
          classify: '',//二级经营范围
        },
        //城市
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        //经营范围
        typeData: typeJson,
        classifyData: '',
        classifyIndex: '',
        rules: {
          shop_phone: [
            {required: true, message: '请输入客服电话', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          order_id: [
            {required: true, message: '请输入订单编号', trigger: 'blur'},
            {min: 1, max: 32, message: '订单编号格式错误', trigger: 'blur'},
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'},
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'},
          ],
          area: [
            {required: true, message: '请选择区/县', trigger: 'change'},
          ],
          pay_type: [
            {required: true, message: '请选择渠道', trigger: 'blur'},
          ],
          business_type: [
            {required: true, message: '请选择商户类型', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择商户经营范围', trigger: 'change'},
          ],
          classify: [
            {required: true, message: '请选择商户二级经营范围', trigger: 'change'},
          ],
          agent_id: [
            {required: true, message: '请填写合作商号', trigger: 'blur'},
          ],
          artif_phone: [
            {required: true, message: '请填写法人手机号', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          card_phone: [
            {required: true, message: '请填写结算人手机号', trigger: 'blur'},
            {validator: checkShop_phon, trigger: 'blur'}
          ],
          identity: [
            {required: true, message: '请填写结算人身份证号', trigger: 'blur'},
            {validator: checkIdNum, trigger: 'blur'}
          ],
          rate_wx: [
            {required: true, message: '请填写微信费率', trigger: 'blur'},
            {validator: rate, trigger: 'blur'}
          ],
          rate_alipay: [
            {required: true, message: '请填写支付宝费率', trigger: 'blur'},
            {validator: rate, trigger: 'blur'}
          ]
        },//校验

      }
    },
    filters: {},
    mounted() {
      this.urlid = this.$route.query.id;  //接收ID

      //获取进件资料
      this.findHsfentryFile(this.urlid)

    },
    methods: {

      /**
       * 获取进件资料回显
       */
      findHsfentryFile: function (id) {
        findHsfentryFile(id).then(res => {
          let data = res.obj;
          this.dataAutoInput(data);
          this.loading = false
        }).catch(e => {

        })
      },

      /**
       * 数据赋值
       */
      dataAutoInput: function (data) {
        this.form.id = data.id;
        this.form.shop_phone = data.shop_phone || '';
        this.form.order_id = data.order_id || '';
        this.form.province = data.province || '';
        if (this.form.province != '') this.getProv(this.form.province); //选择器赋值
        this.form.city = data.city || '';
        if (this.form.city != '') this.getCity(this.form.city); //选择器赋值
        this.form.area = data.area || '';
        this.form.pay_type = data.pay_type || '';
        this.form.business_type = data.business_type || '';
        this.form.type = data.type || '';
        this.getType(this.form.type); //选择器赋值
        this.form.classify = data.classify || '';
        this.form.rate_wx = data.rate_wx || '';
        this.form.rate_alipay = data.rate_alipay || '';
        this.form.description = data.description || '';
        this.form.agent_id = data.agent_id || '';
        this.form.artif_phone = data.artif_phone || '';
        this.form.card_phone = data.card_phone || '';
        this.form.identity = data.identity || ''
      },


      /**
       * 尝试提示表单
       */
      submitForm: function () {
        let that = this;
        this.btnLoading = true;

        this.$refs['form'].validate((valid) => {
          if (valid) {
            //提交
            hsfFileUpdate(this.form).then(res => {
              this.$message.success('进件资料提交成功');
              setTimeout(function () {
                that.$router.go('-1')
              }, 1000)
            }).catch(e => {
              this.btnLoading = false
            })

          } else {
            this.$message.error('有表单还未填写');
            this.btnLoading = false;
            return false;
          }
        });


      },


      /**
       * 表单数据核验
       */



      /**
       * 工具
       */
      /**
       * 返回
       */
      goBack() {
        this.$confirm('正在编辑的数据将不会保存，是否退出？', '退出编辑？', {
          confirmButtonText: '退出',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go('-1')
        }).catch(() => {

        });
      },

      /**
       * 经营范围
       */
      getType(data) {
        if (data == '' || data == null) {
          return
        }
        console.log(data);
        let json = this.typeData;
        for (let i in json) {
          if (json[i].value === data) {
            this.classifyData = json[i].children;
            break
          }
        }
        //清空
        this.form.classify = ''
      },

      /**
       * 省市区选择器
       */
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        //this.dialogForm.selectCity = this.dataCity[0]
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        //this.dialogForm.selectCountry = this.dataCountry[0]
        this.form.city = '';
        this.form.area = ''
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        // this.dialogForm.selectCountry = this.dataCountry[0]
        this.form.area = ''
      },
    }
  }
</script>

<style scoped>
  .info {
    padding: 0px 16px;
    border-left: 5px solid #6c6fbf;
    margin: 20px 0;
  }

  .standard-form {
    width: 217px;
  }

  .btn-group {
    width: 100%;
    text-align: center;
  }
</style>
