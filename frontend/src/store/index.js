import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
    products: [],
    token: '',
    user:Object,
    userById:Object

  },
 
  mutations: {

    addProducts(state, products) {
      state.products = [];
      state.products.push(products);
    },
  },
  actions: {


    fetchProducts({ commit }) {
      fetch('http://localhost:8020/products/products')
        .then( obj => obj.json() )
          .then( res => {
  
            commit('addProducts', res);
          });

    },

    register({ commit }, obj) {
      fetch('http://localhost:8020/korisnici/dodajKorisnika', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            alert(tkn.msg);
          } else {
            commit('setToken', tkn.token)
          }
        });
      },

  },
  
})
