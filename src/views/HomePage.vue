<template>
  <div v-if="loadingStart" class="text-center pt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <v-card color="default" class="flex px-4 py-2" rounded="0">
      <v-card-title class="pa-0 d-flex">
        <div class="flex-column">
          <p class="text-xs text-white font-weight-bold">Current balance</p>
          <p class="text-xl line-height-sm text-white pb-3">
            {{ formatValueToLocaleCurrency(currentBalance) }}
          </p>
        </div>
        <v-select
          v-model="yearMonth"
          variant="underlined"
          class="selection-input"
          :items="dates"
          :menu-icon="mdiChevronDown"
          @update:model-value="updateTransactions"
        >
        </v-select>
      </v-card-title>
    </v-card>
    <base-card-transaction-total
      :total-transaction="incomeTotal"
      background-color-card="default-light-1"
      title="Incomes"
      :btn-icon="{ text: 'Deposit check', route: '/checks' }"
    />
    <base-card-transaction-total
      :total-transaction="expenseTotal"
      background-color-card="default-light-2"
      title="Expenses"
      :btn-icon="{ text: 'Purchase', route: '/expenses' }"
    />
    <FinancialList :transactions="transactions" title="Transactions" />
  </div>
</template>
<script setup lang="ts">
import BaseCardTransactionTotal from '@/components/molecules/BaseCardTransactionTotal.vue'
import FinancialList from '@/views/Components/Common/FinancialList.vue'
import { mdiChevronDown } from '@mdi/js'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Transaction } from '@/types/transaction'
import { getBalance } from '@/services/account'
import { getTransactions, getDatesTransactions } from '@/services/transactions'
import { formatValueToLocaleCurrency } from '@/utils/formats'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const transactions: Ref<Transaction[]> = ref([])
const loadingStart = ref(false)

const currentBalance = ref(0.0)

const dates: Ref<string[]> = ref([])
const yearMonth = ref('')
const incomeTotal = ref(0.0)
const expenseTotal = ref(0.0)

const typeTransformation = {
  checks: 'credit',
  expenses: 'debit'
}

function formatTransactions(array: []) {
  return array.map((value) => {
    return {
      description: value.transactable.description,
      amount: value.transactable.amount,
      date: value.created_at,
      type: typeTransformation[value.transactable_type]
    }
  })
}

onMounted(async () => {
  try {
    loadingStart.value = true
    await getDates()
    const [balance, transaction] = await Promise.all([
      getBalance(),
      getTransactions(yearMonth.value)
    ])
    currentBalance.value = balance.data.balance
    incomeTotal.value = transaction.data.meta.incomes
    expenseTotal.value = transaction.data.meta.expenses
    const transactionsReformatted = formatTransactions(transaction.data.data)
    transactions.value = transactionsReformatted
  } catch (error) {
    alertStore.enableAlert({
      message: 'Something went wrong',
      type: 'error'
    })
  } finally {
    loadingStart.value = false
  }
})

function getDates() {
  return getDatesTransactions().then((response) => {
    dates.value = response.data.data
    yearMonth.value = response.data.data[0]
  })
}

async function updateTransactions() {
  const response = await getTransactions(yearMonth.value)
  incomeTotal.value = response.data.meta.incomes
  expenseTotal.value = response.data.meta.expenses
  const transactionsReformatted = formatTransactions(response.data.data)
  transactions.value = transactionsReformatted
}
</script>
<style lang="scss" scoped>
.v-input {
  display: flex;
  justify-content: end;
  align-self: center;
  .v-field {
    &__input {
      padding: 0px !important;
    }
    display: flex;
  }
}

.v-select__selection {
  display: flex !important;
  margin: 0px !important;
  margin-top: auto !important;
  padding: 0px !important;
  align-self: center;
  &-text {
    color: #ffffff;
    font-size: 1.25rem;
    text-align: center;
  }
}

.v-field__append-inner {
  color: #ffffff;
  padding: 0px !important;
  padding-bottom: 4px !important;
  margin-top: auto !important;
}

.v-field__outline {
  display: none !important;
}
</style>
