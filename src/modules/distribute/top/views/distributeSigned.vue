<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="公司" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.contact" @keyup.enter.native="search" placeholder="联系人" size="small"
                class="formItem"></el-input>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <!--<el-button type="primary" size="small" @click="advancedSearchOpen">高级查询</el-button>-->
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
        prop="name"
        label="公司"
        width="180">
      </el-table-column>
      <el-table-column
        prop="contact"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          {{scope.row.createTime | filterTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="saleName"
        label="归属业务员">
      </el-table-column>
      <el-table-column
        prop="parentName"
        :label="'归属'+agentName">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status===1">未启用</template>
          <template v-else-if="scope.row.status===2">待审核</template>
          <template v-else-if="scope.row.status===3">已签约</template>
          <template v-else-if="scope.row.status===4">过期</template>
          <template v-else-if="scope.row.status===5">注销</template>
          <template v-else-if="scope.row.status===6">驳回</template>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column
        fixed="right"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <!--//如果有方法，传入参数“scope.row”-->
          <!--//如果需要索引，传入参数“scope.$index”-->
          <!--//如果需要当前整页表格数据，传入参数“tableData”-->
          <el-button type="text" @click="rooterDeatil(scope.row)">详情</el-button>
          <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button type="text" @click="deleteDistribute(scope.row)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total-elements="totalElements"
      :change-callback="getDistributeList"
      ref="page"></pagination>

    <!--高级查询模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="高级查询"
      :visible.sync="advancedSearch"
      width="576px"
      :before-close="advancedSearchClose">
      <span>这是高级查询</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="advancedSearch = false">取 消</el-button>
    <el-button type="primary" @click="advancedSearch = false">确 定</el-button>
  </span>
    </el-dialog>
    <!--高级查询模态框-->
  </div>
</template>

<script>
  import {
    getDistributeList,
    deleteDistribute
  } from '../api/distribute'
  import {resetPwd} from '@/modules/system/api/user'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'operator',
    components: {pagination},
    data () {
      return {
        tableData: [{
          company: '',
          contact: '',
          phone: '',
          bySalesman: '',
          joinStart: '',
          joinEnd: '',
          finishStart: '',
          finishEnd: '',
          level: '',
          status: '5',
          test: '2'
        }], // 表格数据
        multipleSelection: [], // 选中数据-多选
        totalElements: 0, // 数据条数
        loading: false, // loading效果
        btnLoading: false,
        formLabelWidth: '150px', // label宽度
        newFormLabelWidth: '100px', // label宽度
        //查询------------------------------------------------------------
        advancedSearch: false,//高级查询模态
        searchForm: {
          name: '', //公司名
          contact: '',//联系人
          phone: '',//通讯号码
          bySalesman: '',//所属业务员
          joinStart: '',//加盟事件开始
          joinEnd: '',//加盟事件结束
          finishStart: '',//到期事件开始
          finishEnd: '',//到期事件结束
          level: '',//级别
          status: ''//状态
        },//搜索用的表单
        statusOption: [], //状态选择器
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    mounted () {
      this.getDistributeList()
    },
    methods: {

      /**
       * 模态框操作  start----------------------------------------
       **/
      //高级查询
      advancedSearchOpen: function () {
        this.advancedSearch = true
      },
      advancedSearchClose: function () {
        this.advancedSearch = false
      },

      /**
       * 模态框操作 end----------------------------------------
       **/

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
        this.searchForm = {
          name: '', //公司名
          contact: '',//联系人
          phone: '',//通讯号码
          bySalesman: '',//所属业务员
          joinStart: '',//加盟事件开始
          joinEnd: '',//加盟事件结束
          finishStart: '',//到期事件开始
          finishEnd: '',//到期事件结束
          level: '',//级别
          status: ''//状态
        }//搜索用的表单
        this.$refs.page.search()
      },

      /*
       * 获取运营商列表
      * */
      getDistributeList (number, pageSize) {
        this.loading = true
        this.searchForm.status = 3
        getDistributeList(number, pageSize, this.searchForm).then(response => {
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

      //重置商户密码
      resetPassword(row) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(row.phone).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.btnLoading = false
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },

      /*
     * 删除
    * */
      deleteDistribute: function (data) {
        let oid = data.id; //eg :data.id
        this.$confirm('确定注销吗？本次操作无法撤销')
          .then(()=> {
            deleteDistribute(oid).then(res => {
              this.$message({
                message: res.msg,
                type: 'success',
              });
              this.btnLoading = false;
              this.$refs.page.refresh()
            }).catch(e => {
              this.btnLoading = false;
              this.loading = false
            })
          }).catch(_ => {
          this.$message({
            message: '取消注销',
          })
        })

      },


      // resetChecked () {
      //   this.$refs.tree.setCheckedKeys([])
      // },

      // 跳转
      rooterDeatil (data) {
        console.log("测试11",data)
        //query发送ID到详情
        
        // let mes = data;
        this.$router.push({path: '/subordinate/public/detail/subDetail', query: {mes:data}})
      },
      //刷新

      refresh () {
        this.$refs.page.refresh()
      }
    },
    filters: {
      //过滤日期
      filterTime: function (time) {
        if(null==time){
          return '';
        }
        return time.split(' ')[0];
      },

      //列表状态过滤器
      statusfilter: function (s) {
        let text = ''
        if (s == '' || s == null || s == undefined) { // "",null,undefined
          text = 'error'
        } else {
          switch (s) {
            case 1:
              text = '未启用'
              break
            case 2:
              text = '待审核'
              break
            case '3':
              text = '已签约'
              break
            case '4':
              text = '过期'
              break
            case '5':
              text = '注销'
              break
            default :
              text = '未知'
              break
          }
        }
        return text
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

  .formItem {
    display: inline-block;
    width: 150px;
    max-width: 100%;
  }
</style>
