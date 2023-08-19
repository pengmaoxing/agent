<template>
  <div class="app-container">

    <div>
      <el-date-picker
        v-model="searchForm.settdate"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyyMMdd">
      </el-date-picker>
      <el-input v-model="searchForm.cusid"
                placeholder="商户号" clearable
                class="block"></el-input>
      <el-button type="primary" @click="getRecord">搜 索</el-button>
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
            prop="fee"
            label="交易金额">
          </el-table-column>
          <el-table-column
            prop="clearamt"
            label="结算金额">
          </el-table-column>
          <el-table-column
            prop="settfee"
            label="结算手续费">
          </el-table-column>
          <el-table-column
            prop="expectclearday"
            label="应结算日期">
          </el-table-column>
          <el-table-column
            prop="iscleared"
            label="结算状态">
            <template slot-scope="scope">
              <span v-if="scope.row.iscleared==1">未处理</span>
              <span v-else-if="scope.row.iscleared=='01'">未结算</span>
              <span v-else-if="scope.row.iscleared=='05'">正在结算中</span>
              <span v-else-if="scope.row.iscleared=='08'">结算失败</span>
              <span v-else-if="scope.row.iscleared=='09'">已结算</span>
              <span v-else-if="scope.row.iscleared=='10'">已合并</span>
              <span v-else-if="scope.row.iscleared=='11'">冻结不结算</span>
              <span v-else-if="scope.row.iscleared=='12'">其它方式结算</span>
              <span v-else-if="scope.row.iscleared=='13'">客户放弃结算</span>
              <span v-else-if="scope.row.iscleared=='14'">已归集结算</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </div>

  </div>
</template>

<script>
  import {
    getRecordList,
  } from '../api/tlMerchantSettle'

  export default {
    name: "tlMerchantSettle",
    data() {
      return {
        searchForm: {
          settdate: '',
          cusid:''
        },
        tableData: [],
        totalElements: 0,
      }
    },
    mounted() {
     // this.getRecord()
    },
    methods: {
      /**
       * 获取列表
       */
      getRecord: function () {
        let form = this.searchForm;
        if(form.settdate==''||form.cusid==''){
          this.$message.error('查询条件不能为空！');
          return;
        }
        getRecordList(form).then(res => {
          let data = res.obj;
          this.tableData = data.content;
          this.totalElements = data.totalElements
        }).catch(e => {

        })
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
