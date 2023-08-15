<template>
  <v-card class="px-0 pb-6">
    <v-card-title class="card-title pa-0 pt-12">
      <v-row justify="center" align="center" class="pt-12 pb-6 ma-0">
        <p class="text-xl text-center text-white">BNB Bank</p>
      </v-row>
    </v-card-title>
    <v-form @submit.prevent="submitRegister">
      <v-card-item class="px-8 py-8">
        <v-text-field
          v-model="form.name"
          class="text-primary text-xl py-3"
          variant="outlined"
          required
          :error-messages="v$.name.$errors.map((e) => e.$message)"
        >
          <template #label>
            <p class="text-xs text-lowercase text-default">username</p>
          </template>
        </v-text-field>
        <v-text-field
          v-model="form.email"
          class="text-primary text-xl py-3"
          variant="outlined"
          type="email"
          required
          :error-messages="v$.email.$errors.map((e) => e.$message)"
        >
          <template #label>
            <p class="text-xs text-lowercase text-default">email</p>
          </template>
        </v-text-field>
        <v-text-field
          v-model="form.password"
          class="text-primary text-xl py-3"
          variant="outlined"
          type="password"
          required
          :error-messages="v$.password.$errors.map((e) => e.$message)"
        >
          <template #label>
            <p class="text-xs text-lowercase text-default">password</p>
          </template>
        </v-text-field>
        <v-text-field
          v-model="form.password_confirmation"
          class="text-primary text-xl py-3"
          type="password"
          variant="outlined"
          required
          :error-messages="v$.password_confirmation.$errors.map((e) => e.$message)"
        >
          <template #label>
            <p class="text-xs text-lowercase text-default">confirm password</p>
          </template>
        </v-text-field>
      </v-card-item>
      <v-card-actions class="py-0">
        <v-col class="pt-0">
          <v-btn
            class="text-xxs text-uppercase py-4 mt-0 mb-6"
            variant="flat"
            color="primary"
            width="100%"
            height="100%"
            elevation="0"
            type="submit"
            :loading="loading"
          >
            <p class="font-weight-bold">Sign Up</p>
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-form>
    <div class="d-flex justify-center align-center pt-2">
      <v-divider :thickness="4" length="26" color="primary"></v-divider>
    </div>
    <v-card-actions class="pa-0">
      <v-col>
        <v-btn
          class="text-xxs text-none"
          color="primary"
          width="100%"
          height="100%"
          elevation="0"
          to="/login"
        >
          <p class="">Already have an account?</p>
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, sameAs } from '@vuelidate/validators'
import type { RequestRegisterUser } from '@/types/auth'
import { useAuth } from 'vue-auth3'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const auth = useAuth()
const loading = ref(false)
const $externalResults = reactive({})
const form: RequestRegisterUser = reactive({
  email: '',
  password: '',
  password_confirmation: '',
  name: ''
})
const password = computed(() => form.password)
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
  password_confirmation: { required, sameAs: sameAs(password) },
  name: { required }
}
const v$ = useVuelidate(rules, form, { $externalResults })

async function submitRegister() {
  v$.value.$clearExternalResults()
  if (!(await v$.value.$validate())) return
  loading.value = true
  auth
    .register({
      data: {
        ...form,
        device_name: navigator.userAgent
      },
      redirect: { name: 'home' }
    })
    .catch((err) => {
      if (err.response?.status === 422) {
        Object.assign($externalResults, err.response.data.errors)
      } else {
        alertStore.enableAlert({
          message: 'Something went wrong',
          type: 'error'
        })
      }
    })
    .finally(() => (loading.value = false))
}
</script>

<style lang="scss" scoped>
$radius: 2rem;
.card-title {
  background-color: rgba(var(--v-theme-primary), 1);
}
</style>
