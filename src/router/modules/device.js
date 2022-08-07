import Layout from '@/layout'
export default {
  path: '/device',
  component: Layout,
  name:'device',
  redirect: '/device/deviceMessage',
  meta: { title: '设备管理', icon: 'shebei' },
  children: [
    {
      path: 'deviceMessage',
      name:'deviceMessage',
      component: () => import('@/views/device/deviceMessage'),
      meta: { title: '设备管理' }
    },
    {
      path: 'deviceState',
      name:'deviceState',
      component: () => import('@/views/device/deviceState'),
      meta: { title: '设备状态' }
    },
    {
      path: 'deviceTypeMenage',
      name:'deviceTypeMenage',
      component: () => import('@/views/device/deviceTypeMenage'),
      meta: { title: '设备类型管理' }
    }
  ]
}
