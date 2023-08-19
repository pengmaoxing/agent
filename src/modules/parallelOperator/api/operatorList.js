import request from '@/utils/request'
import qs from 'qs'


//保存运营商
export function saveRetail(data) {
  return request({
    url: '/auth/company/retail/save_rewrite',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//修改运营商
export function modifyRetail(data) {
  return request({
    url: '/auth/company/retail/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}

//获取运营商列表
export function getList(pageNumber, pageSize, form) {
  return request({
    url: '/auth/company/retail/list_rewrite',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: form.name,
      contact: form.contact,
      status: form.status,
    }
  })
}

//获取级别配置
export function getLevelConfig() {
  return request({
    url: '/auth/agent_level/find_by_companyId',
    method: 'get',
    params: {}
  })
}

//获取级别配置
export function saveLevelConfig(form) {
  return request({
    url: '/auth/agent_level/update',
    method: 'post',
    data: qs.stringify(
      form
    )
  })
}
