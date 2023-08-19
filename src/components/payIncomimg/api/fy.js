import request from '@/utils/request'
import qs from 'qs'


//拉取平台进件信息
export function getPlantInfo(id) {
  return request({
    url: '/merchant/plant_mcht_info/detail',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}

// //拉取微信进件信息
// export function getWxInfo(id) {
//   return request({
//     url: '/merchant/wx_mch_info/detail',
//     method: 'get',
//     params: {
//       merchantId: id,
//     }
//   })
// }


//拉取fy进件信息
export function getFyInfo(id, pc) {
  return request({
    url: '/merchant/third_mch_info/detail',
    method: 'get',
    params: {
      merchantId: id,
      payChannel: pc
    }
  })
}


//编辑商户
export function updateMerchant(data) {
  return request({
    url: '/merchant/wx_mch_info/wx_mch_info/save',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改编辑商户
export function modifyMerchant(data) {
  return request({
    url: '/merchant/wx_mch_info/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//修改编辑商户 JSON
export function modifyMerchantJson(data, payChannel) {
  return request({
    url: '/merchant/third_mch_info/save_or_update',
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

//测试费率提交
export function updateTest(payFeeRateDTOS) {
  return request({
    url: '/pay/merchant_pay_compose_config/test',
    method: 'post',
    data: qs.stringify({
      payFeeRateDTOS
    })
  })
}

/* 张昊天修改 2019.8.19~ */

//查询进件详情信息
export function getFyIncomingInfo(id) {
  return request({
    url: '/merchant/fuiou_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}

//保存/修改 进件信息
export function saveFyIncomingInfo(data) {
  return request({
    url: '/merchant/fuiou_mch_info/save_rewrite',
    method: 'post',
    data: qs.stringify({
      thirdMchJson: data
    })
  })
}

//上传文字资料接口
export function uploadFyIncomingTextInfo(id) {
  return request({
    url: '/merchant/fuiou_mch_info/upload_info',
    method: 'post',
    timeout: 30000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

//上传图片资料接口
export function uploadFyIncomingPhotoInfo(id) {
  return request({
    url: '/merchant/fuiou_mch_info/upload_photo',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}

//获取市区代码
export function getCityCode(keyword) {
  return request({
    url: '/config/admin/find_fy_local_code_by_city',
    method: 'get',
    params: {
      keyword: keyword
    }
  })
}

//获取区县代码
export function getCountyCode(keyword, cityCode) {
  return request({
    url: '/config/admin/find_fy_local_code_by_area',
    method: 'get',
    params: {
      keyword: keyword,
      cityCode: cityCode
    }
  })
}
//获取经营代码
export function getBusinessCode(keyword) {
  return request({
    url: '/config/admin/find_fy_business_code',
    method: 'get',
    params: {
      keyword: keyword
    }
  })
}

//修改微信经营范围代码
export function updateCategoryCode(id) {
  return request({
    url: '/merchant/fuiou_mch_info/fy_update_category',
    method: 'post',
    data: qs.stringify({
      merchantId: id
    })
  })
}

