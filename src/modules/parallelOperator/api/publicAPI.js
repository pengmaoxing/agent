import request from '@/utils/request'
import qs from 'qs'

//获取代理级别
export function getAgentLevel() {
  return request({
    url: '/config/admin/find_agent_level_alias',
    method: 'get',
    params: {
    }
  })
}
//模糊查询推荐人
export function getProviderValueByLikeSearch(keyword) {
  return request({
    url: '/auth/company/retail/find_by_provider_id/select_item',
    method: 'get',
    params: {
      name:keyword
    }
  })
}

//删除
export function logicalDel(id) {
  return request({
    url: '/auth/company/retail/logical_del',
    method: 'post',
    params: {
      ids: id,
    }
  })
}



// 重置密码
export function resetPwd (username) {
  return request({
    url: '/auth/user/default/reset_password',
    method: 'post',
    params: {
      username: username,
    }
  })
}
