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

//保存运营商
export function saveOpa(data) {
  return request({
    url: '/auth/company/retail/save_by_opera/release',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}
