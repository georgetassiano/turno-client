<template>
  <v-navigation-drawer v-model="sideMenuStore.showSideMenu" temporary color="primary" width="200">
    <v-sheet color="default" class="text-center py-6">
      <p class="text-xxl text-white">BNB Bank</p>
    </v-sheet>

    <v-divider></v-divider>

    <v-list color="secondary" class="py-4">
      <v-list-item v-for="link in links" :key="link.text" class="px-6" link :to="link.route">
        <template #prepend>
          <v-icon :icon="link.icon" />
        </template>

        <v-list-item-title class="text-xxs text-uppercase text-white">{{
          link.text
        }}</v-list-item-title>
      </v-list-item>
      <v-list-item class="px-6" link @click="logout">
        <template #prepend>
          <v-icon :icon="mdiLogout" />
        </template>

        <v-list-item-title class="text-xxs text-uppercase text-white">logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import {
  mdiScaleUnbalanced,
  mdiArrowDownRight,
  mdiArrowUpRight,
  mdiCash100,
  mdiBell,
  mdiCog,
  mdiAccount,
  mdiHelpCircle,
  mdiLogout
} from '@mdi/js'
import { useSideMenuStore } from '@/stores/sideMenu'
import auth from '@/plugins/auth'
const sideMenuStore = useSideMenuStore()
function logout() {
  auth.logout({
    makeRequest: true,
    redirect: { name: 'login' }
  })
}
const links = [
  {
    icon: mdiScaleUnbalanced,
    text: 'balance',
    route: '/'
  },
  {
    icon: mdiArrowUpRight,
    text: 'incomes'
  },
  {
    icon: mdiArrowDownRight,
    text: 'expenses',
    route: '/expenses'
  },
  {
    icon: mdiCash100,
    text: 'checks',
    route: '/checks'
  },
  {
    icon: mdiBell,
    text: 'notifications'
  },
  {
    icon: mdiAccount,
    text: 'profile'
  },
  {
    icon: mdiCog,
    text: 'settings'
  },
  {
    icon: mdiHelpCircle,
    text: 'help'
  }
]
</script>
