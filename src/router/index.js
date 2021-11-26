import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Index = () => import('@/views2/index')
const Index2 = () => import('@/views/index')
const Test = () => import('@/components/WindowsTable')
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    meta: {
      title: 'Windows监控面板',
    }
  },
  {
    path: '/index2',
    component: Index2
  },
  {
    path: '/test',
    component: Test
  }
]
const router = new VueRouter({
  mode: "history",
  routes
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
export default router
