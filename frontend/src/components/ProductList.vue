<template>
  <div >
    
    <div  class="view overlay">
        <b-card-group columns>
         <SingleProduct  v-for="prod in paginatedItems" :key="prod.id" :prod="prod" />
        </b-card-group>
    </div>
    
    <b-pagination
          @change="onPageChanged"
          :total-rows=totalRows
          :per-page=perPage
          v-model="currentPage"
          class="my-0"
    />


  </div>
    
</template>

<script>
  

  import SingleProduct from '@/components/SingleProduct.vue'; 
  import { mapActions, mapState, mapGetters} from 'vuex';


  export default {
    name: 'ProductList',
    components: {
    SingleProduct,

},
    data() {
      return {
        prodList: [],
        paginatedItems: [],
        currentPage: 1,
        perPage: 6,
        totalRows: null
      }
    },

    computed: {
      ...mapState([
        'products'
      ])
    },

    watch: {
      
    },

    mounted() {
      this.fetchProducts();
    },

    methods: {
       ...mapActions([
        'fetchProducts'
      ]),
      
      paginate(page_size, page_number) {
          let itemsToParse = this.prodList;
          this.paginatedItems = itemsToParse.slice(
            page_number * page_size,
            (page_number + 1) * page_size
          );
      },
    
      onPageChanged(page) {
          this.paginate(this.perPage, page - 1);
      }
    }
    ,
    watch:{
      products(nVal){
          this.prodList = this.products[0];
          this.totalRows = this.prodList.length;
          this.paginate(this.perPage, 0);
      }
    }

    
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
  
  
</style>