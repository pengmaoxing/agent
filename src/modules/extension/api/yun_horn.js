import request from '@/utils/request'
import qs from 'qs'

// 获取云喇叭
export function getYunHorn (pageNumber, pageSize) {
  return request({
    url: '/auth/yun_horn/get_info',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
    }
  })
}

// 添加云喇叭
export function addYunHorn (yunHorn) {
  return request({
    url: '/auth/yun_horn/save',
    method: 'post',
    data: qs.stringify(
      yunHorn
    )
  })
}

// 删除云喇叭
export function deleteYunHorn (ids) {
  return request({
    url: '/auth/yun_horn/delete',
    method: 'post',
    data: qs.stringify({
      ids
    }, {indices: false})
  })
}


//修改云喇叭
export function  updateYunHorn (yunHorn) {
  return request({
    url: '/auth/yun_horn/update',
    method: 'post',
    data: qs.stringify(
      yunHorn
    )
  })
}


