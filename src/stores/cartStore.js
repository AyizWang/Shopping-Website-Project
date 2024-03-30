import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {//已添加過 count+
            item.count += goods.count
        } else {//未添加過 push
            cartList.value.push(goods)
        }
    }
    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
    const allCount = computed(() => cartList.value.reduce((prev, item) => prev + item.count, 0))
    const allPrice = computed(() => cartList.value.reduce((prev, item) => prev + item.count * item.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
}, {
    persist: true
}
)