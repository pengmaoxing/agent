import request from '@/utils/request'
import qs from 'qs'


export function getModifyLogList(pageNumber, pageSize) {
  return request({
    url: '/merchant/third_info_update_record/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
  })
}
