import Layout from '@/layout'
export default {
  path: '/order',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/order'),
      meta: { title: '订单管理', icon: 'dingdan' }
    }
  ]
}
