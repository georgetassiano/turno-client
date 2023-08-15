<template>
  <v-app-bar :color="appBarConfig.colorBar" elevation="0">
    <v-app-bar-nav-icon
      :color="appBarConfig.colorIcon"
      class="pa-0 ma-0"
      @click="sideMenuStore.changeVisibility()"
    />
    <div class="mx-auto">
      <v-toolbar-title :class="appBarConfig.colorText">{{ appBarConfig.title }}</v-toolbar-title>
    </div>
  </v-app-bar>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useSideMenuStore } from '@/stores/sideMenu'
const route = useRouter()
const sideMenuStore = useSideMenuStore()
interface IRoute {
  title: string
  colorBar: string
  colorText: string
  colorIcon: string
}
interface IRouteRecord {
  [key: string]: IRoute
}
const appBarConfig = ref({
  title: 'BNB Bank',
  colorBar: 'default',
  colorText: 'text-white',
  colorIcon: 'white'
})

const routes: IRouteRecord = {
  home: {
    title: 'BNB Bank',
    colorBar: 'default',
    colorText: 'text-white',
    colorIcon: 'white'
  },
  expenses: {
    title: 'EXPENSES',
    colorBar: 'default-light-2',
    colorText: 'text-primary',
    colorIcon: 'primary'
  },
  checks: {
    title: 'Checks',
    colorBar: 'default-light-2',
    colorText: 'text-primary',
    colorIcon: 'primary'
  }
}

watch(route.currentRoute, async (currentRoute) => {
  appBarConfig.value = routes[currentRoute.name] ? routes[currentRoute.name] : routes['home']
})
</script>
