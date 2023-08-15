<template>
  <v-card :color="backgroundColorCard" class="px-4 py-4" rounded="0">
    <v-row class="ma-0">
      <v-col cols="8" class="pa-0">
        <div class="flex-column">
          <p class="text-xs line-height-sm text-primary font-weight-black">{{ props.title }}</p>
          <p class="text-lg text-primary pt-1">
            {{ formatValueToLocaleCurrency(props.totalTransaction) }}
          </p>
        </div>
      </v-col>
      <v-col cols="4" class="d-flex pa-0 justify-center">
        <v-btn color="primary" variant="text" class="pa-0" :to="props.btnIcon.route">
          <div class="d-flex flex-column align-center">
            <v-icon size="x-large" :icon="mdiPlus"></v-icon>
            <p class="text-xxs pt-1">{{ props.btnIcon.text }}</p>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import { formatValueToLocaleCurrency } from '@/utils/formats'
import { mdiPlus } from '@mdi/js'

interface btnRouteIcon {
  text: string
  route: string
}

const props = defineProps<{
  totalTransaction: number
  btnIcon: btnRouteIcon
  backgroundColorCard: string
  title: string
}>()
</script>
