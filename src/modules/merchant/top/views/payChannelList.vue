<template>
  <!--服务商-->
  <div class="app-container">
    <!--表格-->
    <div v-if="verifyShow">
      <div class="search-bar">

        <!--<el-input v-model="searchForm.name" placeholder="支付通道名" class="input-width"></el-input>-->
        <!--<el-button type="primary" class="offset-left" @click="getList">搜索</el-button>-->
        <el-button type="" @click="getList">刷新</el-button>
        <el-button type="primary" @click="payConfigOpen">支付通道配置</el-button>
        <!--<el-button type="primary" @click="aliAuth">支付宝授权</el-button>-->
        <el-button type="primary" @click="goBack" style="float: right">返回</el-button>

      </div>
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
            <!--<el-table-column-->
            <!--label="费率详情">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button type="text" @click="feeDrawerOpen(scope.row)">查看费率</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              label="操作"
              width="450px">
              <template slot-scope="scope">

                <el-button type="text"
                           @click="goDetails(scope.row)">详情
                </el-button>
                <el-button type="text"
                           :disabled="scope.row.signingStatus!=3"
                           @click="payConfigFeeOpen(scope.row)">参数配置
                </el-button>
                <el-button type="text"
                           :disabled="scope.row.signingStatus==3"
                           @click="setCurrentPayChannel(scope.row)">申请开通
                </el-button>
                <!--<el-button type="text" @click="checkSubmitPayChannel(scope.row)">确认开通</el-button>-->
                <!--<el-button type="text" @click="rejectMerchant(scope.row)">驳回信息</el-button>-->
                <el-button type="text"
                           :disabled="scope.row.signingStatus!=2&&scope.row.signingStatus!=3"
                           @click="setCurrentPayChannelByModify(scope.row)">修改
                </el-button>

                <!--支付宝  商户授权-->
                <el-button v-if="scope.row.payChannel==1" type="text" @click="aliAuth">商户授权</el-button>
                <!--富友  配置-->
                <el-button v-if="scope.row.payChannel==105"
                           :disabled="scope.row.signingStatus!=3"
                           type="text" @click="fyWxConfig">微信配置
                </el-button>
                <el-button v-if="scope.row.payChannel==105"
                           :disabled="scope.row.signingStatus!=3"
                           type="text" @click="fyPreConfigOpen">开通预授权
                </el-button>
                <!--乐刷 配置-->
                <el-button v-if="scope.row.payChannel==106"
                           type="text" @click="lsFeeConfigOpen">费率配置
                </el-button>
                <el-button v-if="scope.row.payChannel==106"
                           type="text" @click="lsPayConfigOpen">授权目录配置
                </el-button>
                <!--合利宝配置-->
                <el-button v-if="scope.row.payChannel==107"
                           type="text" @click="hlbOpen">开通产品
                </el-button>
                <el-button v-if="scope.row.payChannel==107"
                           type="text" @click="authDirOpen">授权目录配置
                </el-button>

                <el-button v-if="scope.row.payChannel==121"
                           type="text" @click="xlsFeeConfigOpen">费率配置
                </el-button>
                <el-button v-if="scope.row.payChannel==121"
                           type="text" @click="xlsSignConfigOpen">签约
                </el-button>
                <el-button v-if="scope.row.payChannel==121"
                           type="text" @click="xlsOpenQuery">报备查询
                </el-button>

                <el-button v-if="scope.row.payChannel==121"
                           type="text" @click="xlsOpen">报备
                </el-button>


                <!--聪明付大军-->
                <el-button v-if="scope.row.payChannel==125"
                           type="text" @click="cmfConfigOpen">微信配置
                </el-button>
                <el-button v-if="scope.row.payChannel==108"
                           type="text" @click="xhConfigOpen">微信配置
                </el-button>
                <el-button v-if="scope.row.payChannel==123"
                           type="text" @click="hkConfigOpen">微信配置
                </el-button>


                <el-button v-if="scope.row.payChannel==126"
                           type="text" @click="xryxConfigOpen">微信配置
                </el-button>
                <!--<el-button v-if="scope.row.payChannel==121"-->
                           <!--type="text" @click="xlsPayConfigOpen">授权目录配置-->
                <!--</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>

    <!--模态框-->
    <div>

      <!--费率 抽屉-->

      <!--<el-drawer-->
      <!--:title="fee_drawer_title"-->
      <!--:visible.sync="fee_drawer_visible"-->
      <!--:direction="fee_drawer_direction"-->
      <!--:before-close="feeDrawerClose">-->
      <!--<div class="fee-show-fox">-->
      <!--<el-table :data="fee_drawerData">-->
      <!--<el-table-column type="index" label="序号" width="50"></el-table-column>-->
      <!--<el-table-column property="configName" label="通道"></el-table-column>-->
      <!--<el-table-column property="officialFeeRate" label="官方费率%" width="100"></el-table-column>-->
      <!--<el-table-column property="merchantFeeRate" label="商户费率%" width="100"></el-table-column>-->
      <!--</el-table>-->
      <!--</div>-->
      <!--</el-drawer>-->

      <!--驳回-->
       <el-dialog
    :close-on-click-modal="false"
        title="驳回"
        :visible.sync="rejectVisible"
        width="30%"
        :before-close="rejectClose">
        <div>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入驳回内容"
            v-model="rejectForm.reason">
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="rejectClose">取 消</el-button>
    <el-button type="primary" @click="submitReject">驳 回</el-button>
  </span>
      </el-dialog>

      <!--支付通道配置-->
       <el-dialog
    :close-on-click-modal="false"
        title="支付通道配置"
        :visible.sync="payConfigVisible"
        width="600px"
        :before-close="payConfigClose">
        <div>

          <template>
            <el-tabs v-model="activeName" @tab-click="">
              <el-tab-pane v-for="(tabs,index) in payConfigData" :key="tabs.selectItem.value"
                           :label="tabs.selectItem.name"
                           :name="tabs.selectItem.name">
                <el-form>
                  <el-form-item v-for="(group,index) in tabs.configSelectItemList" :key="group.selectItem.value+index"
                                :label="group.selectItem.name">
                    <el-radio-group v-model="group.sel">
                      <el-radio v-for="(item,index) in group.selectItemList"
                                :key="item.value"
                                :label="item.value+'-'+tabs.selectItem.value+'-'+group.selectItem.value">{{item.name}}
                      </el-radio>
                      <!--切换成 -  -->
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </template>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="payConfigClose">取 消</el-button>
    <el-button type="primary" @click="submitPayConfig" :loading="btnLoading">确 认</el-button>
  </span>
      </el-dialog>

      <!--支付通道参数费率配置-->
       <el-dialog
    :close-on-click-modal="false"
        :title="currentDynamicTitle+'通道参数费率配置'"
        :visible.sync="payConfigFeeVisible"
        width="730px"
        :before-close="payConfigFeeClose">
        <div>


          <el-form ref="form" label-width="280px">
            <!--费率表单配置-->
            <div v-for="(item,index) in feeForm">
              <div v-for="(inputform,index) in  item.merchantPayComposeByTypeVOS">
                <el-form-item :label="item.name+inputform.name+'商户费率(%)'||''">
                  <el-input-number v-model="inputform.merchantFeeRate" :min="0.00" :max="1"
                                   :label="inputform.description">
                  </el-input-number>
                  <template v-if="inputform.merchantDescription">
                    <el-tooltip class="item" effect="light" :content="inputform.merchantDescription" placement="right">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </template>
                </el-form-item>
                <el-form-item :label="item.name+inputform.name+'官方费率(%)'||''">
                  <el-input-number v-model="inputform.officialFeeRate" :min="0.00" :max="1"
                                   :label="inputform.description">
                  </el-input-number>
                  <template v-if="inputform.officialDescription">
                    <el-tooltip class="item" effect="light" :content="inputform.officialDescription" placement="right">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </template>
                </el-form-item>
                <el-divider></el-divider>
              </div>
            </div>

            <!--KEY配置-->
            <div v-for="(item,index) in configForm">
              <el-form-item :label="item.title||''">
                <el-input v-model="item.value" :placeholder="item.placeholder" class="dym-input">
                </el-input>
                <template v-if="item.placeholder">
                  <el-tooltip class="item" effect="light" :content="item.placeholder" placement="right">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </template>
              </el-form-item>
            </div>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <!--操作-->
    <el-button @click="payConfigFeeClose">取 消</el-button>
    <el-button type="primary" @click="savePayConfig" :loading="btnLoading">确 定</el-button>
  </span>
      </el-dialog>
      <!--支付宝商户授权扫码-->
       <el-dialog
    :close-on-click-modal="false"
        title="支付宝商户授权扫码"
        :visible.sync="aliAuthVisable"
        width="384px"
        center>
        <div class="qr-box">
          <canvas id="qrcode"></canvas>
        </div>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
      <!--富友-->
       <el-dialog
    :close-on-click-modal="false"
        title="富友微信配置"
        :visible.sync="fyWxVisible"
        width="585px"
        :before-close="fyWxConfigClose">
        <div>
          <el-radio-group v-model="fyWxConfigTabs" @change="changeFyWxConfigTabs">
            <el-radio :label="0">配置一</el-radio>
            <el-radio :label="1">配置二</el-radio>
            <el-radio :label="2">配置三</el-radio>
            <el-radio :label="3">配置四</el-radio>
            <el-radio :label="4">配置五</el-radio>
          </el-radio-group>
          <el-divider content-position="left">以下设置微信参数配置</el-divider>
          <el-form :model="fyWxForm" ref="fyWxForm" :rules="fyWxFormRules" label-width="180px"
                   style="margin-top: 20px">
            <el-form-item label="JSAPI支付授权目录" prop="jsapiPath">
              <el-input v-model="fyWxForm.jsapiPath" :disabled="disableMode"></el-input>
            </el-form-item>
            <el-form-item label="子商户SubAPPID" prop="subAppid">
              <el-input v-model="fyWxForm.subAppid" :disabled="disableMode"></el-input>
            </el-form-item>
            <el-form-item label="子商户推荐关注公众账号" prop="subscribeAppid">
              <el-input v-model="fyWxForm.subscribeAppid" :disabled="disableMode"></el-input>
            </el-form-item>
          </el-form>

          <div class="save-btn-box">


            <el-button type="primary" v-show="!disableMode" class="save-btn" @click="saveBeforeCheck"
                       :loading="saveLoading">
              保 存
            </el-button>


            <el-button v-if="fyWxForm.id!=''" v-show="!disableMode" type="primary" class="save-btn"
                       @click="setFuiouWxConfigBefore"
                       :loading="setLoading">
              提交至富友
            </el-button>

            <span v-show="disableMode" class="btn-tips">该配置已提交至富友，无法修改</span>
            <el-button class="save-btn"
                       type="danger" v-show="disableMode"
                       @click="confirmDel" :loading="delLoading">
              删 除
            </el-button>


          </div>
          <div class="save-tips">
            单击 <span class="blue">“保存”</span>按钮仅保存当前一组配置，请在提示“保存成功”后再进行下一组配置。
            <br>
            <span class="blue">“提交至富友”</span>同理，仅提交当前一组配置。
          </div>

        </div>
        <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="fyWxConfigClose">退出配置</el-button>-->
        <!--</span>-->
      </el-dialog>

      <!--富友预授权-->
       <el-dialog
    :close-on-click-modal="false"
        title="富友预授权配置"
        :visible.sync="fyPreVisible"
        width="576px"
        :before-close="fyPreClose">
        <div>
          <el-form :model="fyPreForm" :rules="fyPreFormRules" ref="fyPreForm" label-width="180px">
            <!--是否开通预授权支付宝-->
            <el-form-item label="是否开通预授权支付宝：">
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="fyPreForm.aliPrePay">开通
              </el-checkbox>
            </el-form-item>
            <!--支付宝费率-->


            <el-form-item label="预授权支付宝扣率模板：" prop="aliPreSetCd" v-if="fyPreForm.aliPrePay==1">
              <el-select v-model="fyPreForm.aliPreSetCd" filterable placeholder="请选择或搜索扣率模板">
                <el-option
                  v-for="item in cdSelect"
                  :key="item.TEMPLATE_CD"
                  :label="item.TEMPLATE_NM"
                  :value="item.TEMPLATE_CD">
                  <span style="float: left">{{item.TEMPLATE_NM }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.TEMPLATE_CD }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <!--是否开通预授权微信-->
            <el-form-item label="是否开通预授权微信：">
              <el-checkbox
                :true-label="1"
                :false-label="0"
                v-model="fyPreForm.wechatPrePay">开通
              </el-checkbox>
            </el-form-item>
            <!--微信费率-->
            <el-form-item label="预授权微信扣率模板：" prop="wechatPreSetCd" v-if="fyPreForm.wechatPrePay==1">
              <el-select v-model="fyPreForm.wechatPreSetCd" filterable placeholder="请选择或搜索扣率模板">
                <el-option
                  v-for="item in cdSelect"
                  :key="item.TEMPLATE_CD"
                  :label="item.TEMPLATE_NM"
                  :value="item.TEMPLATE_CD">
                  <span style="float: left">{{ item.TEMPLATE_NM }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px;padding:0 5px ">{{ item.TEMPLATE_CD }}</span>
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <div class="save-tips">
            你的每次修改都会覆盖上一次的配置，请谨慎操作!
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="fyPreClose">取 消</el-button>
    <el-button type="primary" @click="saveFyPreConfigBefore" :loading="saveLoading">提 交</el-button>
  </span>
      </el-dialog>

      <!--乐刷费率-->
       <el-dialog
    :close-on-click-modal="false"
        title="乐刷费率配置"
        :visible.sync="lsFeeConfigVisible"
        width="450px"
        :before-close="lsFeeConfigClose">
        <div>
          <el-form ref="lsFeeConfigForm" :model="lsFeeConfigForm" label-width="130px">
            <el-form-item label="微信费率：">万分之
              <el-input-number v-model="lsFeeConfigForm.wxRate"
                               controls-position="right" :precision="0" :step="1" :min="0" :max="1000"
                               label="微信费率">

              </el-input-number>
            </el-form-item>
            <el-form-item label="支付宝费率：">万分之
              <el-input-number v-model="lsFeeConfigForm.aliRate"
                               controls-position="right" :precision="0" :step="1" :min="0" :max="1000"
                               label="支付宝费率">

              </el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="lsFeeConfigClose">取 消</el-button>
    <el-button type="primary" @click="setLsFeeConfig" :loading="btnLoading">确 定</el-button>
  </span>
      </el-dialog>

      <!--乐刷 授权目录-->
       <el-dialog
    :close-on-click-modal="false"
        title="乐刷授权目录配置"
        :visible.sync="lsPayConfigVisible"
        width="570px"
        :before-close="lsPayConfigClose">
        <div>

          <el-form ref="lsPayConfigForm" :model="lsPayConfigForm" label-width="130px">
            <el-form-item label="配置项：">
              <el-radio-group v-model="lsPayConfigForm.configType" @change="curConfigTypeIndex">
                <el-radio-button :label="1">绑定APPID</el-radio-button>
                <el-radio-button :label="2">推荐关注APPID</el-radio-button>
                <el-radio-button :label="3">授权目录</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="绑定APPID:" v-if="lsPayConfigForm.configType===1">
              <el-input v-model.trim="lsPayConfigForm.subAppid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="推荐关注APPID:" v-if="lsPayConfigForm.configType===2">
              <el-input v-model.trim="lsPayConfigForm.subscribeAppid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="授权目录:" v-if="lsPayConfigForm.configType===3">
              <el-input v-model.trim="lsPayConfigForm.jsapiPath" class="pay-con-input"></el-input>
            </el-form-item>

          </el-form>
          <div class="mid-btn">
            当前配置项剩余修改次数:
            <span v-if="lsPayConfigForm.configType===1">{{lsPayConfigRT.subAppidNum||0}}</span>
            <span v-if="lsPayConfigForm.configType===2">{{lsPayConfigRT.subscribeAppidNum||0}}</span>
            <span v-if="lsPayConfigForm.configType===3">{{lsPayConfigRT.jsapiPathNum||0}}</span>
          </div>

          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="saveLsCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="lsPayConfigClose">退 出</el-button>
  </span>
      </el-dialog>


       <el-dialog
    :close-on-click-modal="false"
        title="传化费率配置"
        :visible.sync="xlsFeeConfigVisible"
        width="450px"
        :before-close="xlsFeeConfigClose">
        <div>
          <el-form ref="xlsFeeConfigForm" :model="xlsFeeConfigForm" label-width="130px">
            <el-form-item label="微信扫码费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.WECHAT_SCAN"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="微信扫码费率">
              </el-input-number>
            </el-form-item>
            <el-form-item label="微信公众号费率：">千分之
            <el-input-number v-model="xlsFeeConfigForm.WECHAT_MP"
                             controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                             label="微信公众号费率）">

            </el-input-number>
          </el-form-item>
            <el-form-item label="微信刷卡费率费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.WECHAT_POS"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="微信刷卡费率费率）">

              </el-input-number>
            </el-form-item>
            <el-form-item label="微信小程序费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.WECHAT_MINIAPP"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="微信小程序费率">

              </el-input-number>
            </el-form-item>
            <el-form-item label="支付宝扫码费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.ALIPAY_SCAN"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="支付宝扫码费率">

              </el-input-number>
            </el-form-item>
            <el-form-item label="支付宝生活号费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.ALIPAY_MP"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="支付宝生活号费率">

              </el-input-number>
            </el-form-item>
            <el-form-item label="支付宝刷卡费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.ALIPAY_POS"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="支付宝刷卡费率">

              </el-input-number>
            </el-form-item>

            <el-form-item label="银联扫码费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.UNIONPAY_SCAN	"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="银联扫码费率">

              </el-input-number>
            </el-form-item>

            <el-form-item label="银联JS支付费率：">千分之
              <el-input-number v-model="xlsFeeConfigForm.UNIONPAY_JS"
                               controls-position="right" :precision="1" :step="1" :min="0" :max="1000"
                               label="银联JS支付费率">

              </el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="xlsFeeConfigClose">取 消</el-button>
    <el-button type="primary" @click="setXlsFeeConfig" :loading="btnLoading">确 定</el-button>
  </span>
      </el-dialog>

       <el-dialog
    :close-on-click-modal="false"
        title="传化授权目录配置"
        :visible.sync="xlsPayConfigVisible"
        width="570px"
        :before-close="xlsPayConfigClose">
        <div>

          <el-form ref="xlsPayConfigForm" :model="xlsPayConfigForm" label-width="130px">
            <el-form-item label="授权目录:" >
              <el-input v-model.trim="xlsPayConfigForm.jsapi_path" class="pay-con-input"></el-input>
            </el-form-item>
          </el-form>
          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="saveXlsCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="xlsPayConfigClose">退 出</el-button>
  </span>
      </el-dialog>

      <!--合利宝开通产品-->
       <el-dialog
        title="合利宝开通产品"
        :visible.sync="hlbVisible"
        :close-on-click-modal="false"
        :fullscreen="false"
        width="600px"
        :before-close="hlbClose">
        <div>
          <el-tabs v-model="hlb_Tabs" :stretch="true" :tab-position="hlb_Position">

            <el-tab-pane label="扫码产品" name="1">
              <!--标准表单-->
              <el-form :model="hlb_productForm" :rules="hlb_product_rule" ref="hlb_productForm" label-suffix="："
                       label-width="150px"
                       size="medium">
                <el-form-item>
                  <span style="font-size: 13px;color: gray">完整选择参数后可以回显先前的配置</span>

                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                  <el-select v-model="hlb_productForm.payType"
                             @change="getProducrFee"
                             clearable
                             placeholder="请选择">
                    <el-option
                      v-for="item in hlb_payType_Option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="客户端类型" prop="appPayType">
                  <el-select v-model="hlb_productForm.appPayType"
                             @change="getProducrFee"
                             clearable
                             placeholder="请选择">
                    <el-option
                      v-for="item in hlb_appPayType_Option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="费率模式" prop="appFeeMode">
                  <el-select v-model="hlb_productForm.appFeeMode"
                             @change="getProducrFee"
                             placeholder="请选择">
                    <el-option
                      v-for="item in hlb_appFeeMode_Option"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="费率类型" prop="feePurpose">
                  <el-select v-model="hlb_productForm.feePurpose"
                             @change="getProducrFee"
                             placeholder="请选择">
                    <el-option
                      v-for="item in hlb_feePurpose_Option"
                      :key="item.value"
                      :label="item.label"
                      :disabled="item.disabled"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


                <!--默认模式表单-->
                <div v-if="hlb_productForm.appFeeMode==='DEFAULT'">
                  <el-form-item label="费率" prop="value">
                    <el-input-number v-model="hlb_productForm.value" controls-position="right" :step="0.01"
                                     :precision="2"
                                     :min="0" :max="100"></el-input-number>
                    <span>&nbsp%</span>
                  </el-form-item>

                  <el-form-item label="最低费率金额" prop="minFee">
                    <el-input-number v-model="hlb_productForm.minFee" controls-position="right" :step="0.01"
                                     :precision="2"
                                     :min="0" :max="100000000"></el-input-number>
                    <span>&nbsp元</span>
                  </el-form-item>
                </div>
              </el-form>
              <!--分段模式表单-->
              <el-form ref="hlb_range_fee" :model="hlb_range_fee" label-suffix="："
                       size="small"
                       label-width="150px">
                <div v-if="hlb_productForm.appFeeMode==='RANGE'">
                  <!--数据：hlb_range_fee.form-->
                  <!--prop:'form.'+index+'.data'-->
                  <div v-for="(item,index) in hlb_range_fee.form" :key="index">
                    <el-divider>第{{index+1}}组配置 开始</el-divider>
                    <el-form-item label="开始费率区间值"
                                  :prop="'form.'+index+'.start'"
                                  :rules="{required: true, message: '开始费率区间值不能为空', trigger: 'blur'}">
                      <el-input-number v-model="item.start" controls-position="right" :step="1" :precision="2" :min="0"
                                       :max="100000000"></el-input-number>
                      <span>&nbsp元（闭区间）</span>
                    </el-form-item>
                    <el-form-item label="结束费率区间值"
                                  :prop="'form.'+index+'.end'"
                                  :rules="{required: true, message: '结束费率区间值不能为空', trigger: 'blur'}">
                      <el-input-number v-model="item.end" controls-position="right" :step="1" :precision="2" :min="0"
                                       :max="100000000"></el-input-number>
                      <span>&nbsp元（闭区间）</span>
                    </el-form-item>
                    <el-form-item label="费率值"
                                  :prop="'form.'+index+'.fee'"
                                  :rules="{required: true, message: '费率值不能为空', trigger: 'blur'}">
                      <el-input-number v-model="item.fee" controls-position="right" :step="0.01" :precision="2" :min="0"
                                       :max="10000000000"></el-input-number>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="最低费率值"
                                  :prop="'form.'+index+'.minFee'"
                                  :rules="{required: true, message: '最低费率值不能为空', trigger: 'blur'}">
                      <el-input-number v-model="item.minFee" controls-position="right" :step="0.01" :precision="2"
                                       :min="0"
                                       :max="10000000000"></el-input-number>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="最高费率金额"
                                  :prop="'form.'+index+'.maxFee'"
                                  :rules="{required: true, message: '最高费率金额不能为空', trigger: 'blur'}">
                      <el-input-number v-model="item.maxFee" controls-position="right" :step="0.01" :precision="2"
                                       :min="0"
                                       :max="10000000000"></el-input-number>
                      <span></span>
                    </el-form-item>
                    <el-form-item label="计算类型"
                                  :prop="'form.'+index+'.calcType'"
                                  :rules="{required: true, message: '请选择计算类型', trigger: 'change'}">
                      <el-select v-model="item.calcType" placeholder="请选择计算类型">
                        <el-option
                          v-for="ix in hlb_CalcType_Option"
                          :key="ix.value"
                          :label="ix.label"
                          :value="ix.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型"
                                  :prop="'form.'+index+'.onlineCardType'"
                                  :rules="{required: true, message: '请选择卡类型', trigger: 'change'}">
                      <el-select v-model="item.onlineCardType" placeholder="请选择卡类型">
                        <el-option
                          v-for="ix in hlb_onlineCardType_Option"
                          :key="ix.value"
                          :label="ix.label"
                          :value="ix.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-button v-show="hlb_range_fee.length-1!==0" type="text"
                                 @click="hlb_delete_configGroup(index)">删除此组
                      </el-button>
                    </el-form-item>
                    <el-divider v-if="index==hlb_range_fee.length-1">第{{index+1}}组配置 结束</el-divider>
                  </div>

                  <div>
                    <el-button type="primary" @click="hlb_add_configGroup">增加配置组</el-button>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="结算产品" name="2">
              <el-form :model="hlb_settlementForm" :rules="hlb_settlementFormRules" ref="hlb_settlementForm"
                       label-width="150px" size="medium" label-suffix="：">
                <el-form-item>
                  <span style="font-size: 13px;color: gray">正在开通结算产品</span>
                </el-form-item>
                <el-form-item label="计算类型" prop="calcType">
                  <el-select v-model="hlb_settlementForm.calcType"
                             @change="checkHlbAccountConfig"
                             clearable placeholder="请选择计算类型">
                    <el-option
                      v-for="ix in hlb_CalcType_Option"
                      :key="ix.value"
                      :label="ix.label"
                      :value="ix.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="资金周期" prop="settlementPeriod">
                  <el-select v-model="hlb_settlementForm.settlementPeriod"
                             @change="checkHlbAccountConfig"
                             placeholder="请选择资金周期">
                    <el-option
                      v-for="ix in hlb_moneyPeriod_Option"
                      :key="ix.value"
                      :label="ix.label"
                      :value="ix.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <!--<el-form-item label="账户属性">-->
                <!--<el-select v-model="hlb_settlementForm.settleBankType" placeholder="请选择账户属性">-->
                <!--<el-option-->
                <!--v-for="ix in hlb_settleBankType_Option"-->
                <!--:key="ix.value"-->
                <!--:label="ix.label"-->
                <!--:value="ix.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->

                <el-form-item label="费率" prop="value">
                  <el-input-number v-model="hlb_settlementForm.value" :min="0"
                                   :max="hlb_settlementForm.calcType==='SINGLE'?1000000000:100" :precision="2"
                                   :step="0.01"></el-input-number>
                  <span>&nbsp{{hlb_settlementForm.calcType==='SINGLE'?'元':'%'}}</span>
                </el-form-item>

                <el-form-item label="浮动值" prop="floating">
                  <el-input-number v-model="hlb_settlementForm.floating" :min="0" :max="100" :precision="2"
                                   :step="0.01"></el-input-number>
                  <span>&nbsp%</span>
                </el-form-item>

                <el-form-item label="最低费率金额" prop="minFee">
                  <el-input-number v-model="hlb_settlementForm.minFee" :min="0" :max="100000000" :precision="2"
                                   :step="1"></el-input-number>
                  <span>&nbsp元</span>
                </el-form-item>

              </el-form>
            </el-tab-pane>
          </el-tabs>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="hlbClose">取 消</el-button>
    <el-button type="primary" :loading="btnLoading" @click="hlb_save_before">保 存</el-button>
  </span>
      </el-dialog>

      <!--合利宝授权目录-->
       <el-dialog
        title="合利宝授权目录配置"
        :visible.sync="authDirVisible"
        :close-on-click-modal="false"
        width="666px"
        :before-close="authDirClose">

        <div>
          <el-form :model="authDirForm"
                   ref="authDirForm" :rules="authDirFormRules" label-suffix="："
                   label-width="100px">
            <el-form-item label="关注公众号" prop="subscribeAppId">
              <el-input v-model.trim="authDirForm.subscribeAppId" placeholder="关注公众号，与关注小程序列表二选一"
                        class="hlb-auth-input-width"></el-input>

            </el-form-item>

            <el-form-item label="关注小程序" prop="receiptAppId">
              <el-input v-model.trim="authDirForm.receiptAppId" placeholder="关注小程序，与关注公众号列表二选一"
                        class="hlb-auth-input-width"></el-input>
            </el-form-item>

            <el-form-item label="支付公众号" prop="appId">
              <el-input v-model.trim="authDirForm.appId" placeholder="支付公众号"
                        class="hlb-auth-input-width"></el-input>
            </el-form-item>


            <el-form-item label="授权目录" prop="authPayDir">
              <el-input v-model.trim="authDirForm.authPayDir" placeholder="授权目录"
                        class="hlb-auth-input-width"></el-input>
            </el-form-item>

            <el-form-item label="报备类型">
              <el-switch
                v-model="authDirForm.applyType"
                active-text="蓝海计划"
                inactive-text="无"
                active-value="BlueOcean"
                inactive-value="">
              </el-switch>
            </el-form-item>


          </el-form>

          <div style="padding: 20px;">
            <p v-if="authDirOthers.authPayDir2">授权目录配置记录</p>
            <p v-for="(v,k,i) in authDirOthers">
              <span v-if="v!==''&&v!==null">{{i}}:{{v}}</span>
            </p>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
      <el-button @click="hlbAuthDirAfterOpen" v-if="hlbAuthDirAfterSwitch" style="float: left">配置新授权目录</el-button>
      <el-button @click="hlnAuthStatus" v-if="hlbAuthDirAfterSwitch" style="float: left">授权目录状态</el-button>
    <el-button @click="authDirClose">取 消</el-button>
    <el-button type="primary" @click="savetHlbPayConfigBefore" :loading="btnLoading">保 存</el-button>
  </span>
      </el-dialog>

      <!--合利宝后增授权目录-->
       <el-dialog
        title="合利宝后增授权目录"
        :visible.sync="hlbAuthDirAfterVisible"
        :close-on-click-modal="false"
        width="666px"
        :before-close="hlbAuthDirAfterClose">
        <div>
          <el-form :model="hlbAuthDirAfterForm" ref="hlbAuthDirAfterForm"
                   label-width="140px" label-suffix="："
          >
            <el-form-item label="授权目录" prop="authPayDir">
              <el-input v-model.trim="hlbAuthDirAfterForm.authPayDir" placeholder="填写授权目录，并以/结尾"></el-input>
            </el-form-item>
            <el-form-item label="微信渠道子商户号" prop="subMerchantNo">
              <el-input v-model.trim="hlbAuthDirAfterForm.subMerchantNo" placeholder="微信渠道子商户号"></el-input>
            </el-form-item>

          </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="hlbAuthDirAfterClose">取 消</el-button>
    <el-button type="primary" @click="addtHlbPayConfigAuthDirBefore">提 交</el-button>
  </span>
      </el-dialog>

       <el-dialog
    :close-on-click-modal="false"
        title="配置"
        :visible.sync="xryxConfigVisible"
        width="570px"
        :before-close="xryxConfigClose">
        <div>
          <el-form ref="lsPayConfigForm" :model="xryxConfigForm" label-width="130px">

          <el-form-item label="配置项：">
            <el-radio-group v-model="xryxConfigForm.configType" >
              <el-radio-button :label="1">绑定APPID</el-radio-button>
              <el-radio-button :label="2">推荐关注APPID</el-radio-button>
              <el-radio-button :label="3">授权目录</el-radio-button>
            </el-radio-group>
          </el-form-item>

            <el-form-item label="appid:" v-if="xryxConfigForm.configType===1">
              <el-input v-model.trim="xryxConfigForm.subAppid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="appid:" v-if="xryxConfigForm.configType===2">
              <el-input v-model.trim="xryxConfigForm.subAppid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="关注appid:" v-if="xryxConfigForm.configType===2">
              <el-input v-model.trim="xryxConfigForm.subscribeAppid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="授权目录:" v-if="xryxConfigForm.configType===3">
              <el-input v-model.trim="xryxConfigForm.path" class="pay-con-input"></el-input>
            </el-form-item>
          </el-form>

          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="saveXryxCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="xryxConfigClose">退 出</el-button>
    </span>
      </el-dialog>


<!--聪明付-->
       <el-dialog
    :close-on-click-modal="false"
        title="配置"
        :visible.sync="cmfConfigVisible"
        width="570px"
        :before-close="cmfConfigClose">
        <div>
          <el-form ref="lsPayConfigForm" :model="cmfConfigForm" label-width="130px">
            <el-form-item label="配置项：">
              <el-radio-group v-model="cmfConfigForm.configType" >
                <el-radio-button :label="1">绑定APPID</el-radio-button>
                <el-radio-button :label="2">推荐关注APPID</el-radio-button>
                <el-radio-button :label="3">授权目录</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===1">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="关注appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.subscribe_appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="授权目录:" v-if="cmfConfigForm.configType===3">
              <el-input v-model.trim="cmfConfigForm.auth_path" class="pay-con-input"></el-input>
            </el-form-item>

          </el-form>
          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="saveCmfCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cmfConfigClose">退 出</el-button>
    </span>
      </el-dialog>


       <el-dialog
    :close-on-click-modal="false"
        title="配置"
        :visible.sync="xhcmfConfigVisible"
        width="570px"
        :before-close="xhcmfConfigClose">
        <div>
          <el-form ref="lsPayConfigForm" :model="cmfConfigForm" label-width="130px">
            <el-form-item label="配置项：">
              <el-radio-group v-model="cmfConfigForm.configType" >
                <el-radio-button :label="1">绑定APPID</el-radio-button>
                <el-radio-button :label="2">推荐关注APPID</el-radio-button>
                <el-radio-button :label="3">授权目录</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===1">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="关注appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.subscribe_appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="授权目录:" v-if="cmfConfigForm.configType===3">
              <el-input v-model.trim="cmfConfigForm.auth_path" class="pay-con-input"></el-input>
            </el-form-item>

          </el-form>
          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="xhsaveCmfCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="xhcmfConfigClose">退 出</el-button>
    </span>
      </el-dialog>


       <el-dialog
    :close-on-click-modal="false"
        title="配置"
        :visible.sync="hkcmfConfigVisible"
        width="570px"
        :before-close="hkcmfConfigClose">
        <div>
          <el-form ref="lsPayConfigForm" :model="cmfConfigForm" label-width="130px">
            <el-form-item label="配置项：">
              <el-radio-group v-model="cmfConfigForm.configType" >
                <el-radio-button :label="1">绑定APPID</el-radio-button>
                <el-radio-button :label="2">推荐关注APPID</el-radio-button>
                <el-radio-button :label="3">授权目录</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===1">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="特约商户appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="关注appid:" v-if="cmfConfigForm.configType===2">
              <el-input v-model.trim="cmfConfigForm.subscribe_appid" class="pay-con-input"></el-input>
            </el-form-item>
            <el-form-item label="授权目录:" v-if="cmfConfigForm.configType===3">
              <el-input v-model.trim="cmfConfigForm.auth_path" class="pay-con-input"></el-input>
            </el-form-item>

          </el-form>
          <div class="mid-btn">
            <br/>
            <el-button type="primary" plain @click="hksaveCmfCurConfigBefore" :loading="btnLoading">保存当前配置项</el-button>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="hkcmfConfigClose">退 出</el-button>
    </span>
      </el-dialog>


    </div>

    <!--组件页-->
    <div>
      <div divName="审核修改" v-if="!verifyShow">
        <!--新增支付通道后放在此处-->
        <!--wxpay 微信-->
        <!--alipay 支付宝-->

        <alipay v-if="currentPayChannel==1"
                @next="submieSuccess"
                @rejest="rejectOpen"
                :mode="mode"
                :status="currentSignStatus"
                :payChannel="currentPayChannel||null"
                :payChannelName="currentPayChannelName||null">
        </alipay>

        <wxpay v-else-if="currentPayChannel==2"
               @next="submieSuccess"
               @rejest="rejectOpen"
               :mode="mode"
               :status="currentSignStatus"
               :payChannel="currentPayChannel||null"
               :payChannelName="currentPayChannelName||null">
        </wxpay>

        <hsf v-else-if="currentPayChannel==104"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </hsf>
        <hyb v-else-if="currentPayChannel==101"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </hyb>

        <yrm v-else-if="currentPayChannel==102"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </yrm>

        <tts v-else-if="currentPayChannel==103"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </tts>

        <fy v-else-if="currentPayChannel==105"
            @next="submieSuccess"
            @rejest="rejectOpen"
            :mode="mode"
            :status="currentSignStatus"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
        </fy>

        <leshua v-else-if="currentPayChannel==106"
                @next="submieSuccess"
                @rejest="rejectOpen"
                :mode="mode"
                :status="currentSignStatus"
                :payChannel="currentPayChannel||null"
                :payChannelName="currentPayChannelName||null">
        </leshua>

        <hlb v-else-if="currentPayChannel==107"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </hlb>

        <cmf v-else-if="currentPayChannel==108"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </cmf>
        <hk v-else-if="currentPayChannel==123"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </hk>

        <dx v-else-if="currentPayChannel==124"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </dx>


        <ryx v-else-if="currentPayChannel==125"
            @next="submieSuccess"
            @rejest="rejectOpen"
            :mode="mode"
            :status="currentSignStatus"
            :payChannel="currentPayChannel||null"
            :payChannelName="currentPayChannelName||null">
        </ryx>
        <xryx v-else-if="currentPayChannel==126"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </xryx>

        <hsq v-else-if="currentPayChannel==127"
              @next="submieSuccess"
              @rejest="rejectOpen"
              :mode="mode"
              :status="currentSignStatus"
              :payChannel="currentPayChannel||null"
              :payChannelName="currentPayChannelName||null">
        </hsq>

        <ys v-else-if="currentPayChannel==109"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </ys>


        <tl v-else-if="currentPayChannel==110"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </tl>

        <wxmd v-else-if="currentPayChannel==120"
              @next="submieSuccess"
              @rejest="rejectOpen"
              :mode="mode"
              :status="currentSignStatus"
              :payChannel="currentPayChannel||null"
              :payChannelName="currentPayChannelName||null">
        </wxmd>


        <xls v-else-if="currentPayChannel==121"
             @next="submieSuccess"
             @rejest="rejectOpen"
             :mode="mode"
             :status="currentSignStatus"
             :payChannel="currentPayChannel||null"
             :payChannelName="currentPayChannelName||null">
        </xls>
      </div>


    </div>
  </div>


</template>

<script>
  import QRCode from 'qrcode'
  import feecode from '@/assets/feeModel/feecode.json' //扣率数据

  import {
    findPayChannelConfig,
    getAliAuthUrl,
    getMerchantChannelList,
    submitAudit,
    getMerchantChannelChoice,
    saveMerchantChannelChoice,
    getMerchantChannelConfigFee,
    savePayConfigFee,
    getFuiouWxConfig,
    saveFuiouWxConfig,
    setFuiouWxConfig,
    delFuiouWxConfig,
    saveFuiouPreConfig,
    findFuiouPreConfig,
    findLsFeeConfig,
    setLsFeeConfig,
    findLsPayConfig,
    setLsPayConfig,
    findXlsFeeConfig,
    setXlsFeeConfig,
    findXlsPayConfig,
    setXlsPayConfig,
    setHlbPayConfig,
    checkHlbPayConfig,
    findHlbWxPub,
    savetHlbPayConfig,
    addtHlbPayConfigAuthDir,
    checkHlbAuthStatus,
    setHlbAccountConfig,
    xlsSignConfig,
    xlsOpenQueryjs,
    xlsOpenjs,
    checkHlbAccountConfig,
    searchmerchantwxappmsg,
    xhsearchmerchantwxappmsg,
    hksearchmerchantwxappmsg,
    setmerchantwxappmsg,
    xhsetmerchantwxappmsg,
    hksetmerchantwxappmsg,
    xryxSetpath
  } from '../../top/api/payChannelList'

  import alipay from '@/components/payIncomimg/views/alipay'
  import wxpay from '@/components/payIncomimg/views/wxpay'
  import hsf from '@/components/payIncomimg/views/hsf'
  import hyb from '@/components/payIncomimg/views/hyb'
  import xls from '@/components/payIncomimg/views/xls'
  import yrm from '@/components/payIncomimg/views/yrm'
  import tts from '@/components/payIncomimg/views/tts'
  import fy from '@/components/payIncomimg/views/fy'
  import leshua from '@/components/payIncomimg/views/leshua'
  import wxmd from '@/components/payIncomimg/views/wxmd'
  import hlb from '@/components/payIncomimg/views/hlb'
  import cmf from '@/components/payIncomimg/views/cmf'
  import ys from '@/components/payIncomimg/views/ys'
  import tl from '@/components/payIncomimg/views/tl'
  import hk from '@/components/payIncomimg/views/hk'
  import ryx from '@/components/payIncomimg/views/ryx'
  import dx from '@/components/payIncomimg/views/dx'
  import xryx from '@/components/payIncomimg/views/xryx'
  import hsq from '@/components/payIncomimg/views/hsq'

  import {mixins} from "../../../../components/mixins/mixins";

  export default {
    name: 'payChannelList',
    mixins: [mixins], //混入
    components: {alipay, wxpay, hsf, hyb, yrm, tts, fy, leshua, hlb, cmf, ys,tl,wxmd,xls,hk,ryx,dx,xryx,hsq}, //创建组件
    data() {
      return {

        btnLoading: false, //按钮锁定
        searchForm: {
          name: '',
        },
        id: '',//当前商户id

        tableData: [],

        rejectVisible: false,//驳回模态框
        currentData: {},
        rejectForm: {
          status: 0,
          payChannel: '',
          merchantId: '',
          reason: '',
          applyId: '',
        },

        aliAuthVisable: false,

        //支付通道配置
        payConfigVisible: false,
        payConfigData: [],
        payConfigEndbledData: [],
        activeName: '0',

        //审核修改
        verifyShow: true,//显示表格
        currentPayChannel: null, //当前渠道value
        currentPayChannelName: '', //当前渠道name
        currentSignStatus: 0,

        //确认提交
        SubmitPayChannelForm: {
          status: 3,
          payChannel: null,
          merchantId: '',
          reason: ''
        },

        //支付通道参数费率配置
        currentConfigPayChannel: '',
        payConfigFeeVisible: false,
        feeForm: [],
        configForm: [],
        currentDynamicTitle: '',
        payConfigFeeId: '',//当前动态表单ID

        //服务商修改
        mode: 'modify',


        //费率抽屉
        fee_drawer_visible: false,
        fee_drawer_title: '',
        fee_drawer_direction: 'rtl',
        fee_drawerData: [],

        xryxConfigVisible:false,
        //富友微信
        fyWxVisible: false,
        fyWxConfigGroup: [], //全部数据
        fyWxConfigTabs: 0,
        disableMode: false,
        saveLoading: false,
        setLoading: false,
        delLoading: false,
        fyWxForm: {
          id: '',
          jsapiPath: '',
          subAppid: '',
          subscribeAppid: '',
          merchantId: ''
        },
        fyWxFormRules: {
          jsapiPath: [
            {required: true, message: '请输入JSAPI支付授权目录', trigger: 'blur'},
          ],
          subAppid: [
            {required: true, message: '请输入子商户SubAPPID', trigger: 'blur'}
          ],
          subscribeAppid: [
            {required: true, message: '请输入子商户推荐关注公众账号', trigger: 'blur'}
          ],
        },

        //富友预授权
        fyPreVisible: false, //预授权模态框
        fyPreForm: {
          id: '',
          aliPrePay: 0, //是否开通预授权支付宝
          aliPreSetCd: '', //预授权支付宝扣率模板
          wechatPrePay: 0, //是否开通预授权微信
          wechatPreSetCd: '', //预授权微信扣率模板
          merchantId: '', //商户ID
        },
        fyPreFormRules: {
          aliPreSetCd: [
            {required: true, message: '请输入预授权支付宝扣率模板', trigger: 'change'},
          ],
          wechatPreSetCd: [
            {required: true, message: '请输入预授权微信扣率模板', trigger: 'change'}
          ]
        },
        cdSelect: feecode, //扣率模板

        //乐刷费率
        lsFeeConfigVisible: false,
        lsFeeConfigForm: {
          merchantId: '',
          wxRate: 0,
          aliRate: 0
        },

        //聪明付
        cmfConfigVisible: false,
        xhcmfConfigVisible: false,
        hkcmfConfigVisible: false,
        cmfConfigForm: {
          configType:1,
          merchantId: '',
          appid: '',  //1
          auth_path: '',  //2
          subscribe_appid: '' //3
        },

        //乐刷授权目录
        lsPayConfigVisible: false,
        lsPayConfigForm: {
          merchantId: '',
          configType: 1,
          subAppid: '',  //1
          subscribeAppid: '',  //2
          jsapiPath: '' //3
        },
        lsPayConfigRT: {
          subAppidNum: 5,
          subscribeAppidNum: 5,
          jsapiPathNum: 5,
        },//修改剩余次数
        curConfigTypeTime: 0,
        curConfigTypeLock: false,

        xlsFeeConfigVisible: false,
        xlsFeeConfigForm: {
          merchantId: '',
          WECHAT_POS: 0,
          WECHAT_SCAN: 0,
          WECHAT_MP: 0,
          WECHAT_MINIAPP: 0,
          ALIPAY_POS: 0,
          ALIPAY_SCAN: 0,
          ALIPAY_MP: 0,
          UNIONPAY_SCAN: 0,
          UNIONPAY_JS: 0,
        },

        xlsPayConfigVisible: false,
        xryxPayConfigVisible: false,
        xlsPayConfigForm: {
          merchantId: '',
          jsapi_path: '' //3
        },

        xryxConfigForm: {
          configType:1,
          merchantId: '',
          subAppid: '',  //1
          path: '',  //2
          subscribeAppid: '' //3
        },
        //合利宝
        hlbVisible: false,
        hlb_Position: 'left',
        hlb_Tabs: '1',
        hlb_productForm: {
          payType: '', //支付类型
          appPayType: '',//客户端类型
          appFeeMode: 'DEFAULT',
          feePurpose: 'DEFAULT',

          value: 0, //费率
          minFee: '', //最低费率
        },
        hlb_range_fee: {
          form: [
            {start: 0, end: 0, fee: 0, minFee: 0, maxFee: 0, calcType: '', onlineCardType: '',}
          ]
        },
        hlb_payType_Option: [
          {value: 'SWIPE', label: '刷卡'},
          {value: 'SCAN', label: '扫码'},
          {value: 'WAP', label: 'WAP'},
          {value: 'PUBLIC', label: '公众号支付'},
          {value: 'SDK', label: 'SDK'},
          {value: 'APPLET', label: '小程序'},
        ], //支付类型选项
        hlb_appPayType_Option: [
          {value: 'ALIPAY', label: '支付宝'},
          {value: 'WXPAY', label: '微信支付'},
          {value: 'UNIONPAY', label: '银联固码/聚合码'},
          {value: 'QQPAY', label: 'QQ钱包'},
          {value: 'JDPAY', label: '京东'},
          {value: 'UNIONPAY_ALL', label: '银联主被扫支付'},
        ], //客户端类型选项
        hlb_appFeeMode_Option: [
          {value: 'DEFAULT', label: '默认', disabled: false},
          {value: 'RANGE', label: '分段', disabled: false},
        ], //费率模式选项
        hlb_CalcType_Option: [
          {value: 'SINGLE', label: '单笔收费'},
          {value: 'RATIO', label: '比率收费'},
        ],
        hlb_onlineCardType_Option: [
          {value: 'DEBIT', label: '借记卡'},
          {value: 'CREDIT', label: '贷记卡'},
        ],
        hlb_feePurpose_Option: [
          {value: 'DEFAULT', label: '默认', disabled: false},
          {value: 'WAI_MEAL', label: '蓝海绿洲费率', disabled: false},
        ],
        hlb_product_rule: {
          payType: [
            {required: true, message: '必须选择支付类型', trigger: 'change'}
          ],
          appPayType: [
            {required: true, message: '必须选择客户端类型', trigger: 'change'}
          ],
          appFeeMode: [
            {required: true, message: '必须选择费率模式', trigger: 'change'}
          ],
          feePurpose: [
            {required: true, message: '必须选择费率类型', trigger: 'change'}
          ],
          value: [
            {required: true, message: '必须输入费率', trigger: 'blur'}
          ],
          minFee: [
            {required: true, message: '必须输入最低费率金额', trigger: 'blur'}
          ],
        },
        //合利宝结算产品
        hlb_settlementForm: {
          merchantId: '',//商户id
          calcType: '', //计算类型
          settlementPeriod: '', //资金周期
          // settleBankType: '', //账户属性
          value: 0, //费率
          floating: 0, //浮动值
          minFee: 0, //最低费率金额

        },
        hlb_settlementFormRules: {
          calcType: [
            {required: true, message: '必须选择计算类型', trigger: 'change'}
          ],
          settlementPeriod: [
            {required: true, message: '必须选择资金周期', trigger: 'change'}
          ],
          value: [
            {required: true, message: '必须输入费率', trigger: ['change', 'blur']}
          ],
          floating: [
            {required: true, message: '必须输入浮动值', trigger: ['change', 'blur']}
          ],
          minFee: [
            {required: true, message: '必须输入最低费率金额', trigger: ['change', 'blur']}
          ]
        },
        hlb_moneyPeriod_Option: [
          {value: 'T1', label: 'T1'},
          {value: 'D0', label: 'D0'},
        ],
        hlb_settleBankType_Option: [
          {value: 'TOPUBLIC', label: '对公结算'},
          {value: 'TOPRIVATE', label: '对私结算'},
        ],

        //合利宝授权目录
        authDirVisible: false,
        authDirForm: {
          merchantId: '',
          subscribeAppId: '',//关注公众号列表
          receiptAppId: '',//关注小程序列表
          appId: '',//支付公众号列表
          authPayDir: '',//授权目录
          applyType: '',//报备类型 BlueOcean 蓝海计划
        },
        authDirOthers: {
          authPayDir2: '',
          authPayDir3: '',
          authPayDir4: '',
          authPayDir5: '',
        },//其他授权目录
        authDirFormRules: {},
        // 合利宝后增授权目录
        hlbAuthDirAfterVisible: false,
        hlbAuthDirAfterSwitch: false,//是否显示增加授权目录
        hlbAuthDirAfterForm: {
          merchantId: '',
          authPayDir: '',
          subMerchantNo: ''
        },//单条授权目录
        hlbAuthDirAfterFormRule: {
          authPayDir: [
            {required: true, message: '必须填写授权目录，并以/结尾', trigger: 'blur'}
          ],
          subMerchantNo: [
            {required: true, message: '必须填写微信渠道子商户号', trigger: 'blur'}
          ],
        }
      }
    },
    watch: {
      payConfigData: {
        handler: function (nv, ov) {
          console.log(nv)
        },
        deep: true
      }
    },
    filters: {

      funcFil: function (val) {
        if (val === '' || val == null) {
          return '未知'
        }
        let txt = '';
        switch (parseInt(val)) {
          case 1:
            txt = '已启用';
            break;
          case 2:
            txt = '未启用';
            break
        }
        return txt
      },
      statusFil: function (val) {
        if (val === '' || val == null) {
          return '未知'
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
            break
        }
        return txt
      }
    },
    mounted() {

      //获取id
      this.id = this.$route.query.id;  //接收ID
      //获取列表
      this.getList()
    },
    methods: {

      aliAuth: function () {
        this.aliAuthVisable = true;

        let id = this.id;
        getAliAuthUrl(id).then(res => {
          let url = res.obj;
          let msg = document.getElementById('qrcode');
          // 将获取到的数据（url）画到msg（canvas）上
          QRCode.toCanvas(msg, url, function (error) {
            console.log(error)
          })
        }).catch(e => {

        })
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
          // this.tableData = data
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
       * 驳回
       */
      rejectMerchant: function (data) {
        console.log(1);
        this.rejectOpen(data)
      },

      /**
       * 驳回模态框打开
       */
      rejectOpen: function (applyid) {
        this.rejectForm.applyId = applyid;
        this.rejectVisible = true
      },

      /**
       * 驳回模态框关闭
       */
      rejectClose: function () {
        this.rejectVisible = false
      },
      /**
       * 提交驳回
       */
      submitReject: function () {
        submitAudit(this.rejectForm).then(res => {
          this.$message.success('提交成功');
          //驳回后立马退出
          this.rejectClose();
          this.verifyShow = true;
          //刷新列表
          this.getList()
        }).catch(e => {

        })
      },

      /**
       * 支付通道配置
       */
      payConfigOpen: function () {
        this.getPayConfigData();
        this.payConfigVisible = true
      },
      //获取该商户服务商配置
      getPayConfigData: function () {
        //需要商户id
        getMerchantChannelChoice(this.id).then(res => {
          let data = res.obj;
          this.payConfigData = data.configList; //目前值
          this.payConfigEndbledData = data.enableConfig; //选中值
          this.activeName = data.configList[0].selectItem.name;

          //回显选中值
          try {
            for (let i in  data.enableConfig) {
              //回显还是用,号区分
              let sel = data.enableConfig[i].split(',');
              console.log(sel);
              for (let j in this.payConfigData) {
                if (this.payConfigData[j].selectItem.value == sel[1]) {
                  for (let k in this.payConfigData[j].configSelectItemList) {
                    if (this.payConfigData[j].configSelectItemList[k].selectItem.value == sel[2]) {
                      for (let l in this.payConfigData[j].configSelectItemList[k].selectItemList) {
                        if (this.payConfigData[j].configSelectItemList[k].selectItemList[l].value == sel[0]) {
                          //切换成 -
                          this.$set(this.payConfigData[j].configSelectItemList[k], 'sel', (sel[0] + '-' + sel[1] + '-' + sel[2]))
                        }
                      }
                    }
                  }
                }
              }
            }
          } catch (e) {
            this.$message.error('数据获取异常，需要刷新重试' + e)

          }

        }).catch(e => {
        })
      },
      //模态框关闭
      payConfigClose: function () {
        this.payConfigVisible = false
      },
      //提交支付通道配置
      submitPayConfig: function () {
        let tmp = [];
        for (let j in this.payConfigData) {
          for (let k in this.payConfigData[j].configSelectItemList) {
            if (this.payConfigData[j].configSelectItemList[k].sel != '' && this.payConfigData[j].configSelectItemList[k].sel != undefined) {
              console.log(this.payConfigData[j].configSelectItemList[k].sel)
              tmp.push(this.payConfigData[j].configSelectItemList[k].sel)
            }
          }
        }
        console.log(tmp);
        //提交
        this.btnLoading = true;
        saveMerchantChannelChoice(this.id, tmp).then(res => {
          this.$message.success(res.msg);
          this.payConfigClose();
          //延时关闭
          setTimeout(() => {
            this.btnLoading = false
          }, 500)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 审核
       */
      setCurrentPayChannel: function (data) {
        this.mode = 'verify';
        console.log(data);
        this.verifyShow = false;
        this.currentSignStatus = data.signingStatus; //当前审核状态
        this.currentPayChannel = data.payChannel;
        this.currentPayChannelName = data.name;

        //驳回用
        this.rejectForm.status = 4;
        this.rejectForm.payChannel = data.payChannel;
        this.rejectForm.merchantId = this.id

      },

      /**
       * 开始修改
       */

      setCurrentPayChannelByModify: function (data) {
        this.mode = 'modify';
        this.verifyShow = false;
        this.currentSignStatus = data.signingStatus; //当前审核状态
        this.currentPayChannel = data.payChannel;
        this.currentPayChannelName = data.name
      },

      //审核组件提交成功后
      submieSuccess: function () {
        this.verifyShow = true;
        //刷新列表
        this.getList()
      },

      /**
       * 确认提交开通
       */
      checkSubmitPayChannel: function (data) {
        this.SubmitPayChannelForm.status = 3;
        this.SubmitPayChannelForm.payChannel = data.payChannel;
        this.SubmitPayChannelForm.merchantId = this.id;
        submitAudit(this.SubmitPayChannelForm).then(res => {
          this.$message.success('开通')
        }).catch(e => {

        })
      },

      /**
       * 支付通道参数费率配置
       */
      payConfigFeeClose: function () {
        this.payConfigFeeVisible = false
      },

      payConfigFeeOpen: function (data) {
        console.log(data);
        let id = data.payChannel;
        this.currentConfigPayChannel = data.payChannel; //记录当前payChannel
        this.currentDynamicTitle = data.name || '';
        getMerchantChannelConfigFee(id, this.id).then(res => {
          let data = res.obj;
          this.feeForm = data.payComposeList; //费率表单
          this.configForm = data.payConfigForm; //key表单
          this.payConfigFeeId = data.payConfigFormId //formId
        }).catch(e => {

        });
        //显示模态框
        this.payConfigFeeVisible = true
      },

      /**
       * 返回
       */
      goBack: function () {
        this.$router.go('-1') //返回上一层
      },

      /**
       *
       *
       */
      savePayConfig: function () {
        console.log(this.feeForm);
        let source = this.feeForm;
        let keySource = this.configForm;
        let tmpArr = [];
        //费率表单整理  []
        for (let i in source) {
          for (let j in source[i].merchantPayComposeByTypeVOS) {
            let obj = {};
            obj.id = source[i].merchantPayComposeByTypeVOS[j].id;
            obj.payType = source[i].merchantPayComposeByTypeVOS[j].payType;
            obj.payWay = source[i].payWay;
            obj.merchantFeeRate = (source[i].merchantPayComposeByTypeVOS[j].merchantFeeRate / 100).toFixed(4);
            obj.officialFeeRate = (source[i].merchantPayComposeByTypeVOS[j].officialFeeRate / 100).toFixed(4);
            tmpArr.push(obj)
          }
        }
        //key表单整理   {}
        let keyTemp = {};
        for (let i in keySource) {
          keyTemp[keySource[i].property] = keySource[i].value.trim();
        }
        keyTemp.id = this.payConfigFeeId;

        let feeForm = JSON.stringify(tmpArr);
        let conForm = JSON.stringify(keyTemp);
        let pcId = this.currentConfigPayChannel;
        let mid = this.id;

        this.btnLoading = true;
        savePayConfigFee(feeForm, conForm, pcId, mid).then(res => {
          this.$message.success(res.msg);
          this.getList();
          this.payConfigFeeClose();
          //延时关闭
          setTimeout(() => {
            this.btnLoading = false
          }, 500)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 富友 微信配置
       */
      fyWxConfig: function () {
        let id = this.id;
        getFuiouWxConfig(id).then(res => {
          let data = res.obj;
          if (data.length > 0) {
            this.fyWxConfigGroup = data;
            this.defaultDataSet(this.fyWxConfigTabs || 0)
          }
        }).catch(e => {

        });
        this.fyWxVisible = true
      },
      //关闭
      fyWxConfigClose: function () {
        this.fyWxConfigTabs = 0;
        this.fyWxVisible = false
      },
      //默认参数回显
      defaultDataSet: function (index) {
        let data = this.deepCopy(this.fyWxConfigGroup[index]);
        this.fyWxForm.id = data.id || '';
        this.fyWxForm.jsapiPath = data.jsapiPath;
        this.fyWxForm.subAppid = data.subAppid;
        this.fyWxForm.subscribeAppid = data.subscribeAppid;

        //1 unlock  2lock
        this.disableMode = data.status === 2 ? true : false

      },
      //切换配置项
      changeFyWxConfigTabs: function (e) {
        console.log(e);
        this.$refs['fyWxForm'].clearValidate();
        this.defaultDataSet(e)
      },


      saveBeforeCheck: function () {
        this.$refs['fyWxForm'].validate((valid) => {
          if (valid) {
            this.saveFuiouWxConfig()
          } else {
            this.$message.error('还有参数未设置，请完整填写。');
            return false;
          }
        });
      },

      //提交配置
      saveFuiouWxConfig: function () {
        this.saveLoading = true;
        let form = this.deepCopy(this.fyWxForm);
        form.merchantId = this.id; //商户id
        saveFuiouWxConfig(form).then(res => {
          this.$message.success('保存成功。');
          this.fyWxConfig();
          setTimeout(() => {
            this.saveLoading = false
          }, 500)
        }).catch(e => {
          this.saveLoading = false
        })
      },


      /**
       * 提交前确认
       */
      setFuiouWxConfigBefore: function () {
        this.$confirm('提交当前配置至富友(如有修改，请先保存再提交)', '提示', {
          confirmButtonText: '提交',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.setFuiouWxConfig() //发起提交
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      },

      /**
       * 提交配置至富友
       */
      setFuiouWxConfig: function () {
        let id = this.fyWxForm.id;
        if (id === '' || id == null || id == undefined || id == 0) {
          this.$message.error('还没有保存该项配置，无法提交至惠闪付！');
          return false
        }
        this.setLoading = true;
        setFuiouWxConfig(id).then(res => {

          this.$message.success('提交成功（配置项提交成功后无法修改，只能删除）');
          setTimeout(() => {
            this.setLoading = false;
            this.fyWxConfig();
          }, 500)

        }).catch(e => {
          this.setLoading = false
        })
      },

      /**
       * 删除
       */
      confirmDel: function () {
        let id = this.fyWxForm.id;
        if (id === '' || id == null || id == undefined || id == 0) {
          this.$message.error('找不到该配置项，无法删除！');
          return false
        }

        this.$confirm('删除该配置前，请先向富友提交删除该配置的工单。', '重要操作', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delFuiouWxConfig() //发起删除
        }).catch(() => {

        });
      },

      delFuiouWxConfig: function () {
        let id = this.fyWxForm.id;
        if (id === '' || id == null || id == undefined || id == 0) {
          this.$message.error('找不到该配置项，无法删除！');
          return false
        }
        this.delLoading = true;
        delFuiouWxConfig(id).then(res => {
          this.$message.success('删除成功。');
          setTimeout(() => {
            this.delLoading = false;
            this.fyWxConfig();
          }, 500)
        }).catch(e => {
          this.delLoading = false
        })
      },


      //富友预授权--------------------------------------
      //打开模态框
      fyPreConfigOpen: function () {
        this.getFuiouPreConfig();
        this.fyPreVisible = true //打开dialog
      },
      //关闭模态框
      fyPreClose: function () {
        //恢复
        this.fyPreForm.id = '';
        this.fyPreForm.aliPrePay = 0;
        this.fyPreForm.wechatPrePay = 0;
        this.fyPreForm.aliPreSetCd = '';
        this.fyPreForm.wechatPreSetCd = '';
        this.$refs['fyPreForm'].clearValidate();
        this.fyPreVisible = false
      },
      //获取之前的配置
      getFuiouPreConfig: function () {
        let mid = this.id;
        if (mid === '' || mid == null) {
          this.$message.error('id错误，无法获取配置');
          return
        }
        //发起查询
        findFuiouPreConfig(mid).then(res => {
          let data = res.obj;
          if (data != null) {
            //规则id
            this.fyPreForm.id = data.id;
            //支付宝
            if (data.aliPrePay == 1) {
              this.fyPreForm.aliPrePay = 1;
              this.fyPreForm.aliPreSetCd = data.aliPreSetCd
            }
            //微信
            if (data.wechatPrePay == 1) {
              this.fyPreForm.wechatPrePay = 1;
              this.fyPreForm.wechatPreSetCd = data.wechatPreSetCd
            }
          }

        }).catch(e => {

        })
      },


      //提交前确认
      saveFyPreConfigBefore: function () {
        this.$refs['fyPreForm'].validate((valid) => {
          if (valid) {
            this.saveFyPreConfig()
          } else {
            this.$message.error('还有希望开通的预授权扣率未选择。');
            return false;
          }
        });
      },
      //提交
      saveFyPreConfig: function () {
        this.fyPreForm.merchantId = this.id;
        if (this.fyPreForm.aliPrePay !== 1) {
          this.fyPreForm.aliPreSetCd = ''
        }
        if (this.fyPreForm.wechatPrePay !== 1) {
          this.fyPreForm.wechatPreSetCd = ''
        }
        console.log(this.fyPreForm);
        let form = this.fyPreForm;
        this.saveLoading = true; //lock btn
        saveFuiouPreConfig(form).then(res => {
          this.$message.success(res.msg || '成功');
          setTimeout(() => {
            this.saveLoading = false //unlock btn
          }, 300)
        }).catch(e => {
          this.saveLoading = false //unlock btn
        })
      },

      /**
       * 乐刷费率
       */
      //关闭模态框
      lsFeeConfigClose: function () {
        setTimeout(() => {
          this.lsFeeConfigForm = {
            merchantId: '',
            wxRate: 0,
            aliRate: 0,
          };
        }, 500);

        this.lsFeeConfigVisible = false
      },
      //获取数据并打开
      lsFeeConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        findLsFeeConfig(id).then(res => {
          let data = res.obj;
          this.lsFeeConfigForm.merchantId = id;
          if (data) {
            this.lsFeeConfigForm.wxRate = data.wxRate || 0;
            this.lsFeeConfigForm.aliRate = data.aliRate || 0
          }
          this.lsFeeConfigVisible = true
        }).catch(e => {

        })
      },
      //提交
      setLsFeeConfig: function () {
        let form = this.deepCopy(this.lsFeeConfigForm);
        if (form.merchantId === '' || form.merchantId == null) {
          this.$message.error('id错误');
          return false
        }
        this.btnLoading = true;
        setLsFeeConfig(form).then(res => {
          this.$message.success('提交成功');
          this.lsFeeConfigClose();
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 乐刷配置
       */
      lsPayConfigClose: function () {
        this.lsPayConfigVisible = false
      },
      lsPayConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.lsPayConfigForm, 'merchantId', id);

        findLsPayConfig(id).then(res => {
          let data = res.obj;
          // 值
          this.$set(this.lsPayConfigForm, 'subAppid', data.subAppid || '');
          this.$set(this.lsPayConfigForm, 'subscribeAppid', data.subscribeAppid || '');
          this.$set(this.lsPayConfigForm, 'jsapiPath', data.jsapiPath || '');
          // 次数
          this.$set(this.lsPayConfigRT, 'subAppidNum', data.subAppidNum || 0);
          this.$set(this.lsPayConfigRT, 'subscribeAppidNum', data.subscribeAppidNum || 0);
          this.$set(this.lsPayConfigRT, 'jsapiPathNum', data.jsapiPathNum || 0);
        }).catch(e => {

        });
        this.lsPayConfigVisible = true
      },
      saveLsCurConfigBefore: function () {
        this.$confirm(`提交成功后将会减少一次修改机会, 是否继续?`, '提示', {
          confirmButtonText: '确定保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起
          this.saveLsCurConfig()
        }).catch(() => {
          //取消
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });


      },
      saveLsCurConfig: function () {
        let form = this.deepCopy(this.lsPayConfigForm);
        let curIndex = form.configType; //获取当前配置项
        console.log(typeof curIndex, curIndex);
        //1：绑定APPID（支付）；2：推荐关注APPID；3：授权目录；
        if (curIndex === 1) {
          delete form.subscribeAppid;
          delete form.jsapiPath
        } else if (curIndex === 2) {
          delete form.subAppid;
          delete form.jsapiPath
        } else if (curIndex === 3) {
          delete form.subAppid;
          delete form.subscribeAppid
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }
        //发起
        this.btnLoading = true;
        setLsPayConfig(form).then(res => {
          this.$message.success('当前项配置成功，可以继续配置其他参数。');
          this.lsPayConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })

      },
      //获取下标
      curConfigTypeIndex: function () {
        let index = this.lsPayConfigForm.configType;
        if (index === 1) {
          this.curConfigTypeTime = this.lsPayConfigRT.subAppidNum
        } else if (index === 2) {
          this.curConfigTypeTime = this.lsPayConfigRT.subscribeAppidNum
        } else if (index === 3) {
          this.curConfigTypeTime = this.lsPayConfigRT.jsapiPathNum
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }


      },

      hkConfigClose: function () {
        this.xhcmfConfigVisible = false
      },
      hkConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.cmfConfigForm, 'merchantId', id);

        hksearchmerchantwxappmsg(id).then(res => {
          let data = res.obj;
          // 值
          let appids='';
          let subscribe_appids='';
          for ( var i = 0; i <data.appidList.length; i++){
            if(data.appidList[i].sub_appid!=null&&data.appidList[i].sub_appid!=''){
              appids+=data.appidList[i].sub_appid;
              appids+=";";
            }
            if(data.appidList[i].subscribe_appid!=null&&data.appidList[i].subscribe_appid!=''){
              subscribe_appids+=data.appidList[i].subscribe_appid;
              subscribe_appids+=";";
            }
          }
          this.$set(this.cmfConfigForm, 'appid', appids || '');
          this.$set(this.cmfConfigForm, 'auth_path', data.authList.join(";") || '');
          this.$set(this.cmfConfigForm, 'subscribe_appid', subscribe_appids|| '');
        }).catch(e => {

        });
        this.hkcmfConfigVisible = true
      },
      hksaveCmfCurConfigBefore: function () {
        this.hksaveCmfCurConfig()
      },
      hksaveCmfCurConfig: function () {
        let form = this.deepCopy(this.cmfConfigForm);
        let curIndex = form.configType; //获取当前配置项
        console.log(typeof curIndex, curIndex);
        //1：绑定APPID（支付）；2：推荐关注APPID；3：授权目录；
        if (curIndex === 1) {
          delete form.auth_path;
          delete form.subscribe_appid
        } else if (curIndex === 2) {
          delete form.auth_path;
          //    delete form.appid
        } else if (curIndex === 3) {
          delete form.subscribe_appid;
          delete form.appid
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }
        //发起
        this.btnLoading = true;
        hksetmerchantwxappmsg(form).then(res => {
          this.$message.success('当前项配置成功，可以继续配置其他参数。');
          this.hkcmfConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })

      },

      /**
       * cmf
       */
      xhConfigClose: function () {
        this.xhcmfConfigVisible = false
      },
      xhConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.cmfConfigForm, 'merchantId', id);

        xhsearchmerchantwxappmsg(id).then(res => {
          let data = res.obj;
          // 值
          let appids='';
          let subscribe_appids='';
          for ( var i = 0; i <data.appidList.length; i++){
            if(data.appidList[i].sub_appid!=null&&data.appidList[i].sub_appid!=''){
              appids+=data.appidList[i].sub_appid;
              appids+=";";
            }
            if(data.appidList[i].subscribe_appid!=null&&data.appidList[i].subscribe_appid!=''){
              subscribe_appids+=data.appidList[i].subscribe_appid;
              subscribe_appids+=";";
            }
          }
          this.$set(this.cmfConfigForm, 'appid', appids || '');
          this.$set(this.cmfConfigForm, 'auth_path', data.authList.join(";") || '');
          this.$set(this.cmfConfigForm, 'subscribe_appid', subscribe_appids|| '');
        }).catch(e => {

        });
        this.xhcmfConfigVisible = true
      },
      xhsaveCmfCurConfigBefore: function () {
          this.xhsaveCmfCurConfig()
      },
      xhsaveCmfCurConfig: function () {
        let form = this.deepCopy(this.cmfConfigForm);
        let curIndex = form.configType; //获取当前配置项
        console.log(typeof curIndex, curIndex);
        //1：绑定APPID（支付）；2：推荐关注APPID；3：授权目录；
        if (curIndex === 1) {
          delete form.auth_path;
          delete form.subscribe_appid
        } else if (curIndex === 2) {
          delete form.auth_path;
      //    delete form.appid
        } else if (curIndex === 3) {
          delete form.subscribe_appid;
          delete form.appid
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }
        //发起
        this.btnLoading = true;
        xhsetmerchantwxappmsg(form).then(res => {
          this.$message.success('当前项配置成功，可以继续配置其他参数。');
          this.xhcmfConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })

      },



      cmfConfigClose: function () {
        this.cmfConfigVisible = false
      },
      cmfConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.cmfConfigForm, 'merchantId', id);

        searchmerchantwxappmsg(id).then(res => {
          let data = res.obj;
          // 值
          let appids='';
          let subscribe_appids='';
          for ( var i = 0; i <data.appidList.length; i++){
            if(data.appidList[i].sub_appid!=null&&data.appidList[i].sub_appid!=''){
              appids+=data.appidList[i].sub_appid;
              appids+=";";
            }
            if(data.appidList[i].subscribe_appid!=null&&data.appidList[i].subscribe_appid!=''){
              subscribe_appids+=data.appidList[i].subscribe_appid;
              subscribe_appids+=";";
            }
          }
          this.$set(this.cmfConfigForm, 'appid', appids || '');
          this.$set(this.cmfConfigForm, 'auth_path', data.authList.join(";") || '');
          this.$set(this.cmfConfigForm, 'subscribe_appid', subscribe_appids|| '');
        }).catch(e => {

        });
        this.cmfConfigVisible = true
      },
      saveCmfCurConfigBefore: function () {
        this.saveCmfCurConfig()
      },
      saveCmfCurConfig: function () {
        let form = this.deepCopy(this.cmfConfigForm);
        let curIndex = form.configType; //获取当前配置项
        console.log(typeof curIndex, curIndex);
        //1：绑定APPID（支付）；2：推荐关注APPID；3：授权目录；
        if (curIndex === 1) {
          delete form.auth_path;
          delete form.subscribe_appid
        } else if (curIndex === 2) {
          delete form.auth_path;
          //    delete form.appid
        } else if (curIndex === 3) {
          delete form.subscribe_appid;
          delete form.appid
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }
        //发起
        this.btnLoading = true;
        setmerchantwxappmsg(form).then(res => {
          this.$message.success('当前项配置成功，可以继续配置其他参数。');
          this.cmfConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })

      },


      xryxConfigClose: function () {
        this.xryxConfigVisible = false
      },
      xryxConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.xryxConfigForm, 'merchantId', id);
        this.xryxConfigVisible = true
      },
      saveXryxCurConfigBefore: function () {
        this.saveXryxCurConfig()
      },
      saveXryxCurConfig: function () {
      //  let form = this.deepCopy(this.xryxConfigForm);
        let curIndex = this.xryxConfigForm.configType; //获取当前配置项
        //console.log(typeof curIndex, curIndex);
        //1：绑定APPID（支付）；2：推荐关注APPID；3：授权目录；
        if (curIndex === 1) {
          this.xryxConfigForm.path='';
          this.xryxConfigForm.subscribeAppid=''
        } else if (curIndex === 2) {
          this.xryxConfigForm.path='';
          //    delete form.appid
        } else if (curIndex === 3) {
          this.xryxConfigForm.subAppid='';
          this.xryxConfigForm.subscribeAppid=''
        } else {
          this.$message.error('你的选择无法继续，请刷新重试。');
          return false
        }

        this.btnLoading = true;
        xryxSetpath(this.xryxConfigForm.merchantId,this.xryxConfigForm.path,this.xryxConfigForm.subAppid,this.xryxConfigForm.subscribeAppid).then(res => {
          this.$message.success(res.msg);
          this.xryxConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })

      },




      /**
       * 费率抽屉
       */
      feeDrawerClose: function () {
        this.fee_drawer_title = '';
        this.fee_drawerData = [];
        this.fee_drawer_visible = false
      },

      feeDrawerOpen: function (row) {
        let data = row;

        let payChannel = data.payChannel;
        this.findPayChannelConfig(payChannel);
        this.fee_drawer_title = `${data.name} 费率设置详情`;
        this.fee_drawer_visible = true
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
       * 合利宝产品开通配置
       */

      hlbClose: function () {
        this.$refs['hlb_productForm'].resetFields();
        this.$refs['hlb_settlementForm'].resetFields();
        this.hlb_Tabs = '1'; //还原tabs
        this.hlbVisible = false
      },

      hlbOpen: function () {
        this.hlbVisible = true
      },

      //增加配置组
      hlb_add_configGroup: function () {
        let form_length = this.hlb_range_fee.form.length;
        if (form_length + 1 > 5) {
          this.$message.info('已达到最大组数，无法继续增加')
        } else {
          let obj = {start: 0, end: 0, fee: 0, minFee: 0, maxFee: 0, calcType: '', onlineCardType: '',};
          this.hlb_range_fee.form.push(obj)
        }
      },
      //删除配置组
      hlb_delete_configGroup: function (ix) {
        let form_length = this.hlb_range_fee.form.length;
        if (form_length - 1 <= 0) {
          this.$message.info('仅剩最后一组配置，无法继续删除')
        } else {
          this.hlb_range_fee.form.splice(ix, 1);
        }
      },

      //提交合利宝
      hlb_save_before: function () {
        let tabs = this.hlb_Tabs;
        console.log(tabs);
        if (tabs === '1') {
          this.hlb_submit_Scan_Before() //扫码
        } else if (tabs === '2') {
          this.hlb_submit_Account_Before() //结算
        } else {
          this.$message.error('你选了什么？')
        }
      },
      /**
       * 合利宝开通扫码产品 校验
       */
      hlb_submit_Scan_Before: function () {
        let form = this.deepCopy(this.hlb_productForm);
        let feeRange = '';
        //判断是否分段模式，如果是，则带上分段表单
        if (form.appFeeMode === 'RANGE') {
          feeRange = JSON.parse(JSON.stringify(this.hlb_range_fee.form));
        } else {
          feeRange = []
        }
        form.merchantId = this.id;
        console.log(form, feeRange);
        this.$refs['hlb_productForm'].validate((valid) => {
          if (valid) {
            if (form.appFeeMode === 'RANGE') {
              //检查分段
              this.$refs['hlb_range_fee'].validate((valid) => {
                if (valid) {
                  //不检查分段
                  this.hlb_submit_scan(form, feeRange)
                } else {
                  this.$message.error('分段还有未正确填写的内容');
                  return false;
                }
              });
            } else {
              //不检查分段
              this.hlb_submit_scan(form, feeRange)
            }
          } else {
            this.$message.error('还有未正确填写的内容');
            return false;
          }
        });
      },
      /**
       * 合利宝开通扫码产品
       */
      hlb_submit_scan: function (form, feeRange) {
        let jsonForm = JSON.stringify(form);
        let jsonfeeRangeForm = JSON.stringify(feeRange);
        this.btnLoading = true;
        setHlbPayConfig(jsonForm, jsonfeeRangeForm).then(res => {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 合利宝开通结算产品
       */
      hlb_submit_Account_Before: function () {
        this.$refs['hlb_settlementForm'].validate((valid) => {
          if (valid) {
            //通过校验
            this.hlb_submit_Account()
          } else {
            this.$message.error('还有未正确填写的内容。');
            return false;
          }
        });
      },

      hlb_submit_Account: function () {
        let form = JSON.parse(JSON.stringify(this.hlb_settlementForm));
        form.merchantId = this.id; //商户id
        this.btnLoading = true;
        setHlbAccountConfig(form).then(res => {
          this.$message.success(`${res.msg}`);
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      /**
       * 查询结算产品
       */
      checkHlbAccountConfig: function () {
        let form = this.deepCopy(this.hlb_settlementForm);
        delete form.value;
        delete form.minFee;
        delete form.floating;
        form.merchantId = this.id;
        let hce = this.ec;
        if (hce(form.calcType) && hce(form.settlementPeriod)) {
          checkHlbAccountConfig(form).then(res => {
            let raw = res.obj;

            if (raw) {
              let data = JSON.parse(raw);
              this.hlb_settlementForm.value = data.value || 0;
              this.hlb_settlementForm.floating = data.floating || 0;
              this.hlb_settlementForm.minFee = data.minFee || 0
            } else {
              this.hlb_settlementForm.value = 0;
              this.hlb_settlementForm.floating = 0;
              this.hlb_settlementForm.minFee = 0
            }


          }).catch(e => {

          })
        }


      },


      /**
       * 查询回显
       */
      getProducrFee: function () {
        let form = this.deepCopy(this.hlb_productForm);
        delete form.value;
        delete form.minFee;
        form.merchantId = this.id;
        let hce = this.ec;
        if (hce(form.payType) && hce(form.appPayType) && hce(form.appFeeMode) && hce(form.feePurpose)) {
          let jsonForm = JSON.stringify(form);
          checkHlbPayConfig(jsonForm).then(res => {
            //回显数据
            this.hlb_data_fee_review(res.obj)
          }).catch(e => {
            this.hlb_productForm.value = 0.00;
            this.hlb_productForm.minFee = 0.00
          })
        }

        // form.merchantId = this.id;
      },

      /**
       * 合利宝回填组合数据
       */
      hlb_data_fee_review: function (row) {
        console.log(row);
        if (row === null) {
          //填充0
          this.hlb_productForm.value = rowData.value || 0; //赋值费率
          this.hlb_productForm.minFee = rowData.minFee || 0 //复制最低金额
        } else {
          let rowData = JSON.parse(row); //解码JSON文件
          console.log(rowData);
          if (rowData.appFeeMode === 'RANGE' && rowData.feeRanges === undefined) { //range模式，但没数据
            console.log('无分段数据');
            this.hlb_range_fee.form = [{
              start: 0,
              end: 0,
              fee: 0,
              minFee: 0,
              maxFee: 0,
              calcType: '',
              onlineCardType: '',
            }] //重置动态表单
          } else if (rowData.appFeeMode === 'RANGE' && rowData.feeRanges) { //range模式，有数据
            console.log('有分段数据');
            this.hlb_range_fee.form = rowData.feeRanges //分段数据
          } else { //其他模式
            //数值无效则填充0
            this.hlb_productForm.value = rowData.value || 0; //赋值费率
            this.hlb_productForm.minFee = rowData.minFee || 0 //复制最低金额
          }
        }
      },


      /**
       * 合利宝授权目录配置关闭
       */
      authDirClose: function () {
        this.$refs['authDirForm'].resetFields();
        this.authDirVisible = false
      },

      /**
       * 合利宝授权目录配置打开
       */
      authDirOpen: function () {
        this.authDirOpenGetConfig();
        this.authDirVisible = true
      },

      authDirOpenGetConfig: function () {
        let id = this.id;
        findHlbWxPub(id).then(res => {
          let data = res.obj;
          this.authDirOpenGetConfigReview(data)
        }).catch(e => {

        })
      },
      authDirOpenGetConfigReview: function (row) {
        let data = row;
        this.authDirForm.subscribeAppId = data.subscribeAppId;
        this.authDirForm.receiptAppId = data.receiptAppId;
        this.authDirForm.appId = data.appId;
        this.authDirForm.authPayDir = data.authPayDir;
        this.authDirForm.applyType = data.applyType;

        if (this.ec(data.authPayDir)) {
          this.hlbAuthDirAfterSwitch = true
        }

        this.authDirOthers.authPayDir2 = data.authPayDir2 || '';
        this.authDirOthers.authPayDir3 = data.authPayDir3 || '';
        this.authDirOthers.authPayDir4 = data.authPayDir4 || '';
        this.authDirOthers.authPayDir5 = data.authPayDir5 || ''

      },


      /**
       * 发起保存
       */
      savetHlbPayConfigBefore: function () {
        this.savetHlbPayConfig()
      },

      savetHlbPayConfig: function () {
        let form = this.deepCopy(this.authDirForm);
        form.merchantId = this.id;

        this.btnLoading = true;
        savetHlbPayConfig(form).then(res => {
          this.authDirClose();

          setTimeout(() => {
            this.btnLoading = false
          }, 500)

        }).catch(e => {

          this.btnLoading = false


        })
      },

      /**
       * 合利宝后增授权目录
       */
      hlbAuthDirAfterClose: function () {
        this.$refs['hlbAuthDirAfterForm'].resetFields();
        this.hlbAuthDirAfterVisible = false
      },
      /**
       * 合利宝后增授权目录打开
       */
      hlbAuthDirAfterOpen: function () {
        this.hlbAuthDirAfterVisible = true
      },
      /**
       * 合利宝后增授权提交
       */
      addtHlbPayConfigAuthDirBefore: function () {
        //预留校验判断
        this.$refs['hlbAuthDirAfterForm'].validate((valid) => {
          if (valid) {
            this.addtHlbPayConfigAuthDir()
          } else {
            this.$message.error('还有未正确填写的内容');
            return false;
          }
        });

      },
      addtHlbPayConfigAuthDir: function () {
        let form = JSON.parse(JSON.stringify(this.hlbAuthDirAfterForm));
        form.merchantId = this.id;
        addtHlbPayConfigAuthDir(form).then(res => {
          this.$message.success(res.msg);
          this.hlbAuthDirAfterClose();
          this.authDirOpenGetConfig() //刷新父级模态框
        }).catch(e => {

        })
      },

      /**
       * 合利宝授权目录状态
       */
      hlnAuthStatus: function () {
        checkHlbAuthStatus(this.id).then(res => {
          this.$message.success(res.msg);
        }).catch(e => {

        })
      },

      // check empty  空值检查
      ec: function (value) {
        let flag = false;
        if (value === '' || value === 'null' || value === undefined || value === null) {
          flag = false
        } else {
          flag = true
        }
        return flag
      },


      xlsFeeConfigClose: function () {
        setTimeout(() => {
          this.xlsFeeConfigForm = {
            merchantId: '',
            WECHAT_SCAN: 0,
            WECHAT_MINIAPP: 0,
            WECHAT_MP: 0,
            WECHAT_POS	: 0,
            ALIPAY_SCAN: 0,
            ALIPAY_MP: 0,
            UNIONPAY_JS: 0,
            UNIONPAY_SCAN: 0,
          };
        }, 500);

        this.xlsFeeConfigVisible = false
      },
      //获取数据并打开
      xlsFeeConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        findXlsFeeConfig(id).then(res => {
          let data = res.obj;
          this.xlsFeeConfigForm.merchantId = id;
          if (data) {
            console.log(data);
            console.log(data.merchantId);
            this.xlsFeeConfigForm.WECHAT_SCAN = data.wechat_SCAN || 0;
            this.xlsFeeConfigForm.WECHAT_MINIAPP = data.wechat_MINIAPP || 0;
            this.xlsFeeConfigForm.WECHAT_MP = data.wechat_MP || 0;
            this.xlsFeeConfigForm.WECHAT_POS = data.wechat_POS || 0;
            this.xlsFeeConfigForm.ALIPAY_SCAN = data.alipay_SCAN || 0;
            this.xlsFeeConfigForm.ALIPAY_MP = data.alipay_MP || 0;
            this.xlsFeeConfigForm.ALIPAY_POS = data.alipay_POS || 0;
            this.xlsFeeConfigForm.UNIONPAY_SCAN = data.unionpay_SCAN || 0;
            this.xlsFeeConfigForm.UNIONPAY_JS = data.unionpay_JS || 0;
          }
          this.xlsFeeConfigVisible = true
        }).catch(e => {

        })
      },
      //提交
      setXlsFeeConfig: function () {
        let form = this.deepCopy(this.xlsFeeConfigForm);
        if (form.merchantId === '' || form.merchantId == null) {
          this.$message.error('id错误');
          return false
        }
        this.btnLoading = true;
        setXlsFeeConfig(form).then(res => {
          this.$message.success(res.msg);
          this.xlsFeeConfigClose();
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },

      xlsSignConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.btnLoading = true;
        xlsSignConfig(id).then(res => {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },



      xlsOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.btnLoading = true;
        xlsOpenjs(id).then(res => {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },



      xlsOpenQuery: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.btnLoading = true;
        xlsOpenQueryjs(id).then(res => {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },


      xlsPayConfigClose: function () {
        this.xlsPayConfigVisible = false
      },
      xlsPayConfigOpen: function () {
        let id = this.id;
        if (id === '' || id == null) {
          this.$message.error('id错误');
          return false
        }
        this.$set(this.xlsPayConfigForm, 'merchantId', id);

        findXlsPayConfig(id).then(res => {
          let data = res.obj;
          this.$set(this.xlsPayConfigForm, 'jsapi_path', data.jsapi_path || '');
        }).catch(e => {

        });
        this.xlsPayConfigVisible = true
      },
      saveXlsCurConfigBefore: function () {
        this.$confirm(`确定保存?`, '提示', {
          confirmButtonText: '确定保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发起
          this.saveXlsCurConfig()
        }).catch(() => {
          //取消
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });


      },
      saveXlsCurConfig: function () {
        let form = this.deepCopy(this.xlsPayConfigForm);
        form.jsapiPath
        //发起
        this.btnLoading = true;
        setXlsPayConfig(form).then(res => {
          this.$message.success('当前项配置成功，可以继续配置其他参数。');
          this.xlsPayConfigOpen();//刷新参数
          setTimeout(() => {
            this.btnLoading = false
          }, 1000)
        }).catch(e => {
          this.btnLoading = false
        })
      },


      /**
       *-----------------------------工具-----------------------------------
       */

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

  .dym-input {
    width: 200px;
  }

  .qr-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .save-btn-box {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    margin-bottom: 20px;
  }

  .save-tips {
    width: 100%;
    max-width: 100%;
    text-align: center;
    color: #99a9bf;
  }

  .btn-tips {
    margin-right: 10px;
    color: #99a9bf;
  }

  .red {
    color: #f56c6c;
  }

  .blue {
    color: #3ebdff;
  }

  .persymbol {
    margin-left: 10px;
    color: #154862;
  }

  .mid-btn {
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  .pay-con-input {
    width: 349px;
  }

  .hlb-auth-input-width {
    width: 466px;
    max-width: 100%;
  }

  .fee-show-fox {
    width: 100%;
    padding: 20px;

    font-size: 14px;
    color: black;
  }


</style>
