import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleDot,
  faCircleHalfStroke,
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleDot, faCircleHalfStroke, faCircleCheck, faCircleXmark)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
