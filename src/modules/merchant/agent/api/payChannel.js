import request from '@/utils/request'
import qs from 'qs'

//获取支付通道
export function findPayWay() {
  return request({
    url: '/pay/pay_compose/find_config_by_pay_way',
    method: 'get',
    params: {}
  })
}

//提交进件变动信息
export function saveRrecord(id, record) {
  return request({
    url: '/merchant/third_info_apply_record/save_record',
    method: 'POST',
    data: qs.stringify({
      merchantId: id,
      interestRateInfo: record
    })
  })
}





