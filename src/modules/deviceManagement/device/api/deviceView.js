import request from '@/utils/request'
import qs from 'qs'

//获取设备型号
export function getDeviceModel() {
  return request({
    url: '/device/device_model',
    method: 'get',
    params: {}
  })
}

//获取设备列表
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
      deviceBelongId: form.deviceBelongId
    }
  })
}

//设备入库
export function saveDevice(data) {
  return request({
    url: '/device/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//获取要划拨的对象
export function getDeviceBeLong(name) {
  return request({
    url: '/device/find_target',
    method: 'get',
    params: {
      name: name,
    }
  })
}

//划拨设备给代理商
export function transferDevice(data) {
  return request({
    url: '/device/transfer',
    method: 'post',
    data: qs.stringify(
      data
    )
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

//设备批量导入模板下载
export function getBatDeviceModel() {
  return request({
    url: '/device/excel_export',
    method: 'get',
    responseType: 'blob',
    params:{
    }
  })
}

//设备批量划拨模板下载
export function getBatTransferDeviceModel() {
  return request({
    url: '/device/excel_export_transfer',
    method: 'get',
    responseType: 'blob',
    params:{
    }
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

//获取当前代理商商户
export function getMerchant(name) {
  return request({
    url: '/device/find_merchant',
    method: 'post',
    params: {
      name: name
    }
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
