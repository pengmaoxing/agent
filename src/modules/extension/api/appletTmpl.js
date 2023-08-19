import request from '@/utils/request'
import qs from 'qs'



//获取商户小程序参数
export function getMchAppletConfig(merchantId) {
  return request({
    url: '/mch_applet/find_by_company_id',
    method: 'get',
    params: {
      merchantId: merchantId
    }
  })
}

//配置商户小程序参数
export function saveMchAppletConfig(appletConfig) {
  return request({
    url: '/mch_applet/save_applet_config',
    method: 'post',
    params: {
      appId: appletConfig.appId,
      appKey: appletConfig.appKey,
      templateId: appletConfig.templateId
    }
  })
}

export function getTmplRecvMchList(pageNumber, pageSize, form) {
  return request({
    url: '/tmpl_msg/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      merchantId: form.merchantId,
      receiverId: form.receiverId
    }
  })
}


export function bindConfig(form) {
  return request({
    url: '/tmpl_msg/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//获取订阅消息接收者selectItem
export function recvSelectItem () {
  return request({
    url: '/tmpl_msg/select_item',
    method: 'get',
  })
}
