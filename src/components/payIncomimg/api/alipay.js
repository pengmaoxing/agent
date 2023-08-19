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

//拉取已进件资料
export function getAlipayInfo(id, pc) {
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


//添加商户
export function updateMerchant(data) {
  return request({
    url: '/merchant/ali_pay_mch_info/ali_pay_mch_info/save',
    method: 'post',
    data: qs.stringify(
      data
    )
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

