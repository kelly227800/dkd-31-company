import Layout from '@/layout'
export default {
  path: '/strategy',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/strategy'),
      meta: { title: '策略管理', icon: 'celve' }
    }
  ]
}
 