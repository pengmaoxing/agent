import request from '@/utils/request'
import qs from 'qs'


//拉取平台进件信息
export function getPlantInfo(id) {
  return request({
    url: '/merchant/yrm_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


export function getYrmInfo(id) {
  return request({
    url: '/merchant/yrm_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


//修改编辑商户 JSON
export function modifyMerchantJson(data, payChannel) {
  return request({
    url: '/merchant/yrm_mch_info/save_rewrite',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data,
      payChannel: payChannel
    })
  })
}


//获取支付通道
export function findPayType(payWay, payChannel) {
  return request({
    url: '/pay/pay_compose/find_pay_type_by_pay_channel_and_pay_way',
    method: 'get',
    params: {
      payWay: payWay,
      payChannel: payChannel
    }
  })
}

//获取支付通道2
export function findPayTypeByChannel(payChannel, id) {
  return request({
    url: '/pay/pay_compose/find_pay_type_by_pay_channel',
    method: 'get',
    params: {
      payChannel: payChannel,
      merchantId: id
    }
  })
}


//提交第三方
export function uploadThirdVerify(id) {
  return request({
    url: '/merchant/yrm_mch_info/upload',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}


//获取支付通道
export function findYrmStatus(merchantId) {
  return request({
    url: '/merchant/yrm_mch_info/find_status',
    method: 'get',
    params: {
      merchantId: merchantId
    }
  })
}


//获取地区代码
export function getCityCode(keyword) {
  return request({
    url: '/config/admin/find_yrm_local_code',
    method: 'get',
    params: {
      keyword: keyword
    }
  })
}






