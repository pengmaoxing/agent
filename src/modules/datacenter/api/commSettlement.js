import request from '@/utils/request'
import qs from 'qs'

/**
 *统计与列表
 */
export function getTotalAndList(pageNum, pageSize, month, companyName) {
  return request({
    url: '/order/commission/commission_data',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      start_payTime: month,
      companyName: companyName
    }
  })
}

/**
 * 获取所有佣金
 */
export function getTotalCommission() {
  return request({
    url: '/order/commission/total_commission',
    method: 'get',
    params: {}
  })
}

//提现申请
export function submitWithdraw(form) {
  return request({
    url: '/auth/commission_withdraw_apply/apply',
    method: 'post',
    data: qs.stringify({
      companyId: form.companyId,
      userId: form.userId,
      amount: form.amount,
      companyAccountId: form.companyAccountId
    })
  })
}

//服务结算申请
export function submitServiceWithdraw(amount) {
  return request({
    url: '/auth/commission_withdraw_apply/service_provider_withdraw',
    method: 'post',
    data: qs.stringify({
      amount: amount
    })
  })
}

//账户下拉
export function getAccountOption(cid) {
  return request({
    url: '/auth/company_account/select_item_by_id',
    method: 'get',
    params: {
      companyId: cid
    }
  })
}

//报表导出
export function getQualityCommission(date, type) {
  return request({
    url: '/order/commission/quality_commission_export',
    method: 'post',
    responseType: 'blob',
    params: {
      beginDate: date[0],
      endDate: date[1],
      merchantType: type
    }
  })
}


//信汇下载汇总
export function downloadXinhuiCollect(form) {
  return request({
    url: '/export/admin/cmf_excel',
    method: 'get',
    responseType: 'blob',
    params: {
      begin: form.begin,
      end: form.end,
      companyId: form.companyId,
    }
  })
}


//获取服务商下拉列表
export function getProviderItem() {
  return request({
    url: '/auth/agent_alias/provider_select_item',
    method: 'get',
    params: {}
  })
}
