<template>
  <div class="app-container">

    <div>
      <el-date-picker
        v-show="false"
        v-model="searchForm.date"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-input v-model="searchForm.merchantName"
                placeholder="按商户名搜索" clearable
                class="block"></el-input>
      <el-input v-model="searchForm.contact"
                placeholder="按联系人搜索" clearable
                class="block"></el-input>

      <el-input v-model="searchForm.shortName"
                placeholder="代理商名称" clearable
                class="block"></el-input>

      <el-input v-model="searchForm.merchantAccount"
                placeholder="商户账号" clearable
                class="block"></el-input>

      <el-button type="primary" @click="submitSerach">搜 索</el-button>
    </div>


    <div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>

          <el-table-column
            prop="merchantName"
            label="商户名称">
          </el-table-column>
          <el-table-column
            prop="merchantAccount"
            label="账号">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="businessLevOne"
            label="行业">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            width="200px"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">未处理</span>
              <span v-else-if="scope.row.status==2">已处理</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="申请信息"
            width="380px">
            <template slot-scope="scope">
              <ul v-if="scope.row.interestRateList" class="list">
                <li v-for="(list,index) in scope.row.interestRateList" :key="index">
                  {{list}}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px">
            <template slot-scope="scope">
              <el-button type="text" :disabled="scope.row.status==2" @click="goPayConfig(scope.row)">审核</el-button>
              <el-button type="text" :disabled="scope.row.status==2" @click="updateRecord(scope.row)">已处理</el-button>
              <el-button type="text" @click="delRecord(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="totalElements"
          :change-callback="getRecord"
          ref="page">
        </pagination>
      </template>
    </div>

  </div>
</template>

<script>
  import {
    getRecordList,
    delRecorditem,
    updateRecordStatus,
  } from '../api/applicationInfo'
  import pagination from '@/components/pagination/index'

  export default {
    name: "applicationInfo",
    components: {pagination},
    data() {
      return {
        searchForm: {
          date: '',
          merchantName:'',
          shortName:'',
          merchantAccount:''
        },
        tableData: [],
        totalElements: 0,
      }
    },
    mounted() {
      this.submitSerach()
    },
    methods: {
      /**
       * 发起搜索
       */
      submitSerach: function () {
        this.$refs['page'].refresh() //page节点刷新页面
      },

      /**
       * 获取列表
       */
      getRecord: function (pageNumber, pageSize) {
        let form = this.searchForm
        getRecordList(pageNumber, pageSize, form).then(res => {
          let data = res.obj;
          this.tableData = data.content;
          this.totalElements = data.totalElements
        }).catch(e => {

        })
      },


      /**
       * 删除
       */
      delRecord: function (data) {
        let id;
        id = data.id;

        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRecorditem(id).then(res => {
            this.$message.success('删除记录成功');
            this.$refs.page.refresh() //page节点刷新页面
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      /**
       * update
       */
      updateRecord: function (data) {
        let id;
        id = data.id;
        updateRecordStatus(id, 2).then(res => {
          this.$message.success('完成');
          this.$refs.page.refresh() //page节点刷新页面
        }).catch(e => {

        })
      },

      /**
       * 跳转到支付通道
       */
      goPayConfig: function (data) {
        let id = data.merchantId;
        this.$router.push({path: '/merchant/top/views/payChannelList', query: {id: id}})
      }
    }
  }
</script>

<style scoped>
  ul li {
    font-size: 12px;
    list-style-type: none;
    color: #3A3A3A;
  }

  .block {
    width: 200px;
  }
</style>
