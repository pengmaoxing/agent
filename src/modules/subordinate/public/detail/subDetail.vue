<template>
  <div class="app-container">
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
              <!--<td class="tb_text">{{operaDetail.endCooperaTime}}</td>  &lt;!&ndash;内容&ndash;&gt;-->
            </tr>
            <tr>
              <td class="tb_title">公司</td>   <!--标题-->
              <td class="tb_text">{{operaDetail.name}}</td>  <!--内容-->
              <td class="tb_title">归属业务员</td>   <!--标题-->
              <td class="tb_text">{{operaDetail.saleName}}</td>  <!--内容-->
              <td class="tb_title">创建时间</td>   <!--标题-->
              <td class="tb_text">{{operaDetail.createTime}}</td>  <!--内容-->
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
              <td class="tb_text">{{operaDetail.province}}{{operaDetail.city}}{{operaDetail.address}}</td>  <!--内容-->
            </tr>
            </tbody>
          </table>
        </div>
      </el-card>

      <!--下属列表-->
      <el-card v-show="true" class="box-card" style="margin-top: 20px">
        <!--<div slot="header" class="clearfix">-->
        <!--</div>-->
        <div>
          <el-tabs v-model="activeName" @tab-click="changeTabs">
            <el-tab-pane label="佣金" name="1">
              <el-form :model="editMemberForm" :rules="Rules" ref="editMemberForm" :label-width="newFormLabelWidth"
                       size="mini">


                <el-form-item label="当前分佣模式：" prop="commissionModel">
                  <el-select v-model="editMemberForm.commissionModel" :disabled="true" placeholder="当前分佣模式">
                   <el-option
                      v-for="item in commissionOption"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="抽佣比例:" show-message prop="payProrata" v-show="editMemberForm.commissionModel==1">
                  <el-input-number :precision="2" :min="0" :max="100" :step="0.01" v-model="editMemberForm.payProrata" :disabled="true">
                  </el-input-number>%
                  <el-tooltip class="item" effect="dark" :content="`${disName}的分佣比例，比如填写60%，则佣金分成60%给${disName}`" placement="top-start">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </el-form-item>

                <!--底价模式-->
                <el-form-item label="通道底价:" show-message v-show="editMemberForm.commissionModel==2" class="dymForm">
                  <br>
                  <div v-for="(main,index) in modifyDynamicForm" class="box" :key="index">
                    <div v-for="(item,index) in main.selectItemList" :key="index">
                      <el-form-item :label="main.selectItem.name+'('+item.name+')'" label-width="160px" >
                        <el-input-number v-model="item.feeRate" :precision="2" :step="0.01" :min="0.00" :max="50.00"
                                         class="dymInput" :disabled="true"></el-input-number>%
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>
              </el-form>
             <!-- 列表 -->



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
                  :label="subName">
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
             <el-tab-pane label="商户列表" name="3">
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
                 <!--   分页 -->
                   <pagination
                      :total-elements="merchantDataElements"
                      :change-callback="getMerchantList"
                      ref="page"
                      v-if="tabRefresh"></pagination>
               </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>

      <!--重置密码对话框 -->
       <el-dialog
    :close-on-click-modal="false" v-show="false"
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
  </div>
</template>


