<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
<!--      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddDialog">添加短信模板</el-button>-->
<!--      <el-button icon="el-icon-delete" size="small" @click="deleteBaiduVoices">批量删除</el-button>-->
      <el-button icon="el-icon-refresh" size="small" @click="refresh">刷新</el-button>
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
        prop="accessKeyId"
        label="accessKeyId">
      </el-table-column>
      <el-table-column
        prop="secret"
        label="secret">
      </el-table-column>
      <el-table-column
        prop="signName"
        label="签名">
      </el-table-column>
      <el-table-column
        prop="smsTemplateCode"
        label="短信验证模板Code">
      </el-table-column>
      <el-table-column
        prop="smsInfoTemplateCode"
        label="注册成功后短信模板Code">
      </el-table-column>
      <el-table-column
        label="操作"
        width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="openEditDialog(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total-elements="totalElements"
      :change-callback="getSmsMessageList"
      ref="page"></pagination>
     <el-dialog
    :close-on-click-modal="false"
      title="添加短信模板"
      :visible.sync="addDialog"
      :before-close="closeAddDialog">
      <el-form :model="form">
        <el-form-item label="accessKeyId" :label-width="formLabelWidth">
          <el-input v-model="form.accessKeyId"></el-input>
        </el-form-item>
        <el-form-item label="secret" :label-width="formLabelWidth">
          <el-input v-model="form.secret"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="formLabelWidth">
          <el-input v-model="form.signName"></el-input>
        </el-form-item>
        <el-form-item label="短信验证模板Code" :label-width="formLabelWidth">
          <el-input v-model="form.smsTemplateCode"></el-input>
        </el-form-item>
        <el-form-item label="注册成功后短信模板Code" :label-width="formLabelWidth">
          <el-input v-model="form.smsInfoTemplateCode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addBaiduVoice" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="编辑短信模板"
      :visible.sync="editDialog"
      :before-close="closeEditDialog">
      <el-form>
        <el-form-item label="accessKeyId" :label-width="formLabelWidth">
          <el-input v-model="currentMessage.accessKeyId"></el-input>
        </el-form-item>
        <el-form-item label="secret" :label-width="formLabelWidth">
          <el-input v-model="currentMessage.secret"></el-input>
        </el-form-item>
        <el-form-item label="签名" :label-width="formLabelWidth">
          <el-input v-model="currentMessage.signName"></el-input>
        </el-form-item>
        <el-form-item label="短信验证模板Code" :label-width="formLabelWidth">
          <el-input v-model="currentMessage.smsTemplateCode"></el-input>
        </el-form-item>
        <el-form-item label="注册成功后短信模板Code" :label-width="formLabelWidth">
          <el-input v-model="currentMessage.smsInfoTemplateCode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editSmsMessage" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getSmsMessage, editSmsMessage,addSmsMessage,delSmsMessage} from '../api/sms_message'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'role',
    components: {pagination},
    data() {
      return {
        tableData: [], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: true, // loading效果
        btnLoading: false,
        addDialog: false, // 添加角色模态框
        editDialog: false, // 编辑角色模态框
        form: {
          accessKeyId: '',
          secret: '',
          signName: '',
          smsTemplateCode: '',
          smsInfoTemplateCode: '',
        }, // 添加SN数据
        currentMessage: {
          id: '',
          accessKeyId: '',
          secret: '',
          signName: '',
          smsTemplateCode: '',
          smsInfoTemplateCode: '',
        }, // 当前表格对象
        formLabelWidth: '180px', // label宽度
      }
    },
    mounted() {
      this.getSmsMessageList(1, 10)
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDelete(row) {
        this.multipleSelection = []
        this.multipleSelection.push(row)
        this.deleteRoles()
      },
      /*
       * 获取角色列表
       * */
      getSmsMessageList(number, pageSize) {
        this.loading = true
        getSmsMessage(number, pageSize).then(response => {
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

      /*
          * 添加SN
          * */
      openAddDialog() {
        this.addDialog = true
      },
      closeAddDialog() {
        this.addDialog = false
        this.form.appId = ''
        this.form.apiKey = ''
        this.form.secretKey = ''
      },
      addBaiduVoice() {
        this.loading = true
        this.btnLoading = true
        addSmsMessage(this.form).then(response => {
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
      * 删除百度语音配置
      * */
      deleteBaiduVoices() {
        this.$confirm('是否删除短信模板？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.multipleSelection.length) {
            this.loading = true
            let ids = []
            this.multipleSelection.forEach((item) => {
              ids.push(item.id)
            })
            delSmsMessage(ids).then(response => {
              this.$message({
                message: response.msg,
                type: 'success',
                duration: 1000
              })
              this.multipleSelection = []
              this.$refs.page.refresh()
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$message({
              message: '请选择SN',
              type: 'warning',
              duration: 1000
            })
          }
        })
      },
      /*
      * 编辑角色
      * */
      openEditDialog(row) {
        this.currentMessage.id = row.id
        this.currentMessage.accessKeyId = row.accessKeyId
        this.currentMessage.secret = row.secret
        this.currentMessage.signName = row.signName
        this.currentMessage.smsTemplateCode = row.smsTemplateCode
        this.currentMessage.smsInfoTemplateCode = row.smsInfoTemplateCode
        this.editDialog = true
      },
      closeEditDialog() {
        this.editDialog = false
      },
      editSmsMessage() {
        this.loading = true
        this.btnLoading = true
        editSmsMessage(this.currentMessage).then(response => {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1000
          })
          this.btnLoading = false
          this.closeEditDialog()
          this.$refs.page.refresh()
        }).catch(() => {
          this.loading = false
        })
      },


      /*
     * 刷新
     * */
      refresh() {
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
</style>
