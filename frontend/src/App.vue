<template>
  <div id="app">

    <div>


      <div style="display:inline-block;">
          <strong>
            Raf Tech Store
          </strong>
      </div>


      <div style="display:inline-block;vertical-align:top;">
            <img src="./assets/lap.png" alt="img"/>
      </div>
     
      
      <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand to="/">TechShopping</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" id = "navI">Home</b-nav-item>
            
            <b-nav-item to="/products" id = "navI">Products</b-nav-item>

          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="token" to="/acc">Accoount</b-nav-item>
          

            <b-nav-item v-if="!token" to="/register" id = "navI">Register</b-nav-item>
            <b-nav-item v-if="!token" to="/login" id = "navI">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()">Log Out</b-nav-item>


            


          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view class="stranica" />
  </div>
</template>

<script>

  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: 'App',

    data() {
      
      return {
        products: null,
        searchQuery: '',
     
      }
    },

    computed: {
      ...mapState([
        'token',
        
      ])
    },

     mounted() {
       if (localStorage.token) {
          this.setToken(localStorage.token);
        }

          
          
    },

    methods: {

      ...mapMutations([
        'removeToken',
        'setToken'
      ]),
    
      
     

      logout() {
        this.removeToken();
      }
      
    }

    
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 50px;
  }

  .stranica {
    width: 80%;
    margin-left: 10%;
  }

  strong{
     font-size: 2.7em;
     font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  #navI{
    font-size: 1.3em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
     color: white;
  }
 
</style>
