<template>
  <v-card class="px-4 py-4" rounded="0">
    <v-card-title class="text-xs text-primary text-uppercase pa-0">{{ props.title }}</v-card-title>
    <v-card-item class="pa-0">
      <v-list class="py-2">
        <base-list-item-transaction
          v-for="(transaction, index) in props.transactions"
          :key="index"
          v-bind="transaction"
        />
      </v-list>
    </v-card-item>
  </v-card>
</template>
<script setup lang="ts">
import BaseListItemTransaction from '@/components/molecules/BaseListItemTransaction.vue'
import type { Transaction } from '@/types/transaction'
const props = defineProps<{
  transactions: Transaction[]
  title: string
}>()
</script>
