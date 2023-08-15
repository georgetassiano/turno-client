<template>
  <the-side-menu />
  <the-header />
  <v-main>
    <RouterView />
  </v-main>
</template>
<script setup lang="ts">
import TheSideMenu from '@/components/organims/TheSideMenu.vue'
import TheHeader from '@/components/organims/TheHeader.vue'
import { RouterView } from 'vue-router'
</script>
