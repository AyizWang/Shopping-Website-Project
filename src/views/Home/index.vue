<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <HomePanel title="新鮮好物" subTitle="11111">
    <div>
      aaaaaaaaaa
    </div>
  </HomePanel>
    
  <HomePanel title="人氣推薦" subTitle="22222">
    <div>
      aaaaaaaaaa
    </div>
  </HomePanel>
</template>