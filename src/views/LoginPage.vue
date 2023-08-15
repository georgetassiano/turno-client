<template>
  <v-card class="px-0 pb-6">
    <v-card-title class="card-title pa-0 pt-12">
      <v-row justify="center" align="center" class="pt-12 pb-6 ma-0">
        <p class="text-xl text-center text-white">BNB Bank</p>
      </v-row>
    </v-card-title>
    <v-form @submit.prevent="submitLogin">
      <v-row justify="center" align-content="center" class="h-100">
        <v-col cols="12">
          <v-card-item class="px-8 pb-8">
            <v-text-field
              v-model="form.email"
              class="text-primary text-xl py-3"
              type="email"
              required
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              variant="outlined"
            >
              <template #label>
                <p class="text-xs text-lowercase text-default">email</p>
              </template>
            </v-text-field>
            <v-text-field
              v-model="form.password"
              class="text-primary text-xl py-3"
              type="password"
              required
              :error-messages="v$.password.$errors.map((e) => e.$message)"
              variant="outlined"
            >
              <template #label>
                <p class="text-xs text-lowercase text-default">password</p>
              </template>
            </v-text-field>
          </v-card-item>

          <v-card-actions class="py-0">
            <v-col class="pt-0">
              <v-btn
                class="text-xxs text-uppercase py-4 mt-0 mb-6"
                variant="outlined"
                color="primary"
                width="100%"
                height="100%"
                elevation="0"
                type="submit"
                :loading="loading"
              >
                <p class="font-weight-bold">Sign in</p>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-col>
      </v-row>
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
          to="/register"
        >
          <p class="">No have an account?</p>
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from 'vue-auth3'
import { RequestLogin } from '@/types/auth'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alert'

const auth = useAuth()
const router = useRouter()
const alertStore = useAlertStore()
const form: RequestLogin = reactive({
  email: '',
  password: ''
})
const loading = ref(false)
const $externalResults = reactive({})
const rules = {
  email: { required, email },
  password: { required }
}
const v$ = useVuelidate(rules, form, { $externalResults })

onMounted(() => {
  if (auth.check()) {
    router.push({ name: 'home' })
  }
})

async function submitLogin() {
  v$.value.$clearExternalResults()
  if (!(await v$.value.$validate())) return
  loading.value = true
  auth
    .login({
      data: {
        ...form,
        device_name: navigator.userAgent
      },
      redirect: { name: 'home' }
    })
    .catch(async (err) => {
      if (err.response?.status === 422) {
        Object.assign($externalResults, err.response.data.errors)
      } else {
        alertStore.enableAlert({
          message: 'Something went wrong',
          type: 'error'
        })
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
$radius: 2rem;
.card-title {
  background-color: rgba(var(--v-theme-primary), 1);
}
</style>
