import { ref, computed, onUnmounted } from "vue"
import dayjs from 'dayjs'
//封裝倒計時
export const useCountDown = () => {
    let timer = null
    const time = ref(0)
    //格式化時間為分秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    //開始倒計時
    const start = (currentTime) => {
        //倒計時邏輯
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    //組件銷毀時清除
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}