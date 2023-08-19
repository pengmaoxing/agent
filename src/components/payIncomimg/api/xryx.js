import request from '@/utils/request'
import qs from 'qs'

//编辑商户
export function modifyMerchant(data, payChannel) {
  return request({
    url: '/merchant/xryx_mch_info/save_rewrite',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data,
      payChannel: payChannel
    })
  })
}

//回显通联进件
export function getXryxInfo(id, pc) {
  return request({
    url: '/merchant/xryx_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}

// 提交审核
export function xryxRegister(id) {
  return request({
    url: '/merchant/xryx_mch_info/upload_info',
    method: 'post',
    timeout: 300000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

// 审核状态
export function xryxRegisterStatus(id) {
  return request({
    url: '/merchant/xryx_mch_info/find_status',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//查询省
export function getProvince() {
  return request({
    //baseURL: 'https://pay.lingyundata.com:8080',
    url: '/merchant/tl_mch_info/find_province',
    method: 'get',
    params: {}
  })
}



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


export function xryxSetpath(id, path) {
  return request({
    url: '/merchant/xryx_mch_info/set_path',
    method: 'get',
    params: {
      path: path,
      merchantId: id
    }
  })
}

export function xryxFindBankInfo(key) {
  return request({
    url: '/merchant/xryx_mch_info/find_bank',
    method: 'get',
    params: {
      bankName: key
    }
  })
}
