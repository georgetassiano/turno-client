import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

type AlertType = 'success' | 'error' | 'warning' | 'info'
interface Alert {
  type: AlertType
  message: string
}

export const useAlertStore = defineStore('alert', {
  state: () => ({
    showAlert: false,
    type: '',
    message: ''
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    enableAlert(alert: Alert) {
      this.type = alert.type
      this.message = alert.message
      this.showAlert = true
    }
  }
})
