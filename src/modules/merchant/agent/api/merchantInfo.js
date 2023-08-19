import request from '@/utils/request'
import qs from 'qs'

//提交进件
export function addMchInfo (data) {
  return request({
    url: '/merchant/mch_info/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

//获取进件列表
export function getMchInfoList (pageNumber, pageSize) {
  return request({
    url: '/merchant/mch_info/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      companyId: sessionStorage.getItem('companyId'),
    }
  })
}

//获取进件列表
export function getMchInfoListByFuwushang (pageNumber, pageSize) {
  return request({
    url: '/merchant/mch_info/find_by_fuwushang',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
  })
}





//查看详情
export function detail (id) {
  return request({
    url: '/merchant/mch_info/detail',
    method: 'get',
    params: {
      id: id,
    }
  })
}


