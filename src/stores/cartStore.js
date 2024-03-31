import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    //獲取最新購物車列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    //加購物車
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) { //登入
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else { //無登入
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {//已添加過 count+
                item.count += goods.count
            } else {//未添加過 push
                cartList.value.push(goods)
            }
        }
    }
    //刪除購物車
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

    }
    //購物車數量價格
    const allCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
    const allPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))
    //清除購物車
    const clearCart = ()=>{
        cartList.value=[]
    }
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
        selectedPrice,
        clearCart,
        updateNewList
    }
}, {
    persist: true
}
)