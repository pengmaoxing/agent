<template>
  <div class="card_box">
    <!--第一行 卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="name_title">{{operaDetail.name}}</span>
        <el-button style="float: right;font-size: 16px" type="text" @click="goBack"><i class="el-icon-back"></i> 返回列表
        </el-button>
      </div>
      <!--卡片内容-->
      <div>
        <table width="100%" class="info_table">
          <tbody>
          <tr>
            <td class="tb_title">联系人</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.contact}}</td>  <!--内容-->
            <td class="tb_title">联系电话</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.phone}}</td>  <!--内容-->
            <!--<td class="tb_title">到期时间</td>   &lt;!&ndash;标题&ndash;&gt;-->
            <!--<td class="tb_text">{{operaDetail.createTime}}</td>  &lt;!&ndash;内容&ndash;&gt;-->
          </tr>
          <tr>
            <td class="tb_title">公司</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.name}}</td>  <!--内容-->
            <td class="tb_title">归属业务员</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.saleName}}</td>  <!--内容-->
            <td class="tb_title">加盟时间</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.endCooperaTime}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">状态</td>   <!--标题-->
            <td class="tb_text">
              <template>
                <template v-if='operaDetail.status==1'>未启用</template>
                <template v-else-if="operaDetail.status===2">待审核</template>
                <template v-else-if="operaDetail.status===3">已签约</template>
                <template v-else-if="operaDetail.status===4">过期</template>
                <template v-else-if="operaDetail.status===5">注销</template>
                <template v-else-if="operaDetail.status===6">驳回</template>
              </template>
            </td>  <!--内容-->
            <td class="tb_title">联系地址</td>   <!--标题-->
            <td class="tb_text">{{operaDetail.province}}→{{operaDetail.city}}→{{operaDetail.address}}</td>  <!--内容-->
          </tr>
          </tbody>
        </table>
      </div>
    </el-card>

    <!--下属列表-->
    <el-card class="box-card" style="margin-top: 20px">
      <!--<div slot="header" class="clearfix">-->
      <!--</div>-->
      <div>
        <el-tabs v-model="activeName" @tab-click="changeTabs">
          <el-tab-pane label="商户列表" name="1">
            <!--列表-->
            <el-table
              :data="merchantData"
              empty-text="未查询到数据"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商户名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系人">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="type"
                label="经营类别">
                <template slot-scope="scope">
                  <span>{{ scope.row.businessLevOne }}-{{ scope.row.businessLevTwo }}-{{ scope.row.businessLevThree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="managerName"
                label="所属业务员">
              </el-table-column>
            </el-table>

            <!--分页-->
            <pagination
              :total-elements="merchantDataElements"
              :change-callback="getMerchantList"
              ref="page"
              v-if="tabRefresh"></pagination>

          </el-tab-pane>
          <el-tab-pane label="业务员列表" name="2">
            <!--列表-->
            <el-table
              :data="managerData"
              empty-text="未查询到数据"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别">
                <template slot-scope="scope">
                  <template v-if="scope.row.sex===1">男</template>
                  <template v-else-if="scope.row.sex===2">女</template>
                </template>
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="email"
                label="电子邮箱">
              </el-table-column>
              <el-table-column
                prop="companyName"
                :label="agentName">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <template v-if="scope.row.status===1">启用</template>
                  <template v-else-if="scope.row.status===2">禁用</template>
                  <template v-else>驳回</template>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="resetPasswordDialogOpen(scope.row)">重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--分页-->
            <pagination
              :total-elements="managerDataElements"
              :change-callback="findUsersByCompanyId"
              ref="page"
              v-if="tabRefresh"></pagination>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <!--重置密码对话框 -->
     <el-dialog
    :close-on-click-modal="false"
      title="重置业务员密码"
      :visible.sync="resetPasswordDialog"
      width="576px"
      :before-close="resetPasswordDialogClose">

      <el-form :model="resetForm" :rules="rules" ref="resetForm" label-width="100px">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="resetPasswordDialogClose">取 消</el-button>
    <el-button type="primary" @click="saveNewPssword">提 交</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    findUsersByCompanyId,
    getOperRaDetail,
    resetPassword,
    getMerchantListByCompanyId
  } from '../api/distributeDetail'
  import pagination from '@/components/pagination/index'

  export default {
    name: 'operaDetail',
    components: {pagination},
    data() {
      return {
        id: '',
        activeName: '1',//标签页
        resetPasswordDialog: false,//重置密码对话框
        operaDetail: {}, //渠道商详情
        disTributeData: [],//渠道商列表
        disTributeDataElements: 0,//渠道商列条数
        managerData: [], //业务员列表
        managerDataElements: 0,//业务员列条数
        merchantData: [],//商户列表
        merchantDataElements: 0,//商户条数
        tabRefresh: true, //一页中有多个分页时，用于重置分页插件
        resetPWid: '',//被修改密码的ID
        resetForm: {
          password: '',
        },
        rules: {
          password: [
            {required: true, message: '请输入新的密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        },
        operatorName: '', //运营商名称

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    created() {

    },
    mounted() {
      console.log(this.$route.query.id)
      this.id = this.$route.query.id  //接收ID
      //获取本运营商详情
      this.getOperRaDetail(this.id)
      //默认商户列表
      this.getMerchantList(1, 10)
    },
    methods: {
      goBack: function () {
        this.$router.go('-1')
      },
      // 切换标签页
      changeTabs: function (tab, event) {
        console.info('切换了标签页')
        console.log(tab)
        this.tabRefresh = false
        this.$nextTick(() => {
          this.tabRefresh = true //保证分页被销毁后重新渲染
        })
        // 切换标签页，重新获取列表
        if (tab.name == '1') {
          this.getMerchantList(1, 10)
        } else if (tab.name == '2') {
          this.findUsersByCompanyId(1, 10)
        }

      },
      //获取运营商信息
      getOperRaDetail: function (id) {

        //用vue router获取URL数据
        //然后用getOperRaDetail获取这个运营商的数据
        getOperRaDetail(id).then(res => {
          this.operaDetail = res.obj
        }).catch(e => {
          this.loading = false
        })
      },
      //获取商户列表
      getMerchantList: function (number, pageSize) {
        let id = this.id
        getMerchantListByCompanyId(number, pageSize, id).then(response => {
          let data = response.obj
          console.log(data)
          this.merchantData = data.content
          this.merchantDataElements = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(e => {
          this.loading = false
        })
      },
      //获取业务员列表
      findUsersByCompanyId: function (number, pageSize) {
        // 需要运营商ID
        let id = this.id
        findUsersByCompanyId(number, pageSize, id).then(res => {
          let data = res.obj
          console.log(data)
          this.managerData = data.content
          this.managerDataElements = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(e => {
          this.loading = false
        })
      },

      //重置密码
      resetPasswordDialogOpen: function (data) {
        //获取被修改的ID
        this.resetPWid = data.id
        this.resetPasswordDialog = true

      },
      resetPasswordDialogClose: function () {
        this.resetForm.password = ''
        this.resetPasswordDialog = false
      },
      saveNewPssword: function () {
        console.log('表单密码:' + this.resetForm.password);
        //保存密码
        resetPassword(this.resetPWid, this.resetForm.password).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.resetForm.password = ''
          this.resetPasswordDialog = false
        }).catch(() => {
          this.loading = false
        })
      },
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card_box {
    padding: 0 20px;
  }

  .name_title {
    font-size: 32px;
  }

  .tb_title {
    font-weight: bold;
    width: 10%;
  }

  .tb_text {
    width: 20%;
    font-weight: lighter;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info_table tbody tr {
    height: 35px;
    font-size: 14px;
  }
</style>
