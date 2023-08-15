import auth from '@/plugins/auth'

export function getTransactions(yearMonth: string): Promise<any> {
  return auth.http({
    url: `/transactions?year-month=${yearMonth}`
  })
}

export function getDatesTransactions(): Promise<any> {
  return auth.http({
    url: `/transactions/dates`
  })
}
