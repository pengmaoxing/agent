import request from '@/utils/request'
import qs from 'qs'


//拉取平台进件信息
export function getPlantInfo(id) {
  return request({
    url: '/merchant/hlb_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


export function getYrmInfo(id) {
  return request({
    url: '/merchant/hlb_mch_info/find_one',
    method: 'get',
    params: {
      merchantId: id,
    }
  })
}


//修改编辑商户 JSON
export function modifyMerchantJson(data, payChannel) {
  return request({
    url: '/merchant/hlb_mch_info/save_rewrite',
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
    url: '/merchant/hlb_mch_info/upload_photo',
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
    url: '/merchant/hlb_mch_info/upload',
    method: 'post',
    timeout: 60000,
    data: qs.stringify({
      merchantId: id
    })
  })
}


//查询进件状态
export function findHlbStatus(id) {
  return request({
    url: '/merchant/hlb_mch_info/find_upload_status',
    method: 'GET',
    params:{
      merchantId: id
    }
  })
}


//获取省份
export function findProvince() {
  return request({
    url: '/merchant/hlb_mch_info/find_province',
    method: 'GET',
    params: {}
  })
}

//获取城市
export function findCity(name) {
  return request({
    url: '/merchant/hlb_mch_info/find_city',
    method: 'GET',
    params: {
      provinceName: name
    }
  })
}

//获取地域代码
export function findArea(pname, cname) {
  return request({
    url: '/merchant/hlb_mch_info/find_area',
    method: 'GET',
    params: {
      provinceName: pname,
      cityName: cname
    }
  })
}

//获取行业
export function findCategory(name) {
  return request({
    url: '/merchant/hlb_mch_info/find_category',
    method: 'GET',
    params: {
      merchantCategory: name
    }
  })
}


  //提交第三方文字
  export function updateMerchantBasicInfo(form) {
    return request({
      url: '/merchant/hlb_mch_info/updateMerchantBasicInfo',
      method: 'post',
      timeout: 60000,
      data:  qs.stringify(form)
    })
  }


//提交第三方文字
  export function updateMerchantAccountInfo(form) {
    return request({
      url: '/merchant/hlb_mch_info/updateMerchantAccountInfo',
      method: 'post',
      timeout: 60000,
      data:  qs.stringify(form)
    })
  }











