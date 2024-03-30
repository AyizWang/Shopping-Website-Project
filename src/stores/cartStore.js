import { defineStore } from "pinia";
import { ref } from "vue";

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
    return {
        cartList,
        addCart
    }
}, {
    persist: true
}
)