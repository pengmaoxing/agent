import request from '@/utils/request'
import qs from 'qs'

//获取进件列表
export function getMchInfoList(pageNumber, pageSize) {
  return request({
    url: '/merchant/merchant/hsf_mch_info/find_by_company_id',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: sessionStorage.getItem('companyId')
    }
  })
}

//获取进件数据 回显（文本资料）
export function findHsfentryFile(id) {
  return request({
    url: '/merchant/hsf_mch_info/entry',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}
//获取进件数据 回显（图片资料）
export function findHsfentryImg(id) {
  return request({
    url: '/merchant/hsf_mch_photo/entry',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}

//提交资料（文本资料）
export function hsfFileUpdate(form) {
  return request({
    url: '/merchant/hsf_mch_info/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
//提交资料（图片资料）
export function hsfImgUpdate(form) {
  return request({
    url: '/merchant/hsf_mch_photo/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}

//表单提交判定

export function hsfPhotoJudge(id) {
  return request({
    url: '/merchant/hsf_mch_info/photo/judge',
    method: 'POST',
    data: qs.stringify({
      merchantId: id
    })
  })
}


// 详情页
export function hsfGetDetails(id) {
  return request({
    url: '/merchant/hsf_mch_info/detail',
    method: 'get',
    params: {
      merchantId: id
    }
  })
}
