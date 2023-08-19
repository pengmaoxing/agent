import request from '@/utils/request'
import qs from 'qs'

export function getProviderList() {
  return request({
    url: '/auth/company/service_provider/list_rewrite',
    method: 'get',
    params: {
      pageNumber: 1,
      pageSize: 1000000,
    }
  })
}

//获取商户列表
export function getMerchantList(pageNumber, pageSize, searchData) {
  return request({
    url: '/merchant/merchant/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: searchData.name,
      contact: searchData.contact,
      customerPhone: searchData.customerPhone,
      companyName: searchData.companyName,
      serviceProviderId: searchData.serviceProviderId
    }
  })
}


// 获取商户详情
export function getMerchantDetail(merchantId) {
  return request({
    url: '/merchant/merchant/find_one',
    method: 'get',
    params: {
      merchantId: merchantId,
    }
  })
}

//注销
export function cancle(merchantId, status) {
  return request({
    url: '/merchant/merchant/cancle',
    method: 'post',
    params: {
      merchantId: merchantId,
      status: status,
    }
  })
}


//配置商户小程序参数
export function saveAppletConfig(appletConfig) {
  return request({
    url: '/merchant/merchant/save_applet_config',
    method: 'post',
    params: {
      merchantId: appletConfig.merchantId,
      appId: appletConfig.appId,
      appKey: appletConfig.appKey,
      originalId: appletConfig.originalId
    }
  })
}

//重置密码
export function resetPwd(username) {
  return request({
    url: '/merchant/merchant/default/reset_password',
    method: 'post',
    params: {
      username: username,
    }
  })
}


// 获取公众号配置详情
export function getWxPublicDetail(merchantId) {
  return request({
    url: '/merchant/merchant/find_pub_config',
    method: 'get',
    params: {
      merchantId: merchantId,
    }
  })
}

//配置公众号参数
export function saveWxPublicConfig(wxPublicConfig) {
  return request({
    url: '/merchant/merchant/save_pub_config',
    method: 'post',
    params: {
      merchantId: wxPublicConfig.merchantId,
      appId: wxPublicConfig.appId,
      appKey: wxPublicConfig.appKey
    }
  })
}

// 获取支付宝
export function getAliConfigDetail(merchantId) {
  return request({
    url: '/merchant/merchant/find_ali_config',
    method: 'get',
    params: {
      merchantId: merchantId,
    }
  })
}


//配置支付宝
export function saveAliConfig(form) {
  return request({
    url: '/merchant/merchant/save_ali_config',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//获取点餐
export function getRepastApplet(merchantId) {
  return request({
    url: '/merchant/repast_applet_config/find_by_merchant_id',
    method: 'get',
    params: {
      merchantId: merchantId
    }
  })
}

//配置点餐
export function saveRepastAppleConfig(form) {
  return request({
    url: '/merchant/repast_applet_config/save_or_update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


/**
 * 重构服务支付参数
 * xwy 2019-11-12
 */



//回显支付通道
export function getPayConfigByTop() {
  return request({
    url: 'base_data/admin/get_top_pay_config_enum',
    method: 'get',
    params: {}
  })
}

//回显支付参数
export function getPayConfigAndValueByTop2(pc,companyId) {
  return request({
    url: '/pay/pay_config/get_top_pay_config_by_channel',
    method: 'get',
    params: {
      payChannel: pc,
      companyId:companyId
    }
  })
}

//保存支付参数
export function savePayConfig2(pc, form,companyId) {
  return request({
    url: '/pay/pay_config/save_top_config',
    method: 'post',
    params: {
      payChannel: pc,
      configJson: form,
      companyId: companyId
    }
  })
}




//回显支付参数
export function getPayConfigAndValueByTop(pc) {
  return request({
    url: '/pay/pay_config/get_top_pay_config_by_channel',
    method: 'get',
    params: {
      payChannel: pc
    }
  })
}

//保存支付参数
export function savePayConfig(pc, form) {
  return request({
    url: '/pay/pay_config/save_top_config',
    method: 'post',
    params: {
      payChannel: pc,
      configJson: form
    }
  })
}

//保存支付宝收银小程序参数
export function saveAliPayConfig(form) {
  return request({
    url: '/member/ali_check_config/save_re',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//获取支付宝收银小程序参数
export function findAlidPayConfig(){
  return request({
    url: '/member/ali_check_config/find_re',
    method: 'get',
    params: {

    }
  })
}
