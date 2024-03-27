// axios基礎封裝
import axios from "axios";

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

//攔截器
httpInstance.interceptors.request.use(config => {
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
})

export default httpInstance