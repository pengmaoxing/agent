import request from '@/utils/request'
import qs from 'qs'

// 获取业务员列表  / 搜索业务员列表
export function getThirdMch (pageNumber, pageSize, queryList) {
  return request({
    url: '/thirdmch/config/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      domainUrl: queryList.domainUrl,
      mid: queryList.mid,
    }
  })
}

//添加业务员
export function thirdMchAdd (managerInfo) {
  return request({
    url: '/thirdmch/config/save',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}

//修改业务员
export function thirdMchUpdate (managerInfo) {
  return request({
    url: '/thirdmch/config/update',
    method: 'post',
    data: qs.stringify(
      managerInfo
    )
  })
}


export function cancle (id) {
  return request({
    url: '/thirdmch/config/delete',
    method: 'post',
    params: {
      ids: id,
    }
  })
}

