<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openAddDialog">添加SN</el-button>
      <el-button icon="el-icon-delete" size="small" @click="deleteSnConfigs">批量删除</el-button>
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
        prop="merchantName"
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="sn"
        label="SN码">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="下载标识">
        <template slot-scope="scope">
          <template v-if="scope.row.flag==1">未下载</template>
          <template v-else-if="scope.row.flag==2">已下载</template>
        </template>
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
      :change-callback="getSnConfigList"
      ref="page"></pagination>
     <el-dialog
    :close-on-click-modal="false"
      title="添加SN"
      :visible.sync="addDialog"
      :before-close="closeAddDialog">
      <el-form :model="form">
        <el-form-item label="SN码" :label-width="formLabelWidth">
          <el-input v-model="form.sn"></el-input>
        </el-form-item>
        <el-form-item label="选择商户" :label-width="formLabelWidth">
          <el-select
            v-model="form.merchantId"
            filterable
            placeholder="请选择">
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
        <el-button type="primary" @click="addSnConfig" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
    :close-on-click-modal="false"
      title="编辑SN"
      :visible.sync="editDialog"
      :before-close="closeEditDialog">
      <el-form>
        <el-form-item label="下载标识" :label-width="formLabelWidth">
          <el-radio-group v-model="currentRow.flag">
            <el-radio :label="1">未下载</el-radio>
            <el-radio :label="2">已下载</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择商户" :label-width="formLabelWidth">
          <el-select
            v-model="currentRow.merchantId"
            filterable
            placeholder="请选择">
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
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editSnConfig" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getSnConfig,
    addSnConfig,
    deleteSnConfig,
    updateSnConfig,
    mchSelectItem
  } from '@/modules/extension/api/snConfig'
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
          sn: '',
          flag: 1,
          merchantId: '',
        }, // 添加SN数据
        currentRow: {
          id: '',
          flag: '',
          merchantId: '',
        }, // 当前表格对象
        formLabelWidth: '150px', // label宽度
        mchOptions: [],
      }
    },
    mounted() {
      this.getSnConfigList(1, 10)
      this.getMerchants()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleDelete(row) {
        this.multipleSelection = []
        this.multipleSelection.push(row)
        this.deleteSnConfigs()
      },


      getMerchants() {
        if (!this.mchOptions.length) {
          mchSelectItem().then(response => {
            this.mchOptions = response.obj
          }).catch(() => {
          })
        }
      },


      /*
       * 获取SN列表
       * */
      getSnConfigList(number, pageSize) {
        this.loading = true
        getSnConfig(number, pageSize).then(response => {
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
        this.getMerchants();
      },
      closeAddDialog() {
        this.addDialog = false
        this.form.sn = ''
        this.form.merchantId = ''
        this.form.flag = 1
      },
      addSnConfig() {
        this.loading = true
        this.btnLoading = true
        addSnConfig(this.form).then(response => {
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
      * 删除SN
      * */
      deleteSnConfigs() {
        this.$confirm('是否删除SN？', '提示', {
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
            deleteSnConfig(ids).then(response => {
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
        this.currentRow.flag = row.flag
        this.currentRow.merchantId = row.merchantId
        this.editDialog = true
      },
      closeEditDialog() {
        this.editDialog = false
      },
      editSnConfig() {
        this.loading = true
        this.btnLoading = true
        updateSnConfig(this.currentRow).then(response => {
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
