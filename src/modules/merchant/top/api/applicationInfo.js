import request from '@/utils/request'
import qs from 'qs'

//获取进件记录
export function getRecordList(pageNumber, pageSize, form) {
  return request({
    url: '/merchant/third_info_apply_record/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      merchantName: form.merchantName||'',
      contact: form.contact||'',
      shortName: form.shortName||'',
      merchantAccount: form.merchantAccount||''
    }
  })
}

//修改申请记录
export function updateRecordStatus(id, status) {
  return request({
    url: '/merchant/third_info_apply_record/update',
    method: 'post',
    data: qs.stringify({
      id: id,
      status: status,
    })
  })
}

//
export function delRecorditem(id) {
  return request({
    url: '/merchant/third_info_apply_record/logical_del',
    method: 'POST',
    data: qs.stringify({
      ids: id,
    })
  })
}
