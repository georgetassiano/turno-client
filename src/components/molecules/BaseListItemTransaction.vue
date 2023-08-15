<template>
  <v-list-item class="border-b border-primary pa-0 pb-2">
    <div class="flex-column">
      <v-list-item-title class="text-xs font-weight-bold text-primary pa-0">{{
        props.description
      }}</v-list-item-title>
      <v-list-item-title class="text-xs line-height-sm text-primary pa-0">{{
        formatDateToLocale(props.date)
      }}</v-list-item-title>
    </div>
    <template #append>
      <v-list-item-title
        class="text-md text-uppercase font-weight-bold"
        :class="[isDebit ? 'text-danger' : 'text-primary']"
      >
        {{ `${isDebit ? '-' : ''}${formatValueToLocaleCurrency(props.amount)}` }}
      </v-list-item-title>
    </template>
  </v-list-item>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Transaction } from '@/types/transaction'
import { formatValueToLocaleCurrency, formatDateToLocale } from '@/utils/formats'

const props = defineProps<Transaction>()

const isDebit = computed(() => props.type === 'debit')
</script>
