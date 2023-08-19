import request from '@/utils/request'
import qs from 'qs'

// 获取二维码记录
export function getQrCodeRecord (pageNumber, pageSize) {
  return request({
    url: '/merchant/qr_code_record/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
  })
}

// 添加二维码记录
export function addQrCodeRecord (generateNumber,merchantName) {
  return request({
    url: '/merchant/qr_code_record/save_rewrite',
    method: 'post',
    data: qs.stringify({
      generateNumber,
      merchantName
    }, {indices: false})
  })
}

// 删除二维码记录
export function deleteFile (id) {
  return request({
    url: '/merchant/qr_code_record/delete_file',
    method: 'post',
    data: qs.stringify({
      id
    }, {indices: false})
  })
}

// 获取服务商下的商户列表
export function merchantSelect () {
  return request({
    url: '/merchant/merchant/mch/select_item',
    method: 'get',
    params: {}
  })
}

// 批量下载
export function download (id) {
  return request({
    url: '/merchant/qr_code_record/download',
    method: 'get',
    params:{
      id
    }
  })
}
