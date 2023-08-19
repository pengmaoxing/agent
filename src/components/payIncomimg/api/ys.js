import request from '@/utils/request'
import qs from 'qs'

//拉取平台进件
export function getHsfPlatInfo(id) {
  return request({
    url: '/merchant/hsf_mch_info/pull_plat_info',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//回显银盛进件
export function getYsInfo(id, pc) {
  return request({
    url: '/merchant/ys_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}



//编辑商户
export function modifyMerchant(data, payChannel) {
  return request({
    url: '/merchant/ys_mch_info/save_rewrite',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data,
      payChannel: payChannel
    })
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


/**
 *
 * @param pageNumber
 * @param pageSize
 */
//获取进件列表
export function getMchInfoList(pageNumber, pageSize) {
  return request({
    url: '/merchant/merchant/hsf_mch_info/find_by_company_id',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: sessionStorage.getItem('companyId')
    }
  })
}

//获取进件数据 回显（文本资料）
export function findHsfentryFile(id) {
  return request({
    url: '/merchant/hsf_mch_info/entry',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//获取进件数据 回显（图片资料）
export function findHsfentryImg(id) {
  return request({
    url: '/merchant/hsf_mch_photo/entry',
    method: 'get',
    params: {
      merchantId: id
    }
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

// 审核状态
export function ysRegisterStatus(id) {
  return request({
    url: '/merchant/ys_mch_info/find_status',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

// 提交审核
export function ysRegister(id) {
  return request({
    url: '/merchant/ys_mch_info/upload_text',
    method: 'post',
    timeout: 300000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

// 图片提交审核
export function ysImageRegister(id) {
  return request({
    url: '/merchant/ys_mch_info/upload_photo',
    method: 'post',
    timeout: 300000,
    data: qs.stringify({
      merchantId: id
    })
  })
}


/**
 * 私有
 */
//查询总行
export function ysFindBankName(key) {
  return request({
    url: '/merchant/ys_mch_info/find_bank',
    method: 'get',
    params: {
      bankName: key
    }
  })
}
//查询支行
export function ysFindAccBankName(key) {
  return request({
   // baseURL:'https://pay.lingyundata.com:8080',
    url: '/merchant/ys_mch_info/find_acc_bank',
    method: 'get',
    params: {
      openAccBankname: key
    }
  })
}
