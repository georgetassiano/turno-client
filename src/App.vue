<template>
  <v-app>
    <div v-if="alertStore.showAlert" class="alert-container">
      <v-alert
        v-model="alertStore.showAlert"
        :icon="false"
        closable
        position="absolute"
        :type="alertStore.type"
        density="compact"
        :text="alertStore.message"
      ></v-alert>
    </div>
    <RouterView />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
const alertStore = useAlertStore()
</script>
<style lang="scss" scoped>
.alert-container {
  position: relative;
  display: flex;
  justify-content: center;
  top: 16px;
  z-index: 9999;
}
</style>
