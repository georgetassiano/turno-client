// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md2 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const vuetify = createVuetify({
  blueprint: md2,
  components,
  directives,
  defaults: {
    VCard: {
      variant: 'flat'
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          default: '#BDE0FE',
          'default-light-1': '#DAEFFF',
          'default-light-2': '#F1F9FE',
          primary: '#2798fa',
          'primary-light-1': '#6ab7f8',
          secondary: '#f4f5f7',
          info: '#11cdef',
          success: '#2dce89',
          danger: '#FF0000',
          'danger-light': '#fee2e2',
          warning: '#fb6340'
        }
      }
    }
  }
})

export default vuetify
