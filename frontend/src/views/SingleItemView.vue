<template>
  <div id="app">

    <br><br><br><br>
     
    <div id="main">

            <div id="left">
                <b-img id = "prodImage" v-bind:src="prod.image"></b-img> 
            </div>

            <div id="right">
                 <b-button  href="/products" variant="info">Back</b-button>
                <br><br><br><br>
                <p id = 'pR'>Name:  {{ prod.name }} </p>
                <p id = 'pR'>Weight:  {{ prod.weight }} </p>
                <p id = 'pR'>Short description:  {{ prod.shortDesc }} </p>
                <br>
                <strong>Price {{ prod.price }}eu </strong>
                <br><br><br>
                <div>
                    <b-button  v-if="token" variant="info" @click="modalShow = !modalShow">Add Recension</b-button>
                    <b-button  id= "btn" variant="info" @click="modalShow2 = !modalShow2">Show Recension</b-button>
                </div>


                <b-modal v-model="modalShow" title="Add Recension" size="xl" header-bg-variant="info" header-text-variant="light">
                    <div>
                      <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>

                   </div>

                    <template #modal-footer>
                      <div class="w-100">

                        <b-button variant="info " id= "btn" @click="submitRecension">
                               Submit
                        </b-button>

                        <b-button variant="info " id= "btn" @click="cancel">
                               Cancel
                        </b-button>
                     </div>
                    </template>
                </b-modal>

                <b-modal v-model="modalShow2" scrollable title="Recensions" size="l" header-bg-variant="info" header-text-variant="light" >

                    <Recension  v-for="rec in recensions" :key="rec.id" :rec="rec" />

                    <template #modal-footer>
                      <div class="w-100">

                        <b-button variant="info " id= "btn" @click="cancel">
                               Back
                        </b-button>
                     </div>
                    </template>
                </b-modal>

            </div>

    </div>  




  </div>
</template>

<script>

  import { mapActions, mapState, mapMutations } from 'vuex';
 import Recension from '@/components/Recension.vue'; 
  export default {
    name: 'SingleItemView',
    components: {
      Recension, 
    },
    data() {
      return {
        prod: 1,
        modalShow: false,
        text: '',
        modalShow2: false,
        recs: [],
        usr:Object
       
      }
    },
    computed: {
      ...mapState([
        'products',
        'recensions',
        'token',
        'user'
      ])
    },
    
    methods: {
      ...mapMutations([
        'removeToken',
        'setToken'
      ]),
      ...mapActions([
        'createRecension',
        'fetchRecensions',
        'fetchProducts',
        'getUser' 
      ]),
      submitRecension() {

        let form = {
            recension:this.text, userId:this.usr.id, productId:this.$route.params.id 
          }

          this.$socket.emit('rec', form);
          console.log(this.text);
          console.log(this.usr.id);
          console.log(this.$route.params.id);
          // this.createRecension(form);
          // this.recs.push(form);
          this.modalShow = false;
          this.text = '';
          
      },
      cancel() {
          this.modalShow = false;
          this.modalShow2 = false;
          this.text = '';
      }
    }
    ,
    mounted() {
      let form = {
        var:1,
        token:localStorage.token
      }
     
      this.getUser(form);
      this.fetchProducts();
      let form2 = {
        id : this.$route.params.id
      }
      this.fetchRecensions(form2);
      
     }
    ,
    watch:{
      products(nVal){
          let products = nVal[0];
          this.prod = products[this.$route.params.id - 1]; 
      },
      user(nVal){
          this.usr = nVal;
      },
      
      recensions(nVal){
         
      },
    }
    
  }
</script>

<style scoped>
   
.product {
    background-color: #eee
}
#main{
  margin: auto;
  overflow:auto;
  height: 36rem;
  width: 80rem;
  background-color: #eee;
   
}


#left{
   float:left;
   height: 36rem;
   width: 40rem;
   background:white;
   border-style: solid;
   border-color: #eee;
}

#right{
    height: 36rem;
    width: 40rem;
    float:right;
    text-align: left;    
}


#prodImage{
    width: 100%;
    height: 100%; 
    object-fit: contain;
}
#pR{
    font-size: 1.6em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
#btn{
    margin-left: 30px;
}


</style>