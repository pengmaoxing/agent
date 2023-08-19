import request from '@/utils/request'
import qs from 'qs'


//拉取平台进件信息
export function getPlantInfo(id) {
  return request({
    url: '/merchant/ls_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


export function getYrmInfo(id) {
  return request({
    url: '/merchant/ls_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


//修改编辑商户 JSON
export function modifyMerchantJson(data, payChannel) {
  return request({
    url: '/merchant/ls_mch_info/save_rewrite',
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


//提交第三方图片
export function uploadThirdImage(id) {
  return request({
    url: '/merchant/ls_mch_info/upload_pic',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

//提交第三方文字
export function uploadThirdInfo(id) {
  return request({
    url: '/merchant/ls_mch_info/upload_info',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}


//查询进件状态
export function findLsStatus(id) {
  return request({
    url: '/merchant/ls_mch_info/check_status',
    method: 'post',
    data: qs.stringify({
      merchantId: id
    })
  })
}

//查询银行
export function getBankName(keyword) {
  return request({
   // baseURL: 'https://pay.lingyundata.com:8080',
    url: '/merchant/ls_mch_info/find_bank',
    method: 'get',
    params: {
      bankName: keyword
    }
  })
}

//查询省
export function getProvince() {
  return request({
   // baseURL: 'https://pay.lingyundata.com:8080',
    url: '/merchant/ls_mch_info/find_province',
    method: 'get',
    params: {}
  })
}


//查询区
export function getCityArea(key) {
  return request({
   // baseURL: 'https://pay.lingyundata.com:8080',
    url: '/merchant/ls_mch_info/find_city',
    method: 'get',
    params: {
      parentAreaCode: key
    }
  })
}









