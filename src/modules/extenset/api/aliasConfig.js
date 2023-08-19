import request from '@/utils/request'
import qs from 'qs'

//获取
export function getAliasConfigList() {
  return request({
    url: '/auth/agent_alias/list',
    method: 'get',
    params: {}
  })
}

//获取
export function findAliasConfig(id) {
  return request({
    url: '/auth/agent_alias/find_by_providerId',
    method: 'get',
    params: {
      providerId: id
    }
  })
}

//获取服务商下拉列表
export function getProviderList() {
  return request({
    url: '/auth/agent_alias/provider_select_item',
    method: 'get',
    params: {}
  })
}


//保存别名
export function saveProvider(form) {
  return request({
    url: '/auth/agent_alias/save',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
//保存别名
export function modifyProvider(form) {
  return request({
    url: '/auth/agent_alias/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
