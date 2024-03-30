// axios基礎封裝
import axios from "axios";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//攔截器
httpInstance.interceptors.request.use(config => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    //統一錯誤提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    //401 token失效處理
    if(e.response.status===401){
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance