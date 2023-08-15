import { format } from 'date-fns'
import enUs from 'date-fns/locale/en-US'

export function formatValueToLocaleCurrency(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export function formatDateToLocale(date: string) {
  return format(new Date(date), 'MM/dd/yyyy, hh:mm aa', {
    locale: enUs
  })
}

export function formatDateToHuman(date: string) {
  return format(new Date(date), 'MMMM d, yyyy', {
    locale: enUs
  })
}