<script>
  import {findUsersByCompanyId, getDetail, getMerchantListByCompanyId,getCommissionModel ,getPayComposeConfig ,getComModel} from '../api/subDetail'
  import pagination from '@/components/pagination/index'
  import cityJson from '@/assets/city/city.json'
  export default {
    name: 'operaDetail',
    components: {pagination},
    data() {
      return {
        id: '',
        activeName: '1',//标签页
        resetPasswordDialog: false,//重置密码对话框
        operaDetail: {
        }, //渠道商详情
        selectName:'请选择分佣模式',
        editMemberForm:{
          id: '',
          name: '',//公司名/个人名
          contact: '',//联系人
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】
          commissionModel: '', //分佣模式
        },
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
        operatorName: '', //推广商名称
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
        Rules: {
          name: [
            {required: true, message: '请输入公司名/个人名', trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人名字', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入联系人手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
          ],
          level: [
            {required: true, message: '请选择合作级别', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择城市/县', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入具体的地址', trigger: 'blur'},
            {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          payProrata: [
            {required: true, message: '请输入分佣比例', trigger: 'blur'}
          ],
        },
        formLabelWidth: '150px', // label宽度
        newFormLabelWidth: '130px', // label宽度
        currentDisabled: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
         commissionOption: [], //模式
         modifyDynamicForm: [],
      }
    },
    created() {

    },
    mounted() {
      this.getCommissionModel()
      console.log("id信息",this.$route.query.mes)
      this.id = this.$route.query.mes.id  //接收ID
      //获取本推广商详情
      this.getDetail(this.id)
      //默认商户列表
      this.getMerchantList(1, 10)
      //获取代理商/推广商等详情
      this.editMemberOpen(this.$route.query.mes)
    },
    methods: {
      /*
       * 获取运营商列表
      * */
      getCommissionModel: function () {
        getCommissionModel().then(res => {
          let data = res.obj;
          this.commissionOption = data
          console.log("data",data)
        }).catch(e => {

        })
      },
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
      //获取推广商信息
      getDetail: function (id) {

        //用vue router获取URL数据
        //然后用getOperRaDetail获取这个推广商的数据
        getDetail(id).then(res => {
          console.log("推广商信息",res.obj)
          this.operaDetail = res.obj
          // this.editMemberOpen(res.obj)
        }).catch(e => {
          this.loading = false
        })
      },
      editMemberOpen:function(row){
          console.log("测试点2",row);
         this.editMember = true
         this.currentDisabled = row.status; //关闭模式
         getComModel().then(res => {
       		console.log("分佣模式",res)
           let data = res.obj;
           this.editMemberForm.commissionModel = row.commissionModel + '';
           //打开模态框
           this.editMemberForm.id = row.id;
           this.editMemberForm.name = row.name;
           this.editMemberForm.contact = row.contact;
           this.editMemberForm.cooperationLev = row.cooperationLev;
           this.editMemberForm.province = row.province;
           this.editMemberForm.cooperationLev = row.cooperationLev;
           this.editMemberForm.province = row.province;
           this.editMemberForm.city = row.city;
           this.editMemberForm.address = row.address;

           // if (this.editMemberForm.commissionModel == 2) {
             this.getPayComposeByModify(row.basePriceFeeRateList);
           // } else {
             this.editMemberForm.payProrata = row.payProrata * 100;
           // }

         }).catch(e => {

         });
      },
      //底道模式信息
      getPayComposeByModify: function (showData) {
        getPayComposeConfig().then(res => {
          let data = res.obj;
          this.modifyDynamicForm = data; //动态表单
          console.log("底道模式信息",this.modifyDynamicForm)
          this.feeBackShow(data, showData)
        }).catch(e => {

        })
      },
      feeBackShow: function (form, showData) {
        console.log(showData);
        //form 表单
        //回显数据
        if (showData.length != 0) {
          console.log('showdata有值');
          for (let m in showData) {  //回显数据
            for (let i in form) {
              for (let j in form[i].selectItemList) {
                if (showData[m].payWay == form[i].selectItem.value && showData[m].payChannel == form[i].selectItemList[j].value) {
                  form[i].selectItemList[j].companyId = showData[m].companyId;
                  form[i].selectItemList[j].feeRate = showData[m].feeRate ? showData[m].feeRate * 100 : 0
                }
              }
            }
          }
          //过滤内容，判断是否有错误或空值
          for (let i in form){
            for(let j in form[i].selectItemList){
              let num=form[i].selectItemList[j].feeRate;
              console.log(`form的第${i}项selectItemList中的第${j}项feeRate是${num}`);
              if (num===''||num==NaN||num===undefined||num==='null'){

                form[i].selectItemList[j].feeRate=0
                console.log(`form的第${i}}项selectItemList中的第${j}项feeRate是${num},已经被设置为${form[i].selectItemList[j].feeRate}`);
              }
            }
          }
        } else {
          console.log('NOT FEE');
          for (let i in form) {
            for (let j in form[i].selectItemList) {
              this.$set(form[i].selectItemList[j], 'feeRate', 0.00)
            }
          }
        }
        // this.$set(this.modifyDynamicForm, '', form)
        this.modifyDynamicForm = this.deepCopy(form)
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
        // 需要推广商ID
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

  .tb_title:after {
    content: '：';
  }

  .tb_text {
    width: 20%;
    font-weight: lighter;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info_table tbody tr {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .dymForm{
    width: 700px;
  }
  .box {
    display: inline-block;
    width: 275px;
    margin-right: 10px;
  }

  .dymInput {
    display: inline-block;
    width: 100px;
  }
</style>
