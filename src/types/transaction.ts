type TransactionType = 'credit' | 'debit'

export interface Transaction {
  description: string
  date: string
  type?: TransactionType
  amount: number
}
