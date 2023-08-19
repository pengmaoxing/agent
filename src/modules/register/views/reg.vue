<template>
  <div class="my-container" v-loading="loading">
    <!--外层-->
    <el-container>
      <!--提示-->
      <el-alert
        center
        title="您正在注册成为代理商"
        type="info">
      </el-alert>
      <!--头部-->
      <el-header style="height: auto;">

        <h1 class="reg-title">
          <span class="opa-name">{{mname}}</span>
          <br/>
          <span class="opa-tips">邀请您成为代理商</span>
        </h1>

      </el-header>
      <!--主要，中间-->
      <el-main>
        <div class="reg-main-form">
          <el-form :model="addOperatorForm" size="small" :rules="operatorFormRules" ref="addOperatorForm"
                   label-width="100px" label-suffix="："
                   :label-position="labelPosition"
                   :disabled="checkOK">
            <el-form-item label="公司/个人" prop="name">
              <el-input v-model.trim="addOperatorForm.name" class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input v-model.trim="addOperatorForm.contact" class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model.trim="addOperatorForm.phone" class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="province">
              <el-select v-model="addOperatorForm.province" placeholder="请选择省份"
                         size="small" class="form-input"
                         @change="getProv($event)">
                <el-option :value="n"
                           :key="index"
                           :label="n"
                           v-for="(n,index) in dataProv[0]['prov']">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-select v-model="addOperatorForm.city" placeholder="请选择城市"
                         size="small" class="form-input"
                         @click="getCity($event)">
                <el-option :value="n"
                           :key="index"
                           :label="n"
                           v-for="(n,index) in dataCity">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
              <el-input v-model.trim="addOperatorForm.address" class="form-input"></el-input>
            </el-form-item>

            <el-form-item label="代理级别" prop="agentLevel">
              <el-select v-model="addOperatorForm.agentLevel"
                         placeholder="请选择代理级别"
                         class="form-input">
                <!--item.value>currentLevel  只能添加下级-->
                <el-option
                  v-for="item in levelOption"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="save-btn">
            <div style="padding: 10px 0">
              <el-checkbox v-model="save_checked" @change="saveOperatorCheck">确认填写无误</el-checkbox>
            </div>

            <el-button type="primary" @click="saveOperatorBefore"
                       icon="el-icon-s-promotion"
                       :loading="saveBtnLoading">{{saveBtnName}}
            </el-button>
          </div>
        </div>

      </el-main>


    </el-container>
  </div>
</template>

<script>
  import cityJson from '@/assets/city/city.json'
  import {getAgentLevel, saveOpa} from '../api/reg'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "reg",
    mixins:[mixins],
    data() {
      var phone_rule = (rule, value, callback) => {
        let reg = /^(1\d{10})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号码格式错误'))
        } else {
          callback()
        }
      };
      return {
        // 页面
        labelPosition: 'right',
        fullWidth: document.documentElement.clientWidth,
        loading: true,
        saveBtnName: '注 册',
        //邀请人信息
        mid: '',
        mname: '',

        // 添加数据
        addOperatorForm: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          province: '',//省
          city: '',//市
          address: '',//详细地址
          userId: '',//推荐人id
          agentLevel: '',//代理级别
        },
        operatorFormRules: {
          name: [
            {required: true, message: '请输入公司/个人名称', trigger: 'blur'},
            {min: 1, max: 28, message: '长度在 1 到 28 个字符', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人真实姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入联系地址', trigger: 'blur'},
            {min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系人手机号', trigger: 'blur'},
            {validator: phone_rule, trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'change'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          agentLevel: [
            {required: true, message: '请选择代理级别', trigger: 'change'}
          ],

        },//校验
        save_checked: false,
        saveBtnLoading: false,
        checkOK: false,
        //邀请人
        superior: '凌云商户',
        currentLevel: 0, //邀请人当前等级
        //等级
        levelOption: [], //等级选项
        //城市
        //省市联动--------------------------
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        dialogForm: {
          name: '',
          selectProv: '',
          selectCity: '',
          selectCountry: '',
          mark: ''
        },
        selectItems: [],

      }
    },
    created() {
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    computed: {},
    watch: {
      save_checked: function (val) {
        if (val == false) {
          this.checkOK = false
        }
      }
    },
    mounted() {
      //获取等级选项
      this.getAgentLevel();
      //获取id和公司名
      this.getInfo()

    },
    methods: {
      /**
       * id和公司名
       */
      getInfo: function () {

        this.mid = this.$route.query.cid || null;
        this.addOperatorForm.userId = this.$route.query.cid || null;

        this.mname = this.$route.query.cname || null;

        console.log(this.mid, this.mname);

        if (this.mid === '' || this.mname === '') {
          this.$message.info('邀请信息错误，无法继续。');
          this.loading = tr
        } else {
          this.loading = false
        }
      },


      /**
       * 获取级别
       */
      getAgentLevel: function () {
        getAgentLevel().then(res => {
          let data = res.obj;
          this.levelOption = data
        }).catch(e => {

        })
      },


      /**
       * 保存前判断
       */
      saveOperatorBefore: function () {
        if (!this.save_checked) {
          this.$message('请确认填写无误。');
          return
        }
        this.$refs['addOperatorForm'].validate((valid) => {
          if (valid) {
            this.saveOpa()
          } else {
            this.$message.error('还有未填写的内容');
            return false;
          }
        });
      },

      /**
       * save 保存
       */
      saveOpa: function () {
        let form = this.deepCopy(this.addOperatorForm);
        this.saveBtnLoading = true; //锁定按钮
        saveOpa(form).then(res => {
          this.$message.success('提交成功，请等待审核，可以关闭页面。');
          this.saveBtnName = "注册成功，可以关闭页面"
        }).catch(e => {
          this.save_checked = false; //解锁表单
          this.saveBtnLoading = false; //锁定按钮
        })
      },
      /**
       * 核对选项
       */
      saveOperatorCheck: function () {

        this.$refs['addOperatorForm'].validate((valid) => {
          if (valid) {
            this.checkOK = true
          } else {
            this.checkOK = false;
            this.save_checked = false;
            this.$message.error('还有未填写的内容');
            return false;
          }
        });


      },


      /**
       * 清空表单
       */
      clearForm: function () {
        this.$refs['addOperatorForm'].resetFields();
      },

      /**
       * 省市选择器
       */
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        this.dialogForm.selectCity = this.dataCity[0];
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0];
        this.addOperatorForm.city = '';
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0]
      },

      handleResize(event) {
        this.fullWidth = document.documentElement.clientWidth;
        console.log(this.fullWidth);
        if (this.fullWidth < 500) {
          this.labelPosition = 'top'
        } else {
          this.labelPosition = 'right'
        }
      },

    }
  }
</script>

<style scoped>
  .my-container {
    padding: 20px 20px;
  }

  .reg-title {
    height: auto;
    text-align: center;
    font-weight: lighter;
    color: gray;

    cursor: default;
  }

  .opa-tips {
    font-size: 20px
  }

  .reg-main-form {
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
  }


  .form-input {
    width: 400px;
    max-width: 100%;
  }

  @media (max-width: 1025px) {
    .reg-main-form {
      width: 450px;
    }

    .form-input {
      width: 450px;
    }
  }

  @media (max-width: 768px) {
    .reg-main-form {
      width: 300px;
    }

    .form-input {
      width: 300px;
    }
  }


  .save-btn {
    padding-top: 20px;
    text-align: center;
    margin: 0 auto;
  }


</style>
