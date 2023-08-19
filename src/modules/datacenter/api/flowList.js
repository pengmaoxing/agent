import request from '@/utils/request'
import qs from 'qs'

/**
 *获取支付渠道
 */
export function getPayWayOption () {
  return request({
    url: '/order/order/find_pay_way',
    method: 'get',
    params: {}
  })
}

/**
 *获取表格
 */
export function merchantList (pageNum, pageSize, merchantName, companyId, type,startTime,endTime) {
  return request({
    url: '/auth/running_account/merchant_count_detail',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      companyId: companyId,//登录用户id
      startTime: startTime,
      endTime: endTime,
      type: type,//支付方式类型
      merchantName: merchantName,//名称
    }
  })
}
