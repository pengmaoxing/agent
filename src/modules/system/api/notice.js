import request from '@/utils/request'
import qs from 'qs'

// 获取业务员列表  / 搜索业务员列表
export function getNotice (pageNumber, pageSize, queryList) {
  return request({
    url: '/admin/notice/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      content: queryList.content,
      title: queryList.title,
    }
  })
}

//添加业务员
export function noticeAdd (managerInfo) {
  return request({
    url: '/admin/notice/save',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}

//修改业务员
export function noticeUpdate (managerInfo) {
  return request({
    url: '/admin/notice/update',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}


export function cancle (id) {
  return request({
    url: '/admin/notice/delete',
    method: 'post',
    params: {
      ids: id,
    }
  })
}

