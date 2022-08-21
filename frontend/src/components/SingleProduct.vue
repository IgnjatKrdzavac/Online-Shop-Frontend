<template>
  
<div >
  <b-card
    tag="article"
    style="max-width: 29rem;"
    class="mb-2"
    >

  
   <b-img v-bind:src="prod.image" fluid alt="Fluid image" ></b-img>

    <b-card-text >
      <b>Name: </b> {{ prod.name }} 
      <br>
     <b>Price:</b> {{ prod.price }}
     <br>
     
     
    </b-card-text>
    
    <b-button v-if="token" variant="info " id= "btn" @click="modalShow = !modalShow">Buy Product</b-button>
    <b-button  @click="showProduct(prod.id)" variant="info " id= "btn">Show Product</b-button>

    
    <b-modal v-model="modalShow" title="Confirmation of the purchase of the product" size="xl" header-bg-variant="info" header-text-variant="light">
      
      
      <template #modal-footer>
        <div class="w-100">

          <b-button variant="info " id= "btn" @click="modalShow=false">
            Confirm
          </b-button>

          <b-button variant="info " id= "btn" @click="modalShow=false">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
    
  </b-card>

  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  export default {
     
    name: 'SingleProduct',

    data() {
      return {
        modalShow: false
      }
    }
    ,
    computed: {
      ...mapState([
        'token'
      ])
    },
    props: {
      prod: Object
    }
    ,
     methods: {
      
      showProduct(productId) {
          this.$router.push({ name: 'SingleItemView', params: { id: productId } });
          console.log(productId);
      }
    }
    
  }

</script>

<style scoped>
p{
    font-size: 1.5em;
      text-align: left;
  }
  #btn{
    margin-left: 24px;
  }

 

</style>