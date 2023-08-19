<template>
  <div class="app-container" v-loading="loading">
    <!--搜索、新增操作-->
    <div>
      <!--名字-->
      <div class="block">
        <el-input v-model="searchForm.name"
                  @change="submitSearch"
                  placeholder="输入配置名"
        ></el-input>
      </div>

      <div class="block">
        <el-select v-model="searchForm.payChannel"
                   :clearable="true"
                   @change="submitSearch"
                   placeholder="请选择支付渠道">
          <el-option label="全部支付渠道" value="">
          </el-option>
          <el-option
            v-for="item in payChannelsOption"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <el-select v-model="searchForm.payWay"
                   :clearable="true"
                   @change="submitSearch"
                   placeholder="请选择支付方式">
          <el-option label="全部支付方式" value="">
          </el-option>
          <el-option
            v-for="item in payWaysOption"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <el-select v-model="searchForm.payType"
                   :clearable="true"
                   @change="submitSearch"
                   placeholder="请选择支付类型">
          <el-option label="全部支付类型" value="">
          </el-option>
          <el-option
            v-for="item in payTypesOption"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <el-button type="primary" @click="submitSearch">搜索</el-button>

      </div>
      <div class="block" style="float: right">
        <el-button type="primary" @click="newConfigOpen">新建配置</el-button>
      </div>
    </div>
    <el-divider content-position="left">配置</el-divider>
    <!--表格-->
    <template>
      <el-table
        :data="configTable"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="配置名">
        </el-table-column>
        <el-table-column
          prop="payChannelStr"
          label="支付渠道">
        </el-table-column>
        <el-table-column
          prop="payWayStr"
          label="支付方式">
        </el-table-column>
        <el-table-column
          prop="payTypeStr"
          label="支付类型">
        </el-table-column>
        <el-table-column
          prop="orderValue"
          label="排序值">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="merchantDescription"
          label="商户费率描述">
        </el-table-column>
        <el-table-column
          prop="officialDescription"
          label="官方费率描述">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="modifyConfigOpen(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total-elements="configTableTotalElements"
        :change-callback="getConfigList"
        ref="configPage"></pagination>
    </template>


    <!--模态框-->
    <!--新建-->
     <el-dialog
    :close-on-click-modal="false"
      title="新建配置"
      :visible.sync="newConfigVisible"
      width="576px"
      :before-close="newConfigClose">
      <div>
        <el-form :model="newForm" :rules="formRules" ref="newForm" label-width="100px">
          <el-form-item label="配置名称：" prop="name">
            <el-input v-model="newForm.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="支付渠道：" prop="payChannel">
            <el-select v-model="newForm.payChannel" placeholder="请选择支付渠道">
              <el-option
                v-for="item in payChannelsOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支付方式：" prop="payWay">
            <el-select v-model="newForm.payWay" placeholder="请选择支付方式">
              <el-option
                v-for="item in payWaysOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支付类型：" prop="payType">
            <el-select v-model="newForm.payType" placeholder="请选择支付类型">
              <el-option
                v-for="item in payTypesOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述：" prop="description">
            <el-input v-model="newForm.description" type="textarea" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="商户费率描述：" prop="merchantDescription">
            <el-input v-model="newForm.merchantDescription" type="textarea" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="官方费率描述：" prop="officialDescription">
            <el-input v-model="newForm.officialDescription" type="textarea" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="排序值：" prop="orderValue">
            <el-input-number v-model="newForm.orderValue" :step="100"></el-input-number>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="newConfigClose">取 消</el-button>
    <el-button type="primary" @click="submitNewConfig">创 建</el-button>
  </span>
    </el-dialog>
    <!--修改-->
     <el-dialog
    :close-on-click-modal="false"
      title="修改配置"
      :visible.sync="modifyConfigVisible"
      width="576px"
      :before-close="modifyConfigClose">
      <div>
        <el-form :model="modifyForm" :rules="formRules" ref="modifyForm" label-width="100px">
          <el-form-item label="配置名称：" prop="name">
            <el-input v-model="modifyForm.name" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="支付渠道：" prop="payChannel">
            <el-select v-model="modifyForm.payChannel" placeholder="请选择支付渠道">
              <el-option
                v-for="item in payChannelsOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支付方式：" prop="payWay">
            <el-select v-model="modifyForm.payWay" placeholder="请选择支付方式">
              <el-option
                v-for="item in payWaysOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="支付类型：" prop="payType">
            <el-select v-model="modifyForm.payType" placeholder="请选择支付类型">
              <el-option
                v-for="item in payTypesOption"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述：" prop="description">
            <el-input type="textarea" v-model="modifyForm.description" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="商户费率描述：" prop="merchantDescription">
            <el-input type="textarea" v-model="modifyForm.merchantDescription" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="官方费率描述：" prop="officialDescription">
            <el-input type="textarea" v-model="modifyForm.officialDescription" placeholder="请尽量简短" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="排序值：" prop="orderValue">
            <el-input-number v-model="modifyForm.orderValue" :step="100"></el-input-number>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modifyConfigClose">取 消</el-button>
    <el-button type="primary" @click="submitModifyConfig">保 存</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getConfigEnum,
    getConfigList,
    saveNewConfig,
    modifyConfig
  } from '../api/paymentConfig'
  import pagination from '@/components/pagination/index'

  export default {
    name: "paymentConfig",
    components: {pagination},
    data() {
      return {
        loading: true,//页面加载
        searchForm: {
          name: '',
          payChannel: '',
          payWay: '',
          payType: '',
        }, //搜索条件
        payChannelsOption: [],
        payTypesOption: [],
        payWaysOption: [],

        configTable: [],
        configTableTotalElements: 0,

        newConfigVisible: false, //新建配置

        newForm: {
          name: '',
          payChannel: '',
          payWay: '',
          payType: '',
          description:'',
          merchantDescription:'',
          officialDescription:'',
          orderValue:1,
        },//新建配置
        formRules: {
          name: [
            {required: true, message: '请输入配置名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          payChannel: [
            {required: true, message: '请选择支付渠道', trigger: 'blur'}
          ],
          payType: [
            {required: true, message: '请选择支付类型', trigger: 'blur'}
          ],
          payWay: [
            {required: true, message: '请选择支付方式', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请填写配置描述', trigger: 'blur'}
          ],
          orderValue: [
            {required: true, message: '请填写排序值', trigger: 'blur'}
          ]
        },//新增
        modifyForm: {
          id: '',
          name: '',
          payChannel: '',
          payWay: '',
          payType: '',
          description:'',
          merchantDescription:'',
          officialDescription:'',
          orderValue:1,
        },//修改配置

        modifyConfigVisible: false,//编辑模态框


      }
    },
    mounted() {
      //先获取支付配置选项
      this.getConfigEnum();
      this.submitSearch()
    },
    methods: {

      /**
       * 获取支付配置的选项 （option）
       */
      getConfigEnum: function () {
        getConfigEnum().then(res => {
          let data = res.obj;
          this.payChannelsOption = data.payChannels;
          this.payTypesOption = data.payTypes;
          this.payWaysOption = data.payWays;
        }).catch(e => {
          this.loading = true
        })
      },

      /**
       *提请搜索
       */
      submitSearch: function () {
        this.$refs.configPage.refresh()
      },

      /**
       * 获取列表
       */
      getConfigList: function (pageNumber, pageSize) {
        let searchData = this.searchForm;
        getConfigList(pageNumber, pageSize, searchData).then(res => {
          let data = res.obj;
          this.configTable = data.content;
          this.configTableTotalElements = data.totalElements;
          this.loading = false //关闭加载
        }).catch(e => {

        })
      },

      /**
       * 打开新建
       */
      newConfigOpen: function () {
        this.newConfigVisible = true
      },

      /**
       * 关闭新建
       */
      newConfigClose: function () {
        this.$refs['newForm'].resetFields();
        this.newConfigVisible = false
      },

      /**
       * 提交新建
       */
      submitNewConfig: function () {
        let form = this.newForm;
        this.$refs['newForm'].validate((valid) => {
          if (valid) {
            saveNewConfig(form).then(res => {
              this.$message.success(res.msg); //提醒
              this.newConfigClose();
              this.$refs.configPage.refresh()  //刷新
            }).catch(e => {

            })
          } else {
            this.$message.error('还有内容未填写'); //遗漏提醒
            return false;
          }
        });
      },

      /**
       * 打开修改
       */
      modifyConfigOpen: function (data) {
        if (data.id === '' || data.id == null) {
          this.$message.error('获取不到ID，无法编辑')
          return
        }
        this.modifyForm.id = data.id || '';
        this.modifyForm.name = data.name || '';
        this.modifyForm.payChannel = data.payChannel + '' || '';
        this.modifyForm.payType = data.payType + '' || '';
        this.modifyForm.payWay = data.payWay + '' || '';
        this.modifyForm.description = data.description + '' || '';
        this.modifyForm.merchantDescription = data.merchantDescription + '' || '';
        this.modifyForm.officialDescription = data.officialDescription + '' || '';
        this.modifyForm.orderValue = data.orderValue || 1;
        this.modifyConfigVisible = true;
      },

      /**
       * 关闭修改
       */
      modifyConfigClose: function () {
        this.$refs['modifyForm'].resetFields();

        this.modifyConfigVisible = false
      },

      /**
       * 提交新建
       */
      submitModifyConfig: function () {
        let form = this.modifyForm;
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            modifyConfig(form).then(res => {
              this.$message.success(res.msg); //提醒
              this.modifyConfigClose();
              this.$refs.configPage.refresh()  //刷新
            }).catch(e => {

            })
          } else {
            this.$message.error('还有内容未填写'); //遗漏提醒
            return false;
          }
        });
      },



    }
  }
</script>

<style ref="stylesheet/scss" lang="scss" scoped>

  .block {
    display: inline-block;
    vertical-align: middle;
  }

  .input-width {
    width: 217px;
  }

</style>
