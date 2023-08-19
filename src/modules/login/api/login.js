import request from '@/utils/request'
import qs from 'qs'

// 登录
export function login(username, password) {
  // 返回一个Promise对象
  return request({
    url: '/auth/admin/login',
    method: 'post',
    data: qs.stringify({
      username: username,
      password: password
    })
  })
}
// 获取网站信息
export function getSiteInfo() {
  return request({
    url: '/auth/admin/get_siteinfo',
    method: 'get',
    params: {}
  })
}

//获取别名
export function getAliasInfo() {
  return request({
    url: '/config/admin/find_agent_alias',
    method: 'get',
    params: {}
  })
}


