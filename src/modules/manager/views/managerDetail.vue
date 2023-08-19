<template>
  <div class="card_box">
    <!--第一行 卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="name_title">{{managerDetail.name}}</span>
        <el-button style="float: right;font-size: 16px" type="text" @click="goBack"><i class="el-icon-back"></i> 返回列表
        </el-button>
      </div>
      <!--卡片内容-->
      <div>
        <table width="100%" class="info_table">
          <tbody>
          <tr>
            <td class="tb_title">姓名</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.name}}</td>  <!--内容-->
            <td class="tb_title">等级</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.level}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">状态</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.status|statusFil}}</td>  <!--内容-->
            <td class="tb_title">联系电话</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.phone}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">性别</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.sex|sexFil}}</td>  <!--内容-->
            <td class="tb_title">创建时间</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.createTime}}</td>  <!--内容-->
          </tr>
          <tr>
            <td class="tb_title">E-mail</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.email}}</td>  <!--内容-->
            <td class="tb_title">修改时间</td>   <!--标题-->
            <td class="tb_text">{{managerDetail.updateTime}}</td>  <!--内容-->
          </tr>
          </tbody>
        </table>
      </div>
    </el-card>

    <!--下属列表-->
    <el-card class="box-card" style="margin-top: 20px">
      <div>
        <el-tabs v-model="activeName" @tab-click="changeTabs">
          <el-tab-pane v-if="userType=='1'" :label="agentName+'列表'" name="1">
            <!--列表-->
            <el-table
              :data="operatorData"
              empty-text="未查询到数据"
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
              <!--<el-table-column-->
                <!--label="合作级别">-->
                <!--<template slot-scope="scope">-->
                  <!--<template v-if="scope.row.cooperationLev===1">顶级运营商</template>-->
                  <!--<template v-else-if="scope.row.cooperationLev===2">普通运营商</template>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column
                prop="createTime"
                label="创建日期">
              </el-table-column>
              <el-table-column
                prop="saleName"
                label="归属业务员">
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <template v-if='scope.row.status==1'>未启用</template>
                    <template v-else-if="scope.row.status==2">待审核</template>
                    <template v-else-if="scope.row.status==3">已签约</template>
                    <template v-else-if="scope.row.status==4">过期</template>
                    <template v-else-if="scope.row.status==5">注销</template>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              :total-elements="operatorDataElements"
              :change-callback="getOperatorList"
              ref="page"
              v-if="tabRefresh"></pagination>

          </el-tab-pane>
          <el-tab-pane v-if="userType=='1' ||userType=='2'" :label="`${disName}列表`" name="2">
            <!--列表-->
            <el-table
              :data="disTributeData"
              empty-text="未查询到数据"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="company"
                label="公司名"
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
                prop="createTime"
                label="创建日期">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  <template v-if="scope.row.status===1">未启用</template>
                  <template v-else-if="scope.row.status===2">待审核</template>
                  <template v-else-if="scope.row.status===3">已签约</template>
                  <template v-else-if="scope.row.status===4">过期</template>
                  <template v-else-if="scope.row.status===5">注销</template>
                </template>
              </el-table-column>
              <el-table-column
                prop="saleName"
                label="所属业务员">
              </el-table-column>
            </el-table>

            <!--分页-->
            <pagination
              :total-elements="disTributeDataElements"
              :change-callback="getDistributeList"
              ref="page"
              v-if="tabRefresh"></pagination>

          </el-tab-pane>
          <el-tab-pane v-if="userType=='1' ||userType=='2' ||userType=='3'" label="商户列表" name="3">
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
                width="180"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系人"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="经营类别"
                width="300px"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <!--<div-->
                  <!--:title="scope.row.businessLevOne+' ' +scope.row.businessLevTwo + ' ' +scope.row.businessLevThree">-->
                  {{scope.row.businessLevOne?scope.row.businessLevOne+' >':'未知 > '}}
                  {{scope.row.businessLevTwo?scope.row.businessLevTwo+' >':'未知 > '}}
                  {{scope.row.businessLevThree?scope.row.businessLevThree:'未知'}}
                  <!--</div>-->
                </template>
              </el-table-column>
              <el-table-column
                prop="bySalesman"
                label="所属业务员"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{managerDetail.name}}
                </template>
              </el-table-column>
            </el-table>

            <!--分页-->
            <pagination
              :total-elements="merchantDataElements"
              :change-callback="getMerchantList"
              ref="page"
              v-if="tabRefresh"></pagination>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <!--&lt;!&ndash;重置密码对话框 &ndash;&gt;-->
    <!-- <el-dialog
    :close-on-click-modal="false"-->
    <!--title="重置业务员密码"-->
    <!--:visible.sync="resetPasswordDialog"-->
    <!--width="30%"-->
    <!--:before-close="resetPasswordDialogClose">-->

    <!--<el-form :model="resetForm" :rules="rules" ref="resetForm" label-width="100px">-->
    <!--<el-form-item label="新密码" prop="password">-->
    <!--<el-input v-model="resetForm.password" type="password"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->

    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="resetPasswordDialogClose">取 消</el-button>-->
    <!--<el-button type="primary" @click="saveNewPssword">提 交</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
  import {
    getManagerDetail,
    getOperatorList,
    getDistributeList,
    getMerchantList
  } from '../api/managerDetail'

  import pagination from '@/components/pagination/index'

  export default {
    name: 'managerDetail',
    components: {pagination},
    data () {
      return {
        id: '',
        userType: '',//用户类型
        activeName: '1',//标签页
        resetPasswordDialog: false,//重置密码对话框
        managerDetail: {
          // name: '1',
          // level: '',
          // status: '',
          // phone: '',
          // gender: '',
          // createTime: '',
          // laseTime: '',
          // mail: ''
        }, //渠道商详情

        operatorData: [], //运营商列表
        operatorDataElements: 0, //运营商列条数

        disTributeData: [],//渠道商列表
        disTributeDataElements: 0,//渠道商列条数

        merchantData: [],//商户列表
        merchantDataElements: 0,//商户条数

        tabRefresh: true, //一页中有多个分页时，用于重置分页插件
        //resetPWid: '',//被修改密码的ID
        // resetForm: {
        //   password: '',
        // },
        // rules: {
        //   password: [
        //     {required: true, message: '请输入新的密码', trigger: 'blur'},
        //     {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        //   ]
        // },
        operatorName: '', //运营商名称
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    created () {

    },
    filters:{
      // 性别过滤器
      sexFil: function (val) {
        let txt = '';

        switch (parseInt(val)) {
          case 1:
            txt = '男';
            break;
          case 2:
            txt = '女';
            break;
          default :
            txt = '未知';
            break
        }
        return txt
      },
      //状态过滤器
      statusFil:function (val) {
        let txt = '';

        switch (parseInt(val)) {
          case 1:
            txt = '启用';
            break;
          case 2:
            txt = '禁用';
            break;
          default :
            txt = '未知';
            break
        }
        return txt
      },
    },
    mounted () {

      this.userType = sessionStorage.getItem('userType'); //获取类型
      this.id = this.$route.query.id;  //接收ID
      //默认列表
      this.beforeChangeTabs();
      //获取业务员详情
      this.getManagerDetail(this.id)
    },
    methods: {
      goBack: function () {
        this.$router.go('-1')
      },
      //获取默认表格数据
      beforeChangeTabs: function () {
        if (this.userType == '1') {
          this.activeName = '1';
          this.getOperatorList(1, 10) //获取运营商列表
        } else if (this.userType == '2') {
          this.activeName = '2';
          this.getDistributeList(1, 10) //获取渠道商列表
        } else if (this.userType == '3') {
          this.activeName = '3';
          this.getMerchantList(1, 10) //获取商户列表
        }
      },

      // 切换标签页
      changeTabs: function (tab, event) {
        console.info('切换了标签页');
        console.log(tab);
        this.tabRefresh = false;
        this.$nextTick(() => {
          this.tabRefresh = true //保证分页被销毁后重新渲染
        });
        // 切换标签页，重新获取列表
        if (tab.name == '1') {
          this.getOperatorList(1, 10) //获取渠道商列表
        } else if (tab.name == '2') {
          this.getDistributeList(1, 10) //获取运营商列表
        } else if (tab.name == '3') {
          this.getMerchantList(1, 10) //获取商户列表
        }
      },
      /**
       * getManagerDetail 获取业务员详情
       */
      getManagerDetail: function (userid) {
        console.log('开始获取${userid}的信息');
        getManagerDetail(userid).then(res => {
          console.log(res.obj);
          this.managerDetail = res.obj
        }).catch(e => {
        })
      },

      /**
       * 获取运营商列表
       */
      getOperatorList (number, pageSize) {
        getOperatorList(number, pageSize, this.id).then(res => {
          console.log(res);
          this.operatorData = res.obj.content;
          this.operatorDataElements = res.obj.totalElements
        }).catch(e => {

        })
      },
      /**
       * 获取渠道商列表
       */
      getDistributeList (number, pageSize) {
        getDistributeList(number, pageSize, this.id).then(res => {
          console.log(res);
          this.disTributeData = res.obj.content;
          this.disTributeDataElements = res.obj.totalElements
        }).catch(e => {

        })
      },
      /**
       * 获取渠道商列表
       */
      getMerchantList (number, pageSize) {
        getMerchantList(number, pageSize, this.id).then(res => {
          console.log(res);
          this.merchantData = res.obj.content;
          this.merchantDataElements = res.obj.totalElements
        }).catch(e => {

        })
      }

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
