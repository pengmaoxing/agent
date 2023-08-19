<template>
  <div class="app-container" v-loading="loading">
    <div class="action-container">
      <!--公司-->
      <el-input v-model="searchForm.name" @keyup.enter.native="search" placeholder="名称" size="small"
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
        prop="parentName"
        :label="`归属${disName}`">
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
        width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="rooterDeatil(scope.row)">详情</el-button>
           <!-- <el-button type="text" @click="editMemberOpen(scope.row)">修改</el-button> -->
        </template>
      </el-table-column>
    </el-table>

   <el-dialog
    :close-on-click-modal="false"
      :title="`查看佣金信息`"
      width="760px"
      :visible.sync="editMember"
      :before-close="editMemberClose">

      <el-form :model="editMemberForm" :rules="Rules" ref="editMemberForm" :label-width="newFormLabelWidth"
               size="mini">

        <el-form-item label="公司/个人：" show-message prop="name">
          <el-input v-model="editMemberForm.name" :disabled="currentDisabled!=1"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" show-message prop="contact">
          <el-input v-model="editMemberForm.contact" :disabled="currentDisabled!=1"></el-input>
        </el-form-item>
        <el-form-item label="省份：" prop="province">
          <el-select v-model="editMemberForm.province"
                     :disabled="currentDisabled!=1"
                     placeholder="请选择省份"
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
          <el-select v-model="editMemberForm.city" placeholder="请选择城市"
                     size="small" class="formItem"
                     :disabled="currentDisabled!=1"
                     @click="getCity($event)">
            <el-option :value="n"
                       :key="index"
                       :label="n"
                       v-for="(n,index) in dataCity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系地址：" show-message prop="address">
          <el-input v-model="editMemberForm.address"
                    :disabled="currentDisabled!=1"></el-input>
        </el-form-item>
        <el-form-item label="当前分佣模式：" prop="commissionModel">
          <el-select v-model="editMemberForm.commissionModel" :disabled="false" placeholder="当前分佣模式">
           <el-option
              v-for="item in commissionOption"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="抽佣比例:" show-message prop="payProrata" v-show="editMemberForm.commissionModel==1">
          <el-input-number :precision="2" :min="0" :max="100" :step="0.01" v-model="editMemberForm.payProrata">
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
              <el-form-item :label="main.selectItem.name+'('+item.name+')'" label-width="160px">
                <el-input-number v-model="item.feeRate" :precision="2" :step="0.01" :min="0.00" :max="50.00"
                                 class="dymInput"></el-input-number>%
              </el-form-item>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="editMemberClose">取 消</el-button>
    <!-- <el-button type="primary" @click="editOpera">确 定</el-button> -->
  </span>
    </el-dialog>
    <pagination
      :total-elements="totalElements"
      :change-callback="getDistributeList"
      ref="page"></pagination>
  </div>
</template>

<script>
  import {
    getDistributeList, getComModel, getPayComposeConfig, getCommissionModel
  } from '../api/sub'
  import {resetPwd} from '@/modules/system/api/user'
  import pagination from '@/components/pagination/index'
  import cityJson from '@/assets/city/city.json'
  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: 'operator',
    mixins:[mixins],
    components: {pagination},
    data() {
      return {
        tableData: [{
          name: '',
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
        statusOption: [{value: 1, name: '未启用'}, {value: 2, name: '待审核'},
          {value: 3, name: '已签约'}, ], //状态选择器
        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
         editMember: false,//编辑模态框
         editMemberForm: {
           id: '',
           name: '',//公司名/个人名
           contact: '',//联系人
           province: '',//省
           city: '',//市
           address: '',//详细地址
           payProrata: '',//分佣比例【数值】
           commissionModel: '', //分佣模式
         },//编辑表单
         modifyDynamicForm: [],
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
         //当前是否允许修改基本信息
         currentDisabled: '',
         dataProv: cityJson['selectProv'],
         dataCity: '',
          commissionOption: [], //模式
      }
    },
    mounted() {
      this.getDistributeList(1, 10);
      this.getCommissionModel()
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
      getDistributeList(number, pageSize) {
        this.loading = true
        getDistributeList(number, pageSize, this.searchForm).then(response => {
          let data = response.obj
          console.log("推广商",data)
          this.tableData = data.content
          this.totalElements = data.totalElements
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(() => {
          this.loading = false
        })
      },
      //跳转详情页
      rooterDeatil(data) {
        console.log("测试11",data)
        //query发送ID到详情
        
        // let mes = data;
        this.$router.push({path: '/subordinate/public/detail/subDetail', query: {mes:data}})
      },
       editMemberOpen: function (row) {
         console.log(row);
         this.editMember = true
         this.currentDisabled = row.status; //关闭模式
         getComModel().then(res => {
       		console.log("分佣模式",res)
           let data = res.obj;
           this.editMemberForm.commissionModel = data + '';
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

           if (this.editMemberForm.commissionModel == 2) {
             this.getPayComposeByModify(row.basePriceFeeRateList);
           } else {
             this.editMemberForm.payProrata = row.payProrata * 100;
           }

         }).catch(e => {

         });
      },
      getPayComposeByModify: function (showData) {
        getPayComposeConfig().then(res => {

          let data = res.obj;
          this.modifyDynamicForm = data; //动态表单
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
      editMemberClose: function () {
        this.currentDisabled=''; //重置编辑模式开关
        this.modifyDynamicForm = null;
        this.editMember = false
      },
      // editOpera() {
      //   this.loading = true;
      //   this.btnLoading = true;
      //   let form = this.deepCopy(this.editMemberForm);

      //   if (form.commissionModel == 2) {
      //     form.payProrata = 0 //底价模式，比例设置0
      //   } else {
      //     form.baseFeeRateDTOJson = ''; //比例模式，底价JSON置空
      //     form.payProrata /= 100
      //   }

      //   let feeArray = [];
      //   let dym = this.deepCopy(this.modifyDynamicForm);
      //   for (let i in dym) {
      //     for (let j in dym[i].selectItemList) {
      //       let obj = {};
      //       obj.payWay = dym[i].selectItem.value;
      //       obj.payChannel = dym[i].selectItemList[j].value;
      //       obj.feeRate = (dym[i].selectItemList[j].feeRate / 100).toFixed(4) || 0;
      //       feeArray.push(obj)
      //     }
      //   }

      //   form.baseFeeRateDTOJson = JSON.stringify(feeArray);


      //   distributeUpdate(form).then(response => {
      //     this.$message({
      //       message: response.msg,
      //       type: 'success'
      //     });


      //     setTimeout(()=>{
      //       this.btnLoading = false;
      //     },5000);

      //     this.editMemberClose();
      //     this.$refs['editMemberForm'].resetFields();
      //     this.$refs['page'].refresh()
      //   }).catch(() => {
      //     this.btnLoading = false;
      //     this.loading = false
      //   })
      // },
      /**
      ** 搜索
      **/
      search() {
        this.$refs.page.search()
      },
      /*
      * 重置
      * */
      reset() {
        this.searchForm = {
          name: '', //公司名
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
            case '5':
              text = '注销';
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
