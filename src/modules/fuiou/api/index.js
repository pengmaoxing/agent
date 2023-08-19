import request from '@/utils/request'
import qs from 'qs'

// 支付宝主扫
export function preCreate(orderType) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/pre_create',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
    })
  })
}
// jsapi支付
export function jsPay(orderType) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/jspay',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
    })
  })
}


// 条码支付
export function micro(orderType, authCode) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/micro',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      authCode: authCode
    })
  })
}

// 查询
export function query(orderType, orderNum) {
  return request({
    url: '/fuiou/admin/query',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}

// 退款
export function refund(orderType, orderNum) {
  return request({
    url: '/fuiou/admin/refund',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}
// 撤销
export function cancel(orderType, orderNum) {
  return request({
    url: '/fuiou/admin/cancel',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}

// 富友预授权支付
export function preAuthMicropay(orderType, authCode) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/pre_auth_micropay',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      authCode: authCode
    })
  })
}
// 富友预授权查询
export function preAuthQuery(orderType, orderNum) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/pre_auth_query',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}
// 预授权完成
export function preAuthFinish(orderType, orderNum) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/pre_auth_finish',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}
// 富友预授权撤销
export function preAuthCancel(orderType, orderNum) {
  // 返回一个Promise对象
  return request({
    url: '/fuiou/admin/pre_auth_cancel',
    method: 'post',
    data: qs.stringify({
      orderType: orderType,
      orderNum: orderNum
    })
  })
}



