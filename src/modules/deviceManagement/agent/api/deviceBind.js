import request from '@/utils/request'
import qs from 'qs'


//设备列表
export function getDeviceList(pageNumber, pageSize, form) {
  return request({
    url: '/device/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      deviceModel: form.deviceModel,
      deviceSN: form.deviceSN,
      status: form.status,
    }
  })
}

//获取设备型号
export function getDeviceModel() {
  return request({
    url: '/device/device_model',
    method: 'get',
    params: {}
  })
}

//获取运营商
export function getMerchant(name) {
  return request({
    url: '/device/find_merchant',
    method: 'post',
    params: {
      name: name
    }
  })
}

//设备修改
export function modifyDevice(data) {
  return request({
    url: '/device/update_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//设备退回
export function returnDevice(id) {
  return request({
    url: '/device/back',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

//设备绑定
export function bindDevice(form) {
  return request({
    url: '/device/bind',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//设备解绑
export function unbindDevice(id) {
  return request({
    url: '/device/un_bind',
    method: 'post',
    data: qs.stringify(
      {id: id}
    )
  })
}
