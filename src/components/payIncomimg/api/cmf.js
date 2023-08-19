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

//回显惠闪付进件
export function getHsfInfo(id, pc) {
  return request({
    url: '/merchant/third_mch_info/detail',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}


//提交资料（文字）
export function hsfUpdate(form) {
  return request({
    url: '/merchant/hsf_mch_info/hsf_mch_info/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//编辑商户
export function modifyMerchant(data, payChannel) {
  return request({
    url: '/merchant/third_mch_info/save_or_update',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data,
      payChannel: payChannel
    })
  })
}


//获取支付通道2
export function findPayTypeByChannel(payChannel,id) {
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

//提交资料（文本资料）
export function hsfFileUpdate(form) {
  return request({
    url: 'merchant/cmf_mch_info/internal/registernewmerchant',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//提交资料（图片资料）
export function hsfImgUpdate(form) {
  return request({
    url: '/merchant/cmf_mch_info/photo/internal/registernewmerchant',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//表单提交判定

export function hsfPhotoJudge(id) {
  return request({
    url: '/merchant/hsf_mch_info/photo/judge',
    method: 'POST',
    data: qs.stringify({
      merchantId: id
    })
  })
}


// 详情页
export function hsfGetDetails(id) {
  return request({
    url: '/merchant/hsf_mch_info/detail',
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



// 提交审核
export function hsfRegister(id) {
  return request({
    url: '/merchant/cmf_mch_info/internal/registernewmerchant/release',
    method: 'post',
    data: qs.stringify({
      merchantId: id
    })
  })
}

// 图片提交审核
export function hsfImageRegister(id) {
  return request({
    url: '/merchant/cmf_mch_info/photo/internal/registernewmerchant/release',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

