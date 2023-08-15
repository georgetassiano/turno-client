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
          @update:model-value="updateChecks"
        >
        </v-select>
      </v-card-title>

      <v-tabs v-model="tab" class="container-flex px-1">
        <v-tab v-for="item in tabs" :key="item.tab" :value="item.tab" class="pa-0 ma-0">
          <p class="text-xs text-uppercase text-primary pa-0 ma-0">
            {{ item.tab }}
          </p>
        </v-tab>
      </v-tabs>

      <v-card-item class="pa-0">
        <v-window v-model="tab">
          <v-window-item v-for="item in tabs" :key="item.tab" :value="item.tab">
            <FinancialList class="pb-16" :transactions="selectedChecks" />
          </v-window-item>
        </v-window>
      </v-card-item>
    </v-card>
    <div class="button-add">
      <v-btn
        rounded="xl"
        color="primary"
        size="50"
        elevation="0"
        @click="$router.push('/checks/new')"
      >
        <v-icon size="50" :icon="mdiPlus"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiPlus, mdiChevronDown } from '@mdi/js'
import FinancialList from '@/views/Components/Common/FinancialList.vue'
import { ref, onMounted, computed } from 'vue'
import { getChecks, getDatesChecks } from '@/services/checks'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()
const dates = ref([])
const loadingSelect = ref(false)
const checks = ref([])
const loadingStart = ref(false)
const tab = ref('approved')
const tabs = [{ tab: 'pending' }, { tab: 'approved' }, { tab: 'rejected' }]
const yearMonth = ref('')

function getDates() {
  return getDatesChecks().then((response) => {
    dates.value = response.data.data
    yearMonth.value = response.data.data[0]
  })
}

function formatChecks(array: []) {
  return array.map((value) => {
    return {
      description: value.description,
      amount: value.amount,
      date: value.created_at,
      type: 'credit'
    }
  })
}

const selectedChecks = computed(() => {
  if (checks.value[tab.value] !== undefined) {
    return formatChecks(checks.value[tab.value])
  } else {
    return []
  }
})

function updateChecks() {
  loadingSelect.value = true
  getChecks(yearMonth.value)
    .then((response) => {
      checks.value = response.data
    })
    .catch(() => {
      alertStore.enableAlert({
        message: 'Something went wrong',
        type: 'error'
      })
    })
    .finally(() => {
      loadingSelect.value = false
    })
}

onMounted(async () => {
  try {
    loadingStart.value = true
    await getDates()
    const response = await getChecks(yearMonth.value)
    checks.value = response.data
  } catch (error) {
    alertStore.enableAlert({
      message: 'Something went wrong',
      type: 'error'
    })
  } finally {
    loadingStart.value = false
  }
})
</script>

<style lang="scss">
.v-slide-group__content {
  display: flex !important;
  width: 100% !important;
  justify-content: space-between !important;
}

.button-add {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>
