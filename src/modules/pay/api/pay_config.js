import request from '@/utils/request'
import qs from 'qs'


// 获取运营商对应的商户列表
export function getMerchant (pageNumber, pageSize, merchantName) {
  return request({
    url: '/merchant/merchant/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: sessionStorage.getItem("companyId"),
      name:merchantName
    }
  })
}

// 获取商户对应的支付配置
export function findPayChannel (merchantId) {
  return request({
    url: '/pay/pay_channel/find_pay_channel',
    method: 'get',
    params: {
      merchantId
    }
  })
}


// 保存配置
export function configSave (payConfig,merchantId) {
  return request({
    url: '/pay/pay_channel/config_save',
    method: 'post',
    data: qs.stringify({
      payConfig,
      merchantId: merchantId
    }, { indices: false })
  })
}

// 获取服务商支付参数
export function findTopPayConfig () {
  return request({
    url: '/pay/pay_config/find_top_pay_config',
    method: 'get',
  })
}

// 保存服务商支付参数
export function saveTopPayConfig (config,payChannel) {
  return request({
    url: '/pay/pay_config/save_top_pay_config',
    method: 'post',
    data: qs.stringify({
      config,
      payChannel
    }, { indices: false }
    )
  })
}


// 商户支付参数
export function findPayConfig (merchantId) {
  return request({
    url: '/pay/pay_config/find_config',
    method: 'get',
    params: {
      merchantId
    }
  })
}

// 保存支付参数
export function savePayConfig (payConfig,merchantId,payWay) {
  return request({
    url: '/pay/pay_config/save',
    method: 'post',
    data: qs.stringify({
      payConfig,
      merchantId: merchantId,
      payWay: payWay
    }, { indices: false })
  })
}
