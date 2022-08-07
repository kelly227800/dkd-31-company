import Layout from '@/layout'
export default {
  path: '/people',
  component: Layout,
  name:'people',
  redirect: '/people/peopleList',
  meta: { title: '人员管理', icon: 'renyuan' },
  children: [
    {
      path: 'peopleList',
      name:'peopleList',
      component: () => import('@/views/people/peopleList'),
      meta: { title: '人员列表' }
    },
    {
      path: 'peopleStatistics',
      name:'peopleStatistics',
      component: () => import('@/views/people/peopleStatistics'),
      meta: { title: '人效统计' }
    },
    {
      path: 'workList',
      name:'workList',
      component: () => import('@/views/people/workList'),
      meta: { title: '工作量列表' }
    }
  ]
}