import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    //加購物車
    const addCart = async(goods) => {
        const { skuId, count } = goods
        if (isLogin.value) { //登入
            await insertCartAPI({ skuId, count })
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else { //無登入
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {//已添加過 count+
                item.count += goods.count
            } else {//未添加過 push
                cartList.value.push(goods)
            }
        }

    }
    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    const allCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
    const allPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))

    //單選功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    //全選功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    //已選數量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count, 0))
    //已選價格
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((prev, item) => prev + item.count * item.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice
    }
}, {
    persist: true
}
)