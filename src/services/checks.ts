import auth from '@/plugins/auth'
import type { CreateCheckRequest } from '@/types/check'

export function getChecks(yearMonth: string) {
  return auth.http({
    url: `/checks?year-month=${yearMonth}`
  })
}

export function createCheck(check: CreateCheckRequest) {
  console.log(check)
  return auth.http({
    url: '/checks',
    method: 'post',
    data: check,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getDatesChecks(): Promise<any> {
  return auth.http({
    url: '/expenses/dates'
  })
}
