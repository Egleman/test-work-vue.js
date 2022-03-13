import Vue from 'vue'
import VueRouter from 'vue-router'

import FormComponent from '../view/FormComponent.vue'
import PreviewComponent from '../view/PreviewComponent.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: FormComponent },
    { path: '/preview', component: PreviewComponent },
]

const router = new VueRouter({
    mode: 'history',
    routes
  })

  export default router;