<template>
  <div v-if="loadingStart" class="text-center pt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <v-card color="default-light-2">
      <v-card-title>
        <v-select
          v-model="yearMonth"
          variant="underlined"
          color="white"
          width="20"
          :items="dates"
          :menu-icon="mdiChevronDown"
          :loading="loadingSelect"
          @update:model-value="updateExpenses"
        >
        </v-select>
      </v-card-title>
    </v-card>
    <v-card>
      <v-card-item class="h-75 pb-12 pa-0">
        <FinancialList :transactions="expenses" />
      </v-card-item>
    </v-card>
    <div class="button-add">
      <v-btn
        rounded="xl"
        color="primary"
        size="50"
        elevation="0"
        @click="$router.push('/expenses/new')"
      >
        <v-icon size="50" :icon="mdiPlus"></v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getExpenses, getDatesExpenses } from '@/services/expenses'
import { ref, onMounted } from 'vue'
import FinancialList from '@/views/Components/Common/FinancialList.vue'
import type { Ref } from 'vue'
import { mdiPlus, mdiChevronDown } from '@mdi/js'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const loadingStart = ref(false)
const loadingSelect = ref(false)
const dates: Ref<string[]> = ref([])
const yearMonth = ref('')
const expenses: Ref<Transaction[]> = ref([])
onMounted(async () => {
  try {
    loadingStart.value = true
    await getDates()
    const response = await getExpenses(yearMonth.value)
    expenses.value = formatExpenses(response.data.data)
  } catch (error) {
    alertStore.enableAlert({
      message: 'Something went wrong',
      type: 'error'
    })
  } finally {
    loadingStart.value = false
  }
})

function formatExpenses(array: []) {
  return array.map((value) => {
    return {
      description: value.description,
      amount: value.amount,
      date: value.created_at,
      type: 'debit'
    }
  })
}

function getDates() {
  return getDatesExpenses().then((response) => {
    dates.value = response.data.data
    yearMonth.value = response.data.data[0]
  })
}

function updateExpenses() {
  loadingSelect.value = true
  getExpenses(yearMonth.value)
    .then((response) => {
      expenses.value = formatExpenses(response.data.data)
    })
    .finally(() => {
      loadingSelect.value = false
    })
}
</script>

<style scoped lang="scss">
.button-add {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>
