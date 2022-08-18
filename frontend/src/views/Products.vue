<template>
  <div id="app">
    <strong>Products</strong>
    <ProductList />
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList.vue';

  export default {
    name: 'Products',
    
    components: {
      ProductList
    },
  }
</script>

<style scoped>
  strong{
    font-size: 2rem;
  }
</style>
