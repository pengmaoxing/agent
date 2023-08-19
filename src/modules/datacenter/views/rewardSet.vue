<!--奖励设置与管理-->
<template>
  <div class="app-container" v-loading="loading">
    <!--搜索、工具条-->
    <div class="search-tools-bar">
      <template>
        <el-input v-model="searchForm.name" placeholder="按公司名" class="search-input"></el-input>
        <el-input v-model="searchForm.contact" placeholder="按联系人" class="search-input"></el-input>
      </template>
      <div class="block btn-space-input">
        <el-button type="primary" @click="getRewardListRefresh">搜索</el-button>
        <el-button type="primary" style="float: right" @click="rewardSetOpen">奖励金设置</el-button>
      </div>
    </div>
    <!--分割线-->
    <el-divider content-position="left">奖励审核</el-divider>
    <!--列表-->
    <div>
      <template>
        <el-table
          :data="rewardTableData"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="rewardCompanyName"
            label="代理商名称">
          </el-table-column>
          <el-table-column
            prop="rewardCompanyContact"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="rewardCompanyPhone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="ruleStr"
            label="奖励事项">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="申请时间">
          </el-table-column>
          <el-table-column
            prop="reward"
            label="奖励金额">
          </el-table-column>
          <el-table-column
            prop="recommendedCompanyName"
            label="事项成员">
          </el-table-column>
          <el-table-column
            prop="recommendedCompanyPhone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="statusStr"
            label="当前状态">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         :disabled="scope.row.status!=1"
                         @click="verifyReject(scope.row)">驳回
              </el-button>
              <el-button type="text"
                         :disabled="scope.row.status!=1"
                         @click="verifyPass(scope.row)">确认结算
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total-elements="rewardTableDataTotalElement"
          :change-callback="getRewardList"
          ref="rewardPage"></pagination>
      </template>
    </div>
    <!--模态框-->
    <template>
       <el-dialog
    :close-on-click-modal="false"
        title="奖励金设置"
        :visible.sync="rewardSetVisible"
        width="780px"
        :before-close="rewardSetClose">
        <div>
          <el-form :model="rewardForm" :rules="rewardFormRules" ref="rewardForm"
                   label-suffix="：" label-width="140px">
            <el-form-item label="是否启用奖励">
              <el-switch
                v-model="rewardForm.delFlag"
                @change="checkDelFlag"
                active-text="启用"
                inactive-text="禁用"
                :active-value="1"
                :inactive-value="-1">
              </el-switch>
            </el-form-item>
            <table class="reward-form-table" v-if="rewardForm.delFlag===1">
              <tr>
                <td>
                  <el-form-item label="推荐一级代理" prop="levelOneReward">
                    <el-input-number v-model="rewardForm.levelOneReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="三级升至一级" prop="threeToOneReward">
                    <el-input-number v-model="rewardForm.threeToOneReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="推荐二级代理" prop="levelTwoReward">
                    <el-input-number v-model="rewardForm.levelTwoReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="三级升至二级" prop="threeToTwoReward">
                    <el-input-number v-model="rewardForm.threeToTwoReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="推荐三级代理" prop="levelThreeReward">
                    <el-input-number v-model="rewardForm.levelThreeReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="二级升至一级" prop="twoToOneReward">
                    <el-input-number v-model="rewardForm.twoToOneReward"
                                     controls-position="right"
                                     :precision="2"
                                     :step="100"
                                     :min="0" :max="999999999">
                    </el-input-number>
                    <span class="input-suffix">元</span>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rewardSetClose">取 消</el-button>
          <el-button type="primary" @click="rewardSetSaveBefore" :loading="rewardBtnLoading">保 存</el-button>
        </span>
      </el-dialog>

    </template>
  </div>
</template>

