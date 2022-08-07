import Layout from '@/layout'
export default {
  path: '/workOrder',
  component: Layout,
  name:'workOrder',
  redirect: '/workOrder/marketing',
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [
    {
      path: 'marketing',
      name:'marketing',
      component: () => import('@/views/workOrder/marketing'),
      meta: { title: '运营工单' }
    },
    {
      path: 'operate',
      name:'operate',
      component: () => import('@/views/workOrder/operate/index.vue'),
      meta: { title: '运维工单' }
    }
  ]
}
