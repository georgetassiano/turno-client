<template>
  <div v-if="loadingStart" class="text-center pt-16">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else>
    <v-card color="default-light-2" class="px-4 pb-6">
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
    <v-card class="">
      <v-form @submit.prevent="submitCheck">
        <div class="px-4 pt-14 flex-column justify-space-between">
          <v-row>
            <v-col cols="9">
              <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold">
                <v-icon size="20" :icon="mdiCash"></v-icon>
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
              >
              </v-text-field>
              <v-label class="text-xs text-primary-light-1 text-wrap">
                <p class="">
                  *The money will be deposited in your account once is the check is accepted.
                </p>
              </v-label>
            </v-col>
            <v-col cols="3" align-self="center">
              <p class="text-uppercase text-primary text-lg align-self-center">USD</p>
            </v-col>
          </v-row>
          <v-label class="text-xs text-primary-light-1 text-uppercase font-weight-bold pt-6">
            <v-icon size="20" :icon="mdiStar"></v-icon>
            <p class="pl-3">Description</p>
          </v-label>
          <v-text-field
            v-model="form.description"
            required
            variant="underlined"
            class="text-primary text-xl"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
          >
          </v-text-field>
        </div>
        <div class="upload-area pa-4">
          <v-file-input
            v-model="form.file"
            :error-messages="v$.file.$errors.map((e) => e.$message)"
            class="upload-button border-dashed text-xxs text-uppercase py-10 flex-column justify-center"
            label="File input"
          ></v-file-input>
        </div>
        <div class="button-end-page pa-4">
          <v-btn
            class="text-xxs text-uppercase py-5"
            color="primary"
            width="100%"
            height="100%"
            elevation="0"
            type="submit"
          >
            <p class="font-weight-bold">Deposit check</p>
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mdiCash, mdiStar } from '@mdi/js'
import { useAlertStore } from '@/stores/alert'
import { formatValueToLocaleCurrency } from '@/utils/formats'
import { getBalance } from '@/services/account'
import type { Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { createCheck } from '@/services/checks'
import { useRouter } from 'vue-router'

const router = useRouter()
const alertStore = useAlertStore()

const loadingStart = ref(false)

const loadingSubmit = ref(false)

const currentBalance = ref(0.0)

const form: Ref<any> = ref({
  amount: 0.0,
  description: '',
  file: null
})

const $externalResults = ref({})
const rules = {
  amount: { required, minValue: minValue(0.01) },
  description: { required },
  file: { required }
}
const v$ = useVuelidate(rules, form, { $externalResults })

onMounted(async () => {
  loadingStart.value = true
  try {
    const result = await getBalance()
    currentBalance.value = result.data.balance
  } catch (error) {
    alertStore.enableAlert({
      message: 'Something went wrong',
      type: 'error'
    })
  } finally {
    loadingStart.value = false
  }
})
async function submitCheck() {
  v$.value.$clearExternalResults()
  if (!(await v$.value.$validate())) return
  loadingSubmit.value = true
  createCheck({
    amount: form.value.amount,
    description: form.value.description,
    file: form.value.file[0]
  })
    .then(() => {
      router.push('/checks')
    })
    .catch((err) => {
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
.border-dashed {
  border: 2px dashed rgba(var(--v-theme-primary-light-1), 1) !important;
}

.upload-button {
  .v-btn__content {
    display: flex !important;
    flex-direction: column !important;
  }
}

.button-end-page {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.v-field__input {
  padding-top: 0px !important;
  padding-left: 32px !important;
  min-height: 0px !important;
  font-size: 22px;
}
</style>
