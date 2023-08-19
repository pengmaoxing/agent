import request from '@/utils/request'
import qs from 'qs'

//编辑商户
export function modifyMerchant(data, payChannel) {
  return request({
    url: '/merchant/hsq_mch_info/save_rewrite',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data,
      payChannel: payChannel
    })
  })
}

//回显通联进件
export function getHsqInfo(id, pc) {
  return request({
    url: '/merchant/hsq_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}

// 提交审核
export function hsqRegister(id) {
  return request({
    url: '/merchant/hsq_mch_info/upload_info',
    method: 'post',
    timeout: 300000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

// 提交审核
export function hsqPic(id) {
  return request({
    url: '/merchant/hsq_mch_info/upload_pic',
    method: 'post',
    timeout: 300000,
    data: qs.stringify({
      merchantId: id
    })
  })
}


// 审核状态
export function hsqRegisterStatus(id) {
  return request({
    url: '/merchant/hsq_mch_info/check_status',
    method: 'post',
    params: {
      merchantId: id
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

  //查询支行
  export function hsqFindBankInfo(key) {
    return request({
      url: '/merchant/hsq_mch_info/find_bank',
      method: 'get',
      params: {
        bankName: key
      }
    })

}