<script>
  import {
    rewardList,
    rewardFindReview,
    auditReward,
    rewardSave
  } from '../api/reward'

  import pagination from '@/components/pagination/index'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: "rewardSet",
    mixins:[mixins],
    components: {pagination},
    data() {
      return {
        loading: false, //加载
        //搜索
        searchForm: {
          name: '',
          contact: ''
        },
        //表格数据
        rewardTableData: [],
        rewardTableDataTotalElement: 0,

        //奖励设置
        rewardSetVisible: false,
        rewardForm: {
          delFlag: -1,
          levelOneReward: 0,
          levelTwoReward: 0,
          levelThreeReward: 0,
          threeToOneReward: 0,
          threeToTwoReward: 0,
          twoToOneReward: 0,
        },
        rewardFormRules: {
          levelOneReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
          levelTwoReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
          levelThreeReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
          threeToOneReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
          threeToTwoReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
          twoToOneReward: [
            {required: true, message: '不设置奖励请填0', trigger: 'blur'},
          ],
        },
        rewardBtnLoading: false


      }
    },
    mounted() {
      //发起默认搜索
      this.getRewardList(1, 10)
    },
    methods: {
      /**
       * 提请搜索
       */
      getRewardListRefresh: function () {
        this.$refs['rewardPage'].refresh()
      },

      /**
       * 请求列表
       */
      getRewardList: function (pageNumber, pageSize) {
        console.log(pageNumber, pageSize);
        let form = this.searchForm;
        rewardList(pageNumber, pageSize, form).then(res => {
          let data;
          data = res.obj;
          this.rewardTableData = data.content;
          this.rewardTableDataTotalElement = data.totalElements
        }).catch(e => {

        })
      },

      /**
       * 奖励设置关闭
       */
      rewardSetClose: function () {
        this.rewardSetVisible = false
      },
      /**
       * 奖励设置打开
       */
      rewardSetOpen: function () {
        rewardFindReview().then(res => {
          let data = res.obj;

          this.rewardSetVisible = true; //数据获取成功后再打开
          this.rewardDataReview(data);
        }).catch(e => {

        });

      },

      /**
       * 数据回显
       */
      rewardDataReview: function (row) {
        if (row !== null) {
          this.rewardForm.delFlag = row.delFlag || -1; //启用与否

          this.rewardForm.levelOneReward = row.levelOneReward || 0; //推荐一级
          this.rewardForm.levelTwoReward = row.levelTwoReward || 0; //推荐二级
          this.rewardForm.levelThreeReward = row.levelThreeReward || 0; //推荐三级

          this.rewardForm.threeToOneReward = row.threeToOneReward || 0; //三升一
          this.rewardForm.threeToTwoReward = row.threeToTwoReward || 0; //三升二
          this.rewardForm.twoToOneReward = row.twoToOneReward || 0 //二升一
        }

      },
      /**
       * 如果禁用，把空值赋0
       */
      checkDelFlag: function (value) {
        //如果选项是-1（禁用奖励）则遍历表单对象
        if (value === -1) {
          for (let key in this.rewardForm) {
            if (this.rewardForm[key] === '' || this.rewardForm[key] == null) {
              this.rewardForm[key] = 0
            }
          }
        }
      },

      /**
       * 提请保存
       */
      rewardSetSaveBefore: function () {

        this.$refs['rewardForm'].validate((valid) => {
          if (valid) {
            this.rewardSetSave() //通过
          } else {
            this.$message.error('还有表单未正确填写。');
            return false;
          }
        });


      },

      rewardSetSave: function () {
        this.rewardBtnLoading = true;
        let form = this.deepCopy(this.rewardForm);
        rewardSave(form).then(res => {
          this.$notify({
            title: '提示',
            message: '奖励金设置保存成功。',
            type: 'success'
          });

          setTimeout(() => {
            this.rewardBtnLoading = false
          });

          this.rewardSetClose()

        }).catch(e => {
          this.rewardBtnLoading = false
        })
      },

      /**
       * 审核通过、结算  2pass  3reject
       */
      verifyPass: function (row) {
        this.$confirm('结算这笔奖励金？', '重要操作', {
          confirmButtonText: '结算',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.verifyPassSubmit(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消结算'
          });
        });
      },

      verifyPassSubmit: function (row) {
        let id = row.id;
        auditReward(id, 2, '').then(res => {

          this.$notify({
            title: '提示',
            message: '已设置同意结算',
            type: 'success',
            offset: 85,
          });

          this.getRewardListRefresh() //刷新
        }).catch(e => {

        })
      },

      /**
       * 审核不通过、驳回  2pass  3reject
       */
      verifyReject: function (row) {

        this.$prompt('驳回这笔奖励金？', '提示', {
          confirmButtonText: '驳回',
          cancelButtonText: '取消',
          inputPlaceholder: '驳回原因（选填）'
        }).then(({value}) => {
          this.verifyRejectSubmit(row, value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消驳回'
          });
        });

      },

      verifyRejectSubmit: function (row, value = '') {
        let id = row.id;
        auditReward(id, 3, value).then(res => {

          let text = '已驳回这笔奖励金。';
          if (value !== '' && value != null) {
            text = `已驳回这笔奖励金，原因是：${value}。`
          } else {
            text = '已驳回这笔奖励金（未填写原因）。'
          }

          this.$notify({
            title: '提示',
            message: text,
            type: 'success',
            offset: 85,
          });

          this.getRewardListRefresh() //刷新

        }).catch(e => {

        })
      },


      /**
       * 处理成功
       */
      notifySuccess: function (title, text) {
        this.$notify({
          title: title || '提示',
          message: text || '无',
          offset: 85,
          type: 'success'
        });
      },
      /**
       * 处理失败
       */
      notifyError: function (title, text) {
        this.$notify({
          title: title || '提示',
          message: text || '无',
          type: 'error'
        });
      },

      //---------------------------工具-----------------------------------

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*搜索、工具条*/
  .search-tools-bar {
    .search-input {
      width: 217px;
    }

    .block {
      display: inline;
    }

    .btn-space-input {
      margin-left: 10px;
    }
  }

  /*奖励金表单*/
  .reward-form-table {
    width: 100%;
    max-width: 100%;
    border: 0 none;

    tr {
      text-align: left;

      td {
        width: 50%;

        .input-suffix {
          margin-left: 3px;

          font-size: 13px;
          color: #8b8b8b;

          cursor: default;

          user-select: none;
        }
      }
    }
  }

</style>
