import router from './router'
import store from './store'

const whiteList = ['/login','/404']

router.beforeEach((to, from, next) => {
    const token=store.state.user.token
    //如果token存在的话，为登录状态
    if(token){
        if(!store.state.user.userInfo.userName){
            store.dispatch('user/getUserInfo',store.state.user.userId)
        }
        // 是否是跳转到登录页面
        if(to.path==='/login'){
            //是，则跳到首页
            next('/')
        }else{
            //不是，则直接进入
            next()
        }
    // token不存在，也就是没有登录
    }else{
        const isCludes=whiteList.includes(to.path)
        //访问的是否在白名单(未登录也能访问的页面)
        if(isCludes){
            //在白名单，则直接进入
            next()
        }else{
            //不在白名单(不登录不能访问),跳到登录页
            next('/login')
        }
    }
})
