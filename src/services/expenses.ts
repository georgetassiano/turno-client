import auth from '@/plugins/auth'
import type { CreateExpenseRequest } from '@/types/expense'

export function getExpenses(yearMonth: string): Promise<any> {
  return auth.http({
    url: `/expenses?year-month=${yearMonth}`
  })
}

export function createExpense(expense: CreateExpenseRequest): Promise<any> {
  return auth.http({
    url: '/expenses',
    method: 'post',
    data: expense
  })
}

export function getDatesExpenses(): Promise<any> {
  return auth.http({
    url: '/expenses/dates'
  })
}
