import request from '@/utils/request'

export function getMenu () {
  return request({
    url: '/auth/permission/findMenuList',
    method: 'get'
  })
}
