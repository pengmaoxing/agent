<template>
  <!--运渠-->
  <div class="app-container">
    <div v-if="modifyShow">
      <div class="search-bar">
        <el-input v-model="searchForm.name" placeholder="支付通道名" class="input-width"></el-input>
        <el-button type="primary" class="offset-left" @click="getList">搜索</el-button>
        <el-button type="" @click="getList">刷新</el-button>
        <el-button type="" @click="jumpTips('me')" style="float: right">提示</el-button>
        <el-button type="primary" @click="goBack" style="float: right">返回</el-button>
      </div>
      <!--表格-->
      <div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="支付渠道">
            </el-table-column>
            <el-table-column
              label="功能状态">
              <template slot-scope="scope">
                <span>{{scope.row.functionStatus|funcFil}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="签约状态">
              <template slot-scope="scope">
                <span>{{scope.row.signingStatus|statusFil}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="费率详情">
              <template slot-scope="scope">
                <el-button type="text" @click="feeDrawerOpen(scope.row)">查看费率</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="300px">
              <template slot-scope="scope">
                <el-button type="text"
                           @click="goDetails(scope.row)">详情
                </el-button>
                <el-button type="text"
                           :disabled="scope.row.signingStatus==2||scope.row.signingStatus==3||scope.row.signingStatus==(-99)||scope.row.signingStatus==null"
                           @click="setCurrentPayChannelByAdd(scope.row)">申请开通
                </el-button>
                <el-button type="text"
                           :disabled="scope.row.signingStatus!=3"
                           @click="modifyIntoDetail(scope.row)">修改信息
                </el-button>
                <el-button type="text"
                           :disabled="scope.row.signingStatus!=4"
                           @click="showRejectMsg(scope.row)">驳回信息
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <!--组件页-->
    <div divName="审核、新增、修改" v-if="!modifyShow">
      <!--新增支付通道后放在此处-->
      <!--wxpay 微信-->
      <!--alipay 支付宝-->

      <alipay v-if="currentPayChannel==1" @next="submieSuccess"
              :mode="mode"
              :status="currentSignStatus"
              :payChannel="currentPayChannel||null"
              :payChannelName="currentPayChannelName||null">
      </alipay>

      <wxpay v-else-if="currentPayChannel==2" @next="submieSuccess"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
      </wxpay>

      <hyb v-else-if="currentPayChannel==101" @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hyb>

      <yrm v-else-if="currentPayChannel==102" @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </yrm>

      <hsf v-else-if="currentPayChannel==104" @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hsf>

      <tts v-else-if="currentPayChannel==103" @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </tts>

      <fy v-else-if="currentPayChannel==105" @next="submieSuccess"
          :mode="mode"
          :status="currentSignStatus"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </fy>

      <leshua v-else-if="currentPayChannel==106" @next="submieSuccess"
              :mode="mode"
              :status="currentSignStatus"
              :payChannel="currentPayChannel||null"
              :payChannelName="currentPayChannelName||null">
      </leshua>

      <hlb v-else-if="currentPayChannel==107"
           @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hlb>

      <cmf v-else-if="currentPayChannel==108"
           @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </cmf>

      <hk v-else-if="currentPayChannel==123"
           @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </hk>

      <dx v-else-if="currentPayChannel==124"
          @next="submieSuccess"
          :mode="mode"
          :status="currentSignStatus"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </dx>

      <ryx v-else-if="currentPayChannel==125"
          @next="submieSuccess"
          :mode="mode"
          :status="currentSignStatus"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </ryx>

      <xryx v-else-if="currentPayChannel==126"
           @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </xryx>

      <hsq v-else-if="currentPayChannel==127"
            @next="submieSuccess"
            :mode="mode"
            :status="currentSignStatus"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
      </hsq>

      <ys v-else-if="currentPayChannel==109"
          @next="submieSuccess"
          :mode="mode"
          :status="currentSignStatus"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </ys>

      <tl v-else-if="currentPayChannel==110"
          @next="submieSuccess"
          :mode="mode"
          :status="currentSignStatus"
          :payChannel="currentPayChannel||null"
          :payChannelName="currentPayChannelName||null">
      </tl>

      <wxmd v-else-if="currentPayChannel==120" @next="submieSuccess"
            :mode="mode"
            :status="currentSignStatus"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
      </wxmd>


      <xls v-else-if="currentPayChannel==121" @next="submieSuccess"
           :mode="mode"
           :status="currentSignStatus"
           :payChannel="currentPayChannel||null"
           :payChannelName="currentPayChannelName||null">
      </xls>
    </div>
    <!--模态框-->
    <div>

      <!--费率 抽屉-->
      <el-drawer
        :title="fee_drawer_title"
        :visible.sync="fee_drawer_visible"
        :direction="fee_drawer_direction"
        :before-close="feeDrawerClose">
        <div class="fee-show-fox">
          <el-table :data="fee_drawerData">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="configName" label="通道"></el-table-column>
            <!--不显示官方费率-->
            <!--<el-table-column property="officialFeeRate" label="官方费率%" width="100"></el-table-column>-->
            <el-table-column property="merchantFeeRate" label="商户费率%" width="150"></el-table-column>
          </el-table>
        </div>
      </el-drawer>

      <!--申请修改进件资料-->
       <el-dialog
    :close-on-click-modal="false"
        title="申请修改进件资料"
        :visible.sync="applyModifyIntoVisible"
        width="600px"
        :before-close="applyModifyIntoClose">
        <template>
          <el-form>
            <el-form-item>
              <el-upload
                ref="upload"
                class="upload-demo"
                :action="uploadurl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="uploadSuccess"
                :limit="1"
                accept=".docx,application/msword"
                :on-exceed="handleExceed"
                :headers="headers">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过5MB</div>
              </el-upload>
            </el-form-item>
          </el-form>

        </template>
        <span slot="footer" class="dialog-footer">
    <el-button @click="applyModifyIntoClose">取 消</el-button>
    <el-button type="primary" @click="submitApplyModify">申 请</el-button>
  </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {
    getMerchantChannelList,
    getRejectMsg,
    saveUpdateFile,
    submitAudit,
    findPayChannelConfig
  } from '../../agent/api/payChannelList'


  import {returnThumbnailUrl, uploadUrl, newUploadUrl, returnFilesUrl} from '@/modules/file/api/upload' //图片操作API
  import {url} from '@/utils/request'

  import alipay from '@/components/payIncomimg/views/alipay'
  import wxpay from '@/components/payIncomimg/views/wxpay'
  import hsf from '@/components/payIncomimg/views/hsf'
  import hyb from '@/components/payIncomimg/views/hyb'
  import yrm from '@/components/payIncomimg/views/yrm'
  import tts from '@/components/payIncomimg/views/tts'
  import wxmd from '@/components/payIncomimg/views/wxmd'
  import fy from '@/components/payIncomimg/views/fy'
  import leshua from '@/components/payIncomimg/views/leshua'
  import hlb from '@/components/payIncomimg/views/hlb'
  import cmf from '@/components/payIncomimg/views/cmf'
  import ys from '@/components/payIncomimg/views/ys'
  import tl from '@/components/payIncomimg/views/tl'
  import xls from '@/components/payIncomimg/views/xls'
  import hk from '@/components/payIncomimg/views/hk'
  import ryx from '@/components/payIncomimg/views/ryx'
  import dx from '@/components/payIncomimg/views/dx'
  import xryx from '@/components/payIncomimg/views/xryx'
  import hsq from '@/components/payIncomimg/views/hsq'

  export default {
    name: "payChannelList",
    components: {alipay, wxpay, hsf, hyb, yrm, tts, fy, leshua, hlb, cmf, ys,tl,wxmd,xls,hk,ryx,dx,xryx,hsq}, //创建组件
    data() {
      return {
        searchForm: {
          name: '',
        },
        id: '',//当前商户id

        tableData: [],

        //审核修改
        mode: 'modify', //模式
        modifyShow: true,//显示表格
        currentSignStatus: 0,
        currentPayChannel: null, //当前渠道value
        currentPayChannelName: '', //当前渠道name

        //申请修改
        applyModifyIntoVisible: false,
        fileList: '', //文件列表
        dialogVisible: false,
        dialogImageUrl: '',

        //图片上传
        filesData: {
          module: 'word'
        },
        uploadurl: url + '/fms/upload/word_upload',
        headers: {
          authorized: sessionStorage.token
        },

        //上一个页面
        pageMode: 'none',

        //费率抽屉
        fee_drawer_visible: false,
        fee_drawer_title: '',
        fee_drawer_direction: 'rtl',
        fee_drawerData: [],


        //动态名称
        topName: this.globalAlias.topName,
        agentName: this.globalAlias.agentName,
        disName: this.globalAlias.disName,
        subName: this.globalAlias.subName,
      }
    },
    filters: {
      funcFil: function (val) {
        if (val === '' || val == null) {
          return '未知';
        }
        let txt = '';
        switch (parseInt(val)) {
          case 1:
            txt = '已启用';
            break;
          case 2:
            txt = '未启用';
            break;
        }
        return txt
      },
      statusFil: function (val) {
        if (val === '' || val == null) {
          return '未知';
        }
        let txt = '';
        switch (parseInt(val)) {
          case 1:
            txt = '未开通';
            break;
          case 2:
            txt = '待审核';
            break;
          case 3:
            txt = '签约成功';
            break;
          case 4:
            txt = '驳回';
            break;
          case -99:
            txt = '未知';
            break;
        }
        return txt
      }
    },
    mounted() {
      //获取id
      this.id = this.$route.query.id;  //接收ID
      //页面模式
      this.pageMode = this.$route.query.mode || 'none' //如果是跳转过来的。
      if (this.pageMode == 'jump') {
        this.jumpTips()
      }
      //获取列表
      this.getList()
    },
    methods: {

      /**
       * 费率抽屉
       */
      feeDrawerClose: function () {
        this.fee_drawer_title = '';
        this.fee_drawerData = [];
        this.fee_drawer_visible = false
      },

      feeDrawerOpen: function (row) {
        try {
          console.log(row)
          let data = row;
          let payChannel = data.payChannel;
          this.findPayChannelConfig(payChannel);
          this.fee_drawer_title = `${data.name} 费率设置详情`;
          this.fee_drawer_visible = true
        } catch (e) {
          console.log(e)
        }


      },

      /**
       * 费率获取数据
       */
      findPayChannelConfig: function (payChannel) {
        let mid = this.id;

        findPayChannelConfig(mid, payChannel).then(res => {
          let data = res.obj;
          if (data) {
            this.fee_drawerData = data
          }
        }).catch(e => {

        })

      },


      /**
       * 提示
       */
      jumpTips: function () {
        this.$notify({
          title: '支付通道',
          dangerouslyUseHTMLString: true,
          duration: 0,
          position: 'bottom-right',
          type: 'warning',
          message: `<span>各支付方式允许开通一条支付通道；</span><br />
<span>推荐（支付宝：支付宝官方）（微信：微信官方）（银行卡：富友）；</span><br />
<span>若一种支付方式提交多条支付通道申请，${this.topName}默认启用最后提交的通道申请。</span><br />`
        });
      },
      /**
       * 获取列表
       */
      getList: function () {
        let id = this.id;

        getMerchantChannelList(id).then(res => {
          let data;
          data = res.obj;
          this.tableData = data
        }).catch(e => {

        })
      },

      /**
       * 查看详情
       */
      goDetails: function (data) {
        let id = this.id;
        let pc = data.payChannel;
        let na = data.name;
        this.$router.push({path: '/merchant/public/views/details', query: {id: id, pc: pc, na: na}})
      },

      /**
       * 返回
       */
      goBack: function () {
        this.$router.go('-1')
      },

      /**
       * 显示驳回信息
       */
      showRejectMsg: function (data) {
        let id = this.id;
        getRejectMsg(data.payChannel, id).then(res => {
          this.$alert(res.obj || '暂无', '驳回信息', {
            confirmButtonText: '了解',
            callback: action => {

            }
          });
        }).catch(e => {

        })

      },

      /**
       * 修改
       */
      setCurrentPayChannelByModify: function (data) {
        this.mode = 'add';
        this.modifyShow = false;
        this.currentSignStatus = data.signingStatus;
        this.currentPayChannel = data.payChannel;
        this.currentPayChannelName = data.name;
      },
      /**
       * 后添加
       * @param data
       */
      setCurrentPayChannelByAdd: function (data) {
        console.log(data);
        this.mode = 'add';
        this.modifyShow = false;
        this.currentSignStatus = data.signingStatus;
        this.currentPayChannel = data.payChannel;
        this.currentPayChannelName = data.name;
      },

      /**
       * 组件提交成功后
       */
      submieSuccess: function () {
        this.modifyShow = true;
        this.getList()
      },

      /**
       * 申请修改信息
       */
      modifyIntoDetail: function (data) {
        this.currentPayChannel = data.payChannel;
        // this.modifyIntoData = '';
        //打开模态框
        this.applyModifyIntoOpen()
      },

      applyModifyIntoClose: function () {
        this.$refs.upload.clearFiles();
        this.applyModifyIntoVisible = false
      },
      applyModifyIntoOpen: function () {
        this.applyModifyIntoVisible = true
      },
      /**
       *word 上传成功
       * @param response
       * @param file
       * @param fileList
       */
      uploadSuccess: function (response, file, fileList) {
        console.log(response);
        this.fileList = response.obj
      },


      submitApplyModify: function () {

        let id = this.id;
        let path = this.fileList;
        let channel = this.currentPayChannel;
        if (path === '') {
          this.$message.error('还未选择文件');
          return false
        }
        saveUpdateFile(id, path, channel).then(res => {
          this.$message.success('提交成功');
          this.getList(1, 10);
          this.applyModifyIntoClose();
        }).catch(e => {

        })
      },
      /**
       * 修改后提交新状态，服务商可以修改
       * @param data
       */
      submitNewStatus: function (data) {
        this.currentPayChannel = data.payChannel;
        let form = {
          status: 2,
          payChannel: this.currentPayChannel,
          merchantId: this.id,
          reason: ''
        };
        submitAudit(form).then(res => {

        }).catch(e => {

        })
      },

      //文件超出个数
      handleExceed: function () {
        this.$message.error('文件超限')
      },
      handleRemove: function (file, fileList) {
        this.$message.info('清除文件')
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      }


    }
  }
</script>

<style scoped>
  .block {
    display: inline-block;
  }

  .search-bar {
    width: 100%;
    max-width: 100%;
  }

  .input-width {
    width: 200px;
  }

  .offset-left {
    margin-left: 10px;
  }

</style>
