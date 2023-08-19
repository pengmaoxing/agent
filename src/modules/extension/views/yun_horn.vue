<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
<!--      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddDialog">添加云喇叭</el-button>-->
<!--      <el-button icon="el-icon-delete" size="small" @click="deleteYunHorns">批量删除</el-button>-->
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
        prop="hornToken"
        label="云喇叭token">
      </el-table-column>
      <el-table-column
        prop="hornSerial"
        label="云喇叭序列号">
      </el-table-column>
      <el-table-column
        label="操作">
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
      :change-callback="getYunHornList"
      ref="page"></pagination>
     <el-dialog
    :close-on-click-modal="false"
      title="添加云喇叭配置"
      :visible.sync="addDialog"
      :before-close="closeAddDialog">
      <el-form :model="form">
        <el-form-item label="云喇叭token" :label-width="formLabelWidth">
          <el-input v-model="form.hornToken"></el-input>
        </el-form-item>
        <el-form-item label="云喇叭序列号" :label-width="formLabelWidth">
          <el-input v-model="form.hornSerial"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addYunHorn" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="编辑SN"
      :visible.sync="editDialog"
      :before-close="closeEditDialog">
      <el-form>
        <el-form-item label="云喇叭token" :label-width="formLabelWidth">
          <el-input v-model="currentRow.hornToken"></el-input>
        </el-form-item>
        <el-form-item label="云喇叭序列号" :label-width="formLabelWidth">
          <el-input v-model="currentRow.hornSerial"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editSnConfig" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getYunHorn,
    addYunHorn,
    deleteYunHorn,
    updateYunHorn,
  } from '../api/yun_horn'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'snConfig',
    components: {pagination},
    data() {
      return {
        tableData: [], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: true, // loading效果
        btnLoading: false,
        addDialog: false, // 添加SN模态框
        editDialog: false, // 编辑SN模态框
        accessDialog: false, // 分配模态框
        form: {
          appId: '',
          apiKey: '',
          secretKey: '',
        }, // 添加SN数据
        currentRow: {
          id: '',
          appId: '',
          apiKey: '',
          secretKey: '',
        }, // 当前表格对象
        formLabelWidth: '150px', // label宽度
        mchOptions: [],
      }
    },
    mounted() {
      this.getYunHornList(1, 10)
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDelete(row) {
        this.multipleSelection = []
        this.multipleSelection.push(row)
        this.deleteYunHorns()
      },




      /*
       * 获取SN列表
       * */
      getYunHornList(number, pageSize) {
        this.loading = true
        getYunHorn(number, pageSize).then(response => {
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
        this.form.hornToken = ''
        this.form.hornSerial = ''
      },
      addYunHorn() {
        this.loading = true
        this.btnLoading = true
        addYunHorn(this.form).then(response => {
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
      deleteYunHorns() {
        this.$confirm('是否删除百度语音配置？', '提示', {
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
            deleteYunHorn(ids).then(response => {
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
      * 编辑SN
      * */
      openEditDialog(row) {
        this.currentRow.id = row.id
        this.currentRow.hornToken = row.hornToken
        this.currentRow.hornSerial = row.hornSerial
        this.editDialog = true
      },
      closeEditDialog() {
        this.editDialog = false
      },
      editSnConfig() {
        this.loading = true
        this.btnLoading = true
        updateYunHorn(this.currentRow).then(response => {
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
