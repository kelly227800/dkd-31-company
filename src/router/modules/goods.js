import Layout from '@/layout'
export default {
  path: '/goods',
  component: Layout,
  name:'goods',
  redirect: '/goods/goodsType',
  meta: { title: '商品管理', icon: 'shangpin' },
  children: [
    {
      path: 'goodsType',
      name:'goodsType',
      component: () => import('@/views/goods/goodsType'),
      meta: { title: '商品类型' }
    },
    {
      path: 'goodsMessage',
      name:'goodsMessage',
      component: () => import('@/views/goods/goodsMessage'),
      meta: { title: '商品管理' }
    }
  ]
}