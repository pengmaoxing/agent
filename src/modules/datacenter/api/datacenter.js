import request from '@/utils/request'

import qs from 'qs'

/**
 *流水页面
 */
export function flowData(startTime, endTime, flag) {
  return request({
    url: '/auth/running_account/count_data',
    method: 'get',
    params: {
      startTime: startTime,
      endTime: endTime,
      merchantFlag: flag
    }
  })
}

/**
 *流水页面
 */
export function flowTableData(startTime, endTime, pageNum, pageSize) {

  return request({
    url: '/auth/running_account/merchant_count_list',
    method: 'get',

    params: {
      startTime: startTime,
      endTime: endTime,
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

/**
 *商户实时流水
 */
export function synchroFlowTableData(startTime, endTime, pageNum, pageSize,companyId, payWayId) {

  return request({
    url: '/order/admin/flow/getFlowListDef',
    method: 'get',

    params: {
      begin: startTime,
      end: endTime,
      pageNumber: pageNum,
      pageSize: pageSize,
      companyId:companyId,
      payWayId:payWayId
    }
  })
}


//*********************************************************************************************************
// flowDetail
/**
 *获取支付渠道
 */
export function getPayWayOption() {
  return request({
    url: '/order/order/find_pay_way',
    method: 'get',
    params: {}
  })
}

/**
 *获取列表
 */
export function getMerchantList(pageNum, pageSize, companyId, startTime, endTime, type, merchantId, payWay) {
  return request({
    url: '/auth/running_account/merchant_count_detail',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      companyId: companyId,
      startTime: startTime,
      endTime: endTime,
      type: type,
      merchantId: merchantId,
      payWay: payWay,
    }
  })
}

//支付方式下拉
export function findPayWay() {
  return request({
    url: '/config/admin/config_enum/PayWayEnum',
    method: 'get',
    params: {}
  })
}
