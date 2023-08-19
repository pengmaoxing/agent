import request from '@/utils/request'
import qs from 'qs'


//获取列表
export function getList(pageNumber, pageSize, form) {
  return request({
    url: '/auth/agent_level_apply_record/list',
    method: 'get',
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      name: form.name,
      contact: form.contact,
    }
  })
}


export function submitAudit(id, status) {
  return request({
    url: '/auth/agent_level_apply_record/audit',
    method: 'post',
    data: qs.stringify({
      agentLevelApplyRecordId: id,
      applyStatus: status
    })
  })
}
