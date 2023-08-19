import request from '@/utils/request'
import qs from 'qs'

//获取运营商列表
export function getList(pageNumber, pageSize, form) {
  return request({
    url: '/auth/team/team_list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: form.name,
      contact: form.contact,
    }
  })
}

//保存运营商
export function saveAgent(data) {
  return request({
    url: '/auth/company/retail/save_by_opera/release',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}


//修改运营商
export function modifyAgent(data) {
  return request({
    url: '/auth/company/retail/update',
    method: 'post',
    data: qs.stringify(
      data
    )
  })
}



//保存升级
export function saveLevel(agentLevel) {
  return request({
    url: '/auth/agent_level_apply_record/save_rewrite',
    method: 'post',
    data: qs.stringify(
      agentLevel
    )
  })
}


//获取代理级别
export function getAgentLevel() {
  return request({
    url: '/config/admin/config_enum/AgentLevel',
    method: 'get',
    params: {}
  })
}

//升级回显级别
export function getUpInfo() {
  return request({
    url: '/auth/company/retail/find_level_info',
    method: 'get',
    params: {}
  })
}


//获取二维码图片
export function getQRimg(path) {
  return request({
    url: '/auth/team/invite_qr_code',
    method: 'get',
    params: {
      path: path,
      reset: false
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


