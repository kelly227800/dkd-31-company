import Layout from '@/layout'
export default {
  path: '/point',
  component: Layout,
  name:'point',
  redirect: '/point/areaMenage',
  meta: { title: '点位管理', icon: 'dianwei' },
  children: [
    {
      path: 'areaMenage',
      name:'areaMenage',
      component: () => import('@/views/point/areaMenage'),
      meta: { title: '区域管理' }
    },
    {
      path: 'pointMenage',
      name:'pointMenage',
      component: () => import('@/views/point/pointMenage'),
      meta: { title: '点位管理' }
    },
    {
      path: 'helpMessage',
      name:'helpMessage',
      component: () => import('@/views/point/helpMessage'),
      meta: { title: '合作商管理' }
    }
  ]
}
