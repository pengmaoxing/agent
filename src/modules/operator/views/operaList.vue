<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="公司" size="small"
                class="formItem"></el-input>
      <!--联系人-->
      <el-input v-model="searchForm.contact" @keyup.enter.native="search" placeholder="联系人" size="small"
                class="formItem"></el-input>
      <!--状态-->
      <el-select v-model="searchForm.status" @change="search" placeholder="状态" size="small"
                 clearable class="formItem">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <!--按钮-->
      <el-button type="primary" size="small" @click="search">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <!--      <el-button type="primary" size="small" @click="advancedSearchOpen">高级查询</el-button>-->
      <el-button type="primary" size="small" @click="newMemberOpen">新增</el-button>
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
      <!--<el-table-column-->
      <!--prop="level"-->
      <!--label="合作级别">-->
      <!--<template slot-scope="scope">-->
      <!--<template v-if="scope.row.cooperationLev===1">顶级运营商</template>-->
      <!--<template v-else-if="scope.row.cooperationLev===2">普通运营商</template>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="phone"
        label="创建日期">
        <template slot-scope="scope">
          {{scope.row.createTime | filterTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="saleName"
        label="归属业务员">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status===1">未启用</template>
          <template v-else-if="scope.row.status===2">待审核</template>
          <template v-else-if="scope.row.status===3">已签约</template>
          <template v-else-if="scope.row.status===4">过期</template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <!--//如果有方法，传入参数“scope.row”-->
          <!--//如果需要索引，传入参数“scope.$index”-->
          <!--//如果需要当前整页表格数据，传入参数“tableData”-->
          <el-button type="text" @click="rooterDeatil(scope.row)">详情</el-button>
          <el-button type="text" @click="editMemberOpen(scope.row)">修改</el-button>
          <el-button type="text" @click="delOperator(scope.row)"
                     :disabled="scope.row.status===1||scope.row.status===2?false:true">删除
          </el-button>
          <!--<el-button type="text" @click="OperatorUpdateAudit(scope.row.id,3)" :disabled="scope.row.status===1||scope.row.status===2?false:true">审核</el-button>-->
          <!--<el-button type="text" @click="OperatorUpdateAudit(scope.row.id,2)" :disabled="scope.row.status===1?false:true">提交审核</el-button>-->
          <!--<el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total-elements="totalElements"
      :change-callback="getOperatorList"
      ref="page"></pagination>

    <!--新增模态框-->
     <el-dialog
    :close-on-click-modal="false"
      title="新增"
      width="750px"
      :visible.sync="newMember"
      :before-close="newMemberClose">

      <el-form :model="newMemberForm" :rules="Rules" ref="newMemberForm" :label-width="newFormLabelWidth"
               size="mini">

        <el-form-item label="公司/个人：" show-message prop="name">
          <el-input v-model.trim="newMemberForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" show-message prop="contact">
          <el-input v-model.trim="newMemberForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="手机：" show-message prop="phone">
          <el-input v-model.trim="newMemberForm.phone"></el-input>
        </el-form-item>
        <!--<el-form-item label="合作级别：" prop="level">-->
        <!--<el-select v-model="newMemberForm.cooperationLev" placeholder="请选择合作级别" size="small" class="formItem">-->
        <!--<el-option value="1" label="顶级运营商"></el-option>-->
        <!--<el-option value="2" label="普通运营商"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="省份：" prop="province">
          <el-select v-model="newMemberForm.province" placeholder="请选择省份"
                     size="small" class="formItem"
                     @change="getProv($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataProv[0]['prov']">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-select v-model="newMemberForm.city" placeholder="请选择城市"
                     size="small" class="formItem"
                     @click="getCity($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataCity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：" show-message prop="address">
          <el-input v-model.trim="newMemberForm.address"></el-input>
        </el-form-item>


        <el-form-item label="分佣模式：" prop="commissionModel">
          <el-select v-model="newMemberForm.commissionModel" placeholder="选择分佣模式">
            <el-option
              v-for="item in commissionOption"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <!--抽佣比例-->
        <el-form-item label="抽佣比例:" show-message prop="payProrata" v-show="newMemberForm.commissionModel==1">
          <el-input-number :precision="2" :min="0" :max="100" :step="0.01" v-model="newMemberForm.payProrata">
          </el-input-number>%
          <el-tooltip class="item" effect="dark" :content="`${agentName}的分佣比例，比如填写60%，则佣金分成60%给${agentName}`" placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>

        </el-form-item>

        <!--底价模式-->
        <el-form-item label="通道底价:" show-message v-show="newMemberForm.commissionModel==2" class="dymForm">
          <br>
          <div v-for="(main,index) in newDynamicForm" class="box" :key="index">

            <div v-for="(item,index) in main.selectItemList" :key="index">

              <el-form-item :label="main.selectItem.name+'('+item.name+')'" label-width="160px">
                <el-input-number v-model="item.feeRate" :precision="2" :step="0.01" :min="0.00" :max="50.00"
                                 class="dymInput">
                </el-input-number>%
              </el-form-item>

            </div>

          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="newMemberClose">取消</el-button>
        <!--<el-button type="primary" @click="operaAdd(1)" v-loading="btnLoading" :disabled="btnLoading">确定</el-button>-->
    <el-button type="primary" @click="dataSet" :loading="btnLoading">提交</el-button>
  </span>
    </el-dialog>
    <!--新增模态框-->

    <!--编辑模态框-->
     <el-dialog
    :close-on-click-modal="false"
      :title="`编辑${agentName}信息`"
      width="750px"
      :visible.sync="editMember"
      :before-close="editMemberClose">

      <el-form :model="editMemberForm" :rules="Rules" ref="editMemberForm" :label-width="newFormLabelWidth"
               size="mini">

        <el-form-item label="公司/个人：" show-message prop="company">
          <el-input v-model="editMemberForm.name" :disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" show-message prop="contact">
          <el-input v-model="editMemberForm.contact" :disabled="false"></el-input>
        </el-form-item>
        <!--<el-form-item label="合作级别：" prop="level">-->
        <!--<el-select v-model="editMemberForm.cooperationLev" placeholder="请选择合作级别" size="small" class="formItem">-->
        <!--<el-option-->
        <!--v-for="item in levelOption"-->
        <!--:key="item.value"-->
        <!--:label="item.name"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="省份：" prop="province">
          <el-select v-model="editMemberForm.province" placeholder="请选择省份"
                     size="small" class="formItem" :disabled="false"
                     @change="getProv($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataProv[0]['prov']">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-select v-model="editMemberForm.city" placeholder="请选择城市"
                     size="small" class="formItem" :disabled="false"
                     @click="getCity($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataCity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：" show-message prop="address">
          <el-input v-model="editMemberForm.address" :disabled="false"></el-input>
        </el-form-item>

        <el-form-item label="分佣模式：" show-message prop="payMode">
          <el-select v-model="editMemberForm.commissionModel"
                     @change="modifyModeChange"
                     placeholder="选择分佣模式">
            <el-option
              v-for="item in commissionOption"
              :key="item.value"
              :label="item.name"
              :value="parseInt(item.value)">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抽佣比例:" show-message prop="payProrata" v-show="editMemberForm.commissionModel==1">
          <el-input-number :precision="2" :step="0.01" :min="0" :max="100" v-model="editMemberForm.payProrata">
          </el-input-number>
          %
          <el-tooltip class="item" effect="dark" :content="`${agentName}的分佣比例，比如填写60%，则佣金分成60%给${agentName}`" placement="top-start">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>

        <!--底价模式-->
        <el-form-item label="通道底价:" show-message v-show="editMemberForm.commissionModel==2" class="dymForm">
          <br>
          <div v-for="(main,index) in modifyDynamicForm" class="box">

            <div v-for="(item,index) in main.selectItemList">

              <el-form-item :label="main.selectItem.name+'('+item.name+')'" label-width="160px">
                <el-input-number v-model="item.feeRate" :precision="2" :step="0.01" :min="0.00" :max="50.00"
                                 class="dymInput">
                </el-input-number>%
              </el-form-item>

            </div>

          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="editMemberClose">取 消</el-button>
    <el-button type="primary" @click="editOperaDataSet" :loading="btnLoading">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑模态框-->
  </div>
</template>

<script>
  import {
    getOperatorList,
    getPayComposeConfig, //获取支付通道底价配置
    getCommissionModel,
    delOperator,
    operaAdd,
    operaUpdate,
    audit
  } from '@/modules/operator/api/operator'
  import {resetPwd} from '@/modules/system/api/user'
  import pagination from '@/components/pagination/index'
  import cityJson from '@/assets/city/city.json'
  import {mixins} from "../../../components/mixins/mixins";

  export default {
    name: 'operator',
    mixins:[mixins],//混入
    components: {pagination},
    data() {
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
        btnLoading: false, //按钮锁定
        formLabelWidth: '150px', // label宽度
        newFormLabelWidth: '100px', // label宽度
        //查询------------------------------------------------------------
        searchForm: {
          company: '', //公司名
          contact: '',//联系人
          status: ''//状态
        },//搜索用的表单
        statusOption: [{value: 1, name: '未启用'}, {value: 2, name: '待审核'},
          {value: 3, name: '已签约'}, ], //状态选择器

        //新增--------------------------------------------------------------
        newMember: false,//新增模态框
        newMemberForm: {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          cooperationLev: '1',//级别
          province: '',//省
          city: '',//市
          address: '',//详细地址

          commissionModel: 1, //分佣模式
          payProrata: 0,//分佣比例
          baseFeeRateDTOJson: '',

          status: '',//运营商状态
        },
        commissionOption: [], //模式
        newDynamicForm: [],

        levelOption: [{value: 1, name: '顶级运营商'}, {value: 2, name: '普通运营商'}], //合作级别
        //编辑
        editMember: false,//编辑模态框
        editMemberForm: {
          id: '',
          name: '',//公司名/个人名
          contact: '',//联系人
          cooperationLev: [],//级别
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】

          commissionModel: null, //模式
        },//编辑表单

        modifyDynamicForm: [], //编辑模式
        //省市联动--------------------------
        cityDetail: '',
        dataProv: cityJson['selectProv'],
        dataCity: '',
        dataCountry: '',
        provIndex: '',
        cityIndex: '',
        dialogForm: {
          name: '',
          selectProv: '',
          selectCity: '',
          selectCountry: '',
          mark: ''
        },
        selectItems: [],
        //省市联动--------------------------
        //新增判断规则
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
        //打开的模态框数据
        tempFormFeeData: [],

        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    mounted() {
      this.getOperatorList();
      //获取模式
      this.getCommissionModel()
    },

    methods: {

      /**
       * 模态框操作  start----------------------------------------
       **/


      /**
       * 获取通道底价配置
       */
      getPayCompose: function () {
        getPayComposeConfig().then(res => {
          let data = res.obj;
          let form = this.deepCopy(data); //动态表单

          for (let i in form) {
            for (let j in form[i].selectItemList) {
              this.$set(form[i].selectItemList[j], 'feeRate', 0.00)
            }
          }

          this.newDynamicForm = this.deepCopy(form)

        }).catch(e => {

        })
      },

      /**
       *获取模式
       */
      getCommissionModel: function () {
        getCommissionModel().then(res => {
          let data = res.obj;
          this.commissionOption = data
        }).catch(e => {

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
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },

      //新增
      newMemberOpen: function () {
        this.newMemberForm = {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          cooperationLev: '1',//级别
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】
          status: '',//运营商状态
          commissionModel: '1',
        };
        this.getPayCompose(); //获取动态表单
        this.newMember = true
      },
      newMemberClose: function () {
        this.newMemberForm = {
          name: '',//公司名/个人名
          contact: '',//联系人
          phone: '',//号码
          cooperationLev: '1',//级别
          province: '',//省
          city: '',//市
          address: '',//详细地址
          payProrata: '',//分佣比例【数值】
          status: '',//运营商状态
        },
          this.newMember = false
      },
      //省市
      getProv: function (prov) {
        this.provIndex = this.dataProv[0]['prov'].indexOf(prov);
        this.dataCity = this.dataProv[this.provIndex + 1]['0_' + this.provIndex];
        this.dialogForm.selectCity = this.dataCity[0];
        this.cityDetail = this.dataProv[this.provIndex + 1]['class1'];
        this.dataCountry = this.cityDetail[0]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0];
        this.newMemberForm.city = '';
        this.editMemberForm.city = ''
      },
      getCity: function (city) {
        this.cityIndex = this.dataCity.indexOf(city);
        this.dataCountry = this.cityDetail[this.cityIndex]['class2'];
        this.dialogForm.selectCountry = this.dataCountry[0]
      },

      /*
     * 获取运营商列表
    * */
      getOperatorList(number, pageSize) {
        this.loading = true;
        getOperatorList(number, pageSize, this.searchForm).then(response => {
          let data = response.obj;
          console.log(data);
          this.tableData = data.content;
          this.totalElements = data.totalElements;
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },

      /*
       * 删除运营商
      * */
      delOperator: function (data) {
        let oid = data.id; //eg :data.id
        this.$confirm(`确定删除${this.agentName}吗？本次操作无法撤销`)
          .then(() => {
            delOperator(oid).then(res => {
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
            message: '取消删除',
          })
        })

      },


      //保存前整理数据
      dataSet: function () {
        let status = 2; //设定状态
        let form = this.deepCopy(this.newMemberForm);

        form.status = status;

        if (form.commissionModel == 2) {
          form.payProrata = 0 //底价模式，比例设置0
        } else {
          form.baseFeeRateDTOJson = ''; //比例模式，底价JSON置空
          form.payProrata /= 100
        }

        let feeArray = [];
        let dym = this.deepCopy(this.newDynamicForm);
        for (let i in dym) {
          for (let j in dym[i].selectItemList) {
            let obj = {};
            obj.payWay = dym[i].selectItem.value;
            obj.payChannel = dym[i].selectItemList[j].value;
            obj.feeRate = (dym[i].selectItemList[j].feeRate / 100).toFixed(4) || 0;
            feeArray.push(obj)
          }
        }

        form.baseFeeRateDTOJson = JSON.stringify(feeArray);


        this.operaAdd(form)
      },

      //添加运营商
      operaAdd: function (form) {
        this.btnLoading = true;
        operaAdd(form).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.btnLoading = false;
          this.newMemberClose();
          this.$refs['page'].refresh();

          setTimeout(() => {
            this.btnLoading = false;
          }, 1000);

        }).catch(e => {
          this.loading = false;
          this.btnLoading = false
        })
      },
      //关闭
      newMemberClose: function () {
        this.$refs['newMemberForm'].resetFields();
        this.newMember = false; //关闭模态框
      },

      //编辑
      editMemberOpen: function (row) {
        console.log(row);
        //打开模态框
        this.editMemberForm.id = row.id;
        this.editMemberForm.name = row.name;
        this.editMemberForm.contact = row.contact;
        this.editMemberForm.phone = row.phone;
        this.editMemberForm.cooperationLev = row.cooperationLev;
        this.editMemberForm.province = row.province;
        this.editMemberForm.cooperationLev = row.cooperationLev;
        this.editMemberForm.province = row.province;
        this.editMemberForm.city = row.city;
        this.editMemberForm.address = row.address;

        this.editMemberForm.commissionModel = row.commissionModel;
        //保存当前费率信息
        this.tempFormFeeData = row.basePriceFeeRateList;
        //获取这个运营商的信息
        //获取费率回显信息
        if (row.commissionModel == 2) {
          this.getPayComposeByModify(row.basePriceFeeRateList);
        } else {
          this.editMemberForm.payProrata = row.payProrata * 100;
        }

        this.editMember = true
      },

      /**
       * 修改模式后，重新获取动态表单
       */
      modifyModeChange: function () {
        if (this.editMemberForm.commissionModel == 2) {
          let data = this.tempFormFeeData;
          this.getPayComposeByModify(data)
        }
      },

      //编辑模式回去底价表单
      getPayComposeByModify: function (showData) {
        getPayComposeConfig().then(res => {
          let data = res.obj;
          this.modifyDynamicForm = data; //动态表单
          this.feeBackShow(data, showData)
        }).catch(e => {

        })
      },

      //处理回显数据
      feeBackShow: function (form, showData) {
        //form是表单    showData是用于填充的数据
        console.log(form,showData);
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
              if (num===''||num==NaN||num===undefined||num==='null'){
                try {
                  form[i].selectItemList[j].feeRate=0;
                  console.log(`dispose>>>form的第${i}项selectItemList中的第${j}项feeRate是${num},已经被设置为${form[i].selectItemList[j].feeRate}`);
                }catch (e) {
                }
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


        this.modifyDynamicForm = this.deepCopy(form);

        console.log(this.modifyDynamicForm)

      },
      //关闭编辑框
      editMemberClose: function () {
        this.editMember = false
      },


      /**
       * 修改数据整理
       */
      editOperaDataSet() {

        let form = this.deepCopy(this.editMemberForm);

        if (form.commissionModel == 2) {
          form.payProrata = 0 //底价模式，比例设置0
        } else {
          form.baseFeeRateDTOJson = ''; //比例模式，底价JSON置空
          form.payProrata /= 100
        }

        let feeArray = [];
        let dym = this.deepCopy(this.modifyDynamicForm);
        for (let i in dym) {
          for (let j in dym[i].selectItemList) {
            let obj = {};
            obj.payWay = dym[i].selectItem.value;
            obj.payChannel = dym[i].selectItemList[j].value;
            obj.companyId = dym[i].selectItemList[j].companyId;
            obj.feeRate = (dym[i].selectItemList[j].feeRate / 100).toFixed(4) || 0;
            feeArray.push(obj)
          }
        }

        form.baseFeeRateDTOJson = JSON.stringify(feeArray);

        this.editOpera(form)
      },

      //确认修改
      editOpera(form) {
        this.btnLoading = true;
        operaUpdate(form).then(response => {
          this.$message({
            message: response.msg,
            type: 'success'
          });
          this.$refs['editMemberForm'].resetFields();
          this.$refs['page'].refresh();

          this.editMemberClose();
          setTimeout(() => {
            this.btnLoading = false;
          }, 1000);
        }).catch(() => {
          this.btnLoading = false;
          this.loading = false
        })
      },
      //提交审核或者审核
      OperatorUpdateAudit(id, status) {
        this.$confirm('是否确认操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          audit(id, status).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.btnLoading = false;
            this.$refs.page.refresh()
          }).catch(() => {
            this.loading = false
          })
        })
      },
      //跳转详情页
      rooterDeatil(data) {
        //console.log(data)
        //query发送ID到详情
        let id = data.id;
        this.$router.push({path: '/operator/views/operaDetail', query: {id: id}})
      },

      /**
       * 模态框操作 end----------------------------------------
       **/

      /*
   * 搜索
   * */
      search() {
        this.$refs.page.search()
      },
      /*
      * 重置
      * */
      reset() {
        this.searchForm = {
          company: '', //公司名
          contact: '',//联系人
          status: ''//状态
        };//搜索用的表单
        this.$refs.page.search()
      },

      /*
     * 刷新
     * */
      refresh() {
        this.$refs.page.refresh()
      }
    },
    filters: {

      //过滤日期
      filterTime: function (time) {
        if (null == time) {
          return ''
        }
        return time.split(' ')[0]
      },

      //列表状态过滤器
      statusfilter: function (s) {
        let text = '';
        if (s == '' || s == null || s == undefined) { // "",null,undefined
          text = 'error'
        } else {
          switch (s) {
            case '1':
              text = '未启用';
              break;
            case '2':
              text = '待审核';
              break;
            case '3':
              text = '已签约';
              break;
            case '4':
              text = '过期';
              break;
            default :
              text = '未知';
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
