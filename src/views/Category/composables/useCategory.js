// 封裝分類數據
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }

    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })
    onMounted(() => getCategory())

    return {
        categoryData
    }
}