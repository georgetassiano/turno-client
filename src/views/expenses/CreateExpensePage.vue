<template>
  <div v-if="loadingStart" class="text-center pt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <v-card color="default-light-2" class="px-4 py-6">
      <v-card-title class="pa-0">
        <div class="flex-column">
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <p class="">Current balance</p>
          </v-label>

          <p class="text-md line-height-sm text-primary-light-1 font-weight-bold pt-2">
            {{ formatValueToLocaleCurrency(currentBalance) }}
          </p>
        </div>
      </v-card-title>
    </v-card>
    <v-card class="h-100">
      <v-form @submit.prevent="submitExpense">
        <div class="px-4 py-14 flex-column justify-space-between">
          <v-row>
            <v-col cols="9">
              <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
                <v-icon size="20" :icon="mdiCurrencyUsd"> </v-icon>
                <p class="pl-3">Amount</p>
              </v-label>
              <v-text-field
                v-model.number="form.amount"
                type="number"
                step=".01"
                required
                variant="underlined"
                class="text-primary text-xl"
                :error-messages="v$.amount.$errors.map((e) => e.$message)"
              ></v-text-field>
            </v-col>
            <v-col cols="3" align-self="center">
              <p class="text-uppercase text-primary text-lg align-self-center">USD</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9">
              <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
                <v-icon size="20" :icon="mdiCalendarRange"></v-icon>
                <p class="pl-3">Date</p>
              </v-label>
              <v-text-field variant="underlined" readonly class="text-primary text-xl" width="75%">
                {{ formatDateToHuman(new Date()) }}
              </v-text-field>
            </v-col>
          </v-row>

          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
            <v-icon size="20" :icon="mdiStar"></v-icon>
            <p class="pl-3">Description</p>
          </v-label>
          <v-text-field
            v-model="form.description"
            required
            variant="underlined"
            class="text-primary text-xl"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
          ></v-text-field>
        </div>
        <div class="pa-4">
          <v-btn
            class="text-xxs text-uppercase py-5"
            color="primary"
            width="100%"
            height="100%"
            elevation="0"
            type="submit"
            :loading="loadingSubmit"
          >
            <p class="font-weight-bold">Add Purchase</p>
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { mdiCurrencyUsd, mdiCalendarRange, mdiStar } from '@mdi/js'
import { ref, onMounted } from 'vue'
import { formatValueToLocaleCurrency, formatDateToHuman } from '@/utils/formats'
import { createExpense } from '@/services/expenses'
import { useRouter } from 'vue-router'
import type { CreateExpenseRequest } from '@/types/expense'
import type { Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useAlertStore } from '@/stores/alert'
import { getBalance } from '@/services/account'

const alertStore = useAlertStore()
const loadingStart = ref(false)
const loadingSubmit = ref(false)
const router = useRouter()
const currentBalance = ref(0.0)
const form: Ref<CreateExpenseRequest> = ref({
  amount: 0,
  description: ''
})
const $externalResults = ref({})
const rules = {
  amount: { required, minValue: minValue(0.01) },
  description: { required }
}
const v$ = useVuelidate(rules, form, { $externalResults })

onMounted(async () => {
  try {
    loadingStart.value = true
    const response = await getBalance()
    currentBalance.value = response.data.balance
  } catch (error) {
    alertStore.enableAlert({
      message: 'Something went wrong',
      type: 'error'
    })
  } finally {
    loadingStart.value = false
  }
})
async function submitExpense() {
  v$.value.$clearExternalResults()
  if (!(await v$.value.$validate())) return
  loadingSubmit.value = true
  createExpense(form.value)
    .then(() => {
      router.push('/expenses')
    })
    .catch(async (err) => {
      if (err.response?.status === 422) {
        $externalResults.value = err.response.data.errors
      } else {
        alertStore.enableAlert({
          message: 'Something went wrong',
          type: 'error'
        })
      }
    })
    .finally(() => {
      loadingSubmit.value = false
    })
}
</script>

<style lang="scss">

.v-field__input {
  padding-top: 0px !important;
  padding-left: 32px !important;
  min-height: 0px !important;
  font-size: 22px;
}
</style>
