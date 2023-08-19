<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
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
        label="商户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="商户账号">
      </el-table-column>
      <el-table-column label="签约状态">
        <template slot-scope="scope">
          <template v-if="scope.row.signStatus===1">未开通</template>
          <template v-else-if="scope.row.signStatus===2">待审核</template>
          <template v-else-if="scope.row.signStatus===3">签约成功</template>
          <template v-else-if="scope.row.signStatus===4">签约失败</template>
          <template v-else>未知</template>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="270">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="rooterDeatil(scope.row)">详情
          </el-button>
          <el-button
            type="text"
            @click="editFile(scope.row)">录入资料
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total-elements="totalElements"
      :change-callback="getMchInfoList"
      ref="page"></pagination>
  </div>
</template>

<script>
  import {getMchInfoList, detail} from '@/modules/merchant/agent/api/merchantInfo'
  import pagination from '@/components/pagination/index'

  export default {
    components: {pagination},
    name: 'user',
    data () {
      return {
        loading: false,
        btnLoading: false,
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        queryList: {
          name: '',
          email: '',
          phone: ''
        }, // 搜素数据
        tableData: [], // 表格数据
        addDialog: false, // 添加角色模态框

        formLabelWidth: '120px',
      }
    },
    mounted () {
      this.getMchInfoList()
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleDelete (row) {
        this.multipleSelection.push(row)
        this.deleteRoles()
      },
      /*
       * 获取列表
       * */
      getMchInfoList (number, pageSize) {
        this.loading = true
        getMchInfoList(number, pageSize, this.queryList).then(response => {
          let data = response.obj
          console.log(data)
          this.totalElements = data.totalElements
          this.tableData = data.content
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },
      //跳转详情页
      rooterDeatil (data) {
        //console.log(data)
        //query发送ID到详情
        let id = data.id
        this.$router.push({path: '/pay/views/detail', query: {id: id}})
      },
      /**
       *changeData 修改进件资料
       */
      editFile: function (data) {
        let id = data.id
        let mn = data.merchantName
        this.$router.push({path: '/pay/views/incoming_parts', query: {id: id,n:mn}})
      },

      /*
     * 刷新
     * */
      refresh () {
        this.$refs.page.refresh()
      },
      /*
      * 搜索
      * */
      search () {
        this.$refs.page.search()
      },
      /*
      * 重置
      * */
      reset () {
        this.queryList = {
          name: '',
          email: '',
          phone: ''
        }
        this.$refs.page.search()
      }
    }
  }
</script>

<style scoped>
  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
