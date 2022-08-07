// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui';
import store from '@/store'
import {getTokenTime} from '@/utils/auth'
import router from '@/router';

function isTimeOut(){
    // 是的token的时候
   // 当前的时间
   const currentTime=Date.now()
   // 第一次存的时间
   const tokenTime=getTokenTime()
   // 多久会过期
   const timeout=2*60*60*1000
   // 当前时间-第一次存的时间=当前token存放时间
   return currentTime-tokenTime>timeout
}

const service = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use(async (config)=>{
    if(store.state.user.token){
        if(isTimeOut()){
            // token过期了
            await store.dispatch('user/logout')
            router.push('/login')
            return Promise.reject(new Error('登录过期'))
        }else{
            config.headers.Authorization = store.state.user.token
        }
    }
    return config
}) 
// 请求拦截器
service.interceptors.response.use((res)=>{
    if(res.config.url.startsWith('/api/user-service/user/imageCode/')){
        return res
    }
    // 请求成功的情况
    const {success,msg,status}=res.data
    // 请求成功，逻辑也成功的情况
    if(success||status||res.status===200){
        return res.data
    }
    // 请求成功但是逻辑错误的情况
    Message.error(msg)
    return Promise.reject(new Error(msg))
},
// 请求错误的情况
async function(error){
    if(error?.response?.status ===401){
        Message.error("登录过期")
        await store.dispatch('user/logout')
        router.push('/login')
    }else{
        Message.error(error.msg)
    }
    return Promise.reject(error)
}
) // 响应拦截器
export default service // 导出axios实例