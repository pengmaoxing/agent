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


//设备可能归属下拉框
export function getDeviceBeLong(name = '') {
  return request({
    url: '/device/find_target',
    method: 'get',
    params: {
      name: name,
    }
  })
}

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

//设备模板下载
export function getBatDeviceModel() {
  return request({
    url: '/device/excel_export',
    method: 'get',
    responseType: 'blob',
    params:{
    }
  })
}


//设备划拨
export function transferDevice(data) {
  return request({
    url: '/device/transfer',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}



//设备划拨下载
export function getBatTransferDeviceModel() {
  return request({
    url: '/device/excel_export_transfer',
    method: 'get',
    responseType: 'blob',
    params:{
    }
  })
}
