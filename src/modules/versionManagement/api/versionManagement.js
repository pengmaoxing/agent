//   /auth/admin/version/html
//   /auth/admin/version/info
//   /auth/admin/version/zip

import request from '@/utils/request'
import qs from 'qs'

//获取html 列表
export function getHTMLList(pageNumber, pageSize, id) {
  return request({
    url: '/auth/admin/version/html/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      serviceProviderId: id
    }
  })
}

//增加html
export function addHTML(form) {
  return request({
    url: '/auth/admin/version/html/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}


//删除html
export function deleteHTML(id) {
  return request({
    url: '/auth/admin/version/html/logical_del',
    method: 'post',
    data: qs.stringify({
      ids: id
    })
  })
}


//获取app包列表
export function getPackageList(pageNumber, pageSize, id) {
  return request({
    url: '/auth/admin/version/zip/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      serviceProviderId: id
    }
  })
}

//增加app包
export function addPackage(form) {
  return request({
    url: '/auth/admin/version/zip/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//删除app包
export function deletePackage(id) {
  return request({
    url: '/auth/admin/version/zip/logical_del',
    method: 'post',
    data: qs.stringify({
      ids: id
    })
  })
}

//获取版本管理列表
export function getVerList(pageNumber, pageSize, id) {
  return request({
    url: '/auth/admin/version/info/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      serviceProviderId: id
    }
  })
}

//增加版本
export function addVer(form) {
  return request({
    url: '/auth/admin/version/info/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//编辑版本
export function modifyVer(form) {
  return request({
    url: '/auth/admin/version/info/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//删除版本
export function deleteVer(id) {
  return request({
    url: '/auth/admin/version/info/logical_del',
    method: 'post',
    data: qs.stringify({
      ids: id
    })
  })
}



