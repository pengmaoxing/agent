<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <el-select
        v-model="searchForm.merchantId"
        filterable
        size="small"
        :clearable="true"
        placeholder="按商户名搜索">
        <el-option
          v-for="item in mchOptions"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select
        v-model="searchForm.receiverId"
        filterable
        size="small"
        :clearable="true"
        placeholder="按别名搜索">
        <el-option
          v-for="item in recvSelectItem"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button icon="el-icon-search" type="primary" size="small" @click="refresh">搜索</el-button>

      <el-button type="primary" icon="el-icon-plus" size="small" @click="openMchAppletDialog">商户小程序</el-button>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openTmplRecvDialog">订阅绑定</el-button>


    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="alis"
        label="别名">
      </el-table-column>
      <el-table-column
        prop="openId"
        label="openId">
      </el-table-column>
      <el-table-column
        prop="merchantNames"
        label="商户名称">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="openTmplRecvDialog(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total-elements="totalElements"
      :change-callback="getTmplRecvMchList"
      ref="page"></pagination>

    <!--小程序配置-->
     <el-dialog
    :close-on-click-modal="false"
      title="小程序配置"
      :visible.sync="mchAppletDialogVisible"
      width="576px"
      :before-close="closeMchAppletDialog">
      <div>
        <!--商户小程序配置-->
        <el-divider content-position="left">商户小程序配置</el-divider>
        <el-form :model="mchAppletConfig" ref="restaurantMchConfig">
          <el-form-item v-show="false">
            <el-input v-model="mchAppletConfig.merchantId"></el-input>
          </el-form-item>
          <el-form-item label="AppId" :label-width="formLabelWidth" prop="appId">
            <el-input v-model="mchAppletConfig.appId" auto-complete="off" placeholder="appId"></el-input>
          </el-form-item>
          <el-form-item label="AppSecret" :label-width="formLabelWidth">
            <el-input v-model="mchAppletConfig.appKey" auto-complete="off" placeholder="appKey"></el-input>
          </el-form-item>
          <el-form-item label="templateId" :label-width="formLabelWidth">
            <el-input v-model="mchAppletConfig.templateId" auto-complete="off" placeholder="小程序订阅消息模板ID"></el-input>
          </el-form-item>
        </el-form>
        <div class="group-config-btn">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMchAppletDialog">退 出</el-button>
          <el-button type="primary" v-loading="btnLoading" @click="mchAppletConfigSubmit()">确定</el-button>
  </span>
    </el-dialog>

     <el-dialog
    :close-on-click-modal="false"
      title="订阅绑定"
      :visible.sync="addDialog"
      :before-close="closeAddDialog">
      <el-form :model="form">
        <el-form-item label="订阅者" :label-width="formLabelWidth">
          <el-select
            v-model="form.receiverId"
            filterable
            placeholder="请选择">
            <el-option
              v-for="item in recvSelectItem"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商户" :label-width="formLabelWidth">
          <el-select
            v-model="form.selectIds"
            multiple
            filterable
            placeholder="请选择（可搜索多选）">
            <el-option
              v-for="item in mchOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="bindConfig" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {
    getMchAppletConfig,
    saveMchAppletConfig,
    getTmplRecvMchList,
    bindConfig,
    recvSelectItem
  } from '@/modules/extension/api/appletTmpl'
  import {
    mchSelectItem
  } from '@/modules/extension/api/snConfig'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'snConfig',
    components: {pagination},
    data () {
      return {
        tableData: [], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: false, // loading效果
        btnLoading: false,
        addDialog: false, // 添加SN模态框
        editDialog: false, // 编辑SN模态框
        accessDialog: false, // 分配模态框

        mchAppletDialogVisible: false,

        //搜索
        searchForm: {
          merchantId: '', //商户id
          receiverId: '' //别名
        },
        // 商户小程序配置
        mchAppletConfig: {
          appId: '',
          appKey: '',
          templateId: '',
        },
        form: {
          id: '',
          receiverId:'',
          selectIds: [],
          merchantIds: ''
        }, // 添加SN数据
        currentRow: {
          id: '',
          flag: '',
          merchantId: '',
          selectIds: [],
          merchantIds: ''
        }, // 当前表格对象
        formLabelWidth: '150px', // label宽度
        mchOptions: '', //商户选项
        recvSelectItem: '', //订阅者下拉
      }
    },
    mounted () {
      this.getTmplRecvMchList(1,10)
      // 获取商户下拉
      this.getMerchants()
      // 获取订阅者下拉
      this.getRecvSelectItem()
    },
    methods: {

      closeMchAppletDialog () {
        this.mchAppletDialogVisible = false
      },

      openMchAppletDialog () {

        //获取商户小程序配置数据
        getMchAppletConfig().then(res => {
          let data = res.obj
          if (data) {
            //赋值数据
            this.mchAppletConfig.appId = data.appId
            this.mchAppletConfig.appKey = data.appKey
            this.mchAppletConfig.templateId = data.templateId
          }
          //显示模态框
          this.mchAppletDialogVisible = true
        }).catch(e => {

        })
      },

      /**
       * 商户小程序配置提交
       */
      mchAppletConfigSubmit () {
        this.btnLoading = true
        saveMchAppletConfig(this.mchAppletConfig).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.mchAppletDialogVisible = false
        }).catch(() => {
          this.btnLoading = false
          this.mchAppletDialogVisible = false

        })
      },

      /*
       * 获取订阅消息接收者-商户列表
       * */
      getTmplRecvMchList (number, pageSize) {
        let form = this.searchForm //搜索条件
        this.loading = true
        getTmplRecvMchList(number, pageSize, form).then(response => {
          let data = response.obj
          console.log(data)
          this.tableData = data.content
          this.totalElements = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },

      // = ==============================================================

      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      openTmplRecvDialog (row) {
        this.addDialog = true
        if (row) {
          this.form.id = row.id
          this.form.receiverId = row.receiverId
          this.form.selectIds = row.merchantIds.split('-')
        }
      },

      /**
       * 获取商户下拉id
       */
      getMerchants () {
        mchSelectItem().then(response => {
          console.log('res', response)
          this.mchOptions = response.obj
        }).catch(() => {
        })
      },
      /**
       * 获取订阅者下拉
       */
      getRecvSelectItem () {
        recvSelectItem().then(response => {
          console.log('res', response)
          this.recvSelectItem = response.obj
        }).catch(() => {
        })
      },

      closeAddDialog () {
        this.addDialog = false
        this.form.alis = ''
        this.form.selectIds = []
      },
      // 绑定接收者-商户配置
      bindConfig () {
        let ids = this.form.selectIds
        let merchantIds = ''
        for (let i = 0; i < ids.length; i++) {
          let id = ids[i]
          if (i === ids.length - 1) {
            merchantIds += id
          } else {
            merchantIds += id + '-'
          }
        }
        this.form.merchantIds = merchantIds
        this.loading = true
        this.btnLoading = true
        bindConfig(this.form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.btnLoading = false
          this.closeAddDialog()
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
          this.btnLoading = false
        })
      },
      /*
    * 刷新
    * */
      refresh () {
        this.$refs.page.refresh()
      }

    }
  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .form-input {
    width: 200px;
  }
</style>
