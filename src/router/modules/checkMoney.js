import Layout from '@/layout'
export default {
  path: '/checkMoney',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/checkMoney'),
      meta: { title: '对账统计', icon: 'duizhang' }
    }
  ]
}
