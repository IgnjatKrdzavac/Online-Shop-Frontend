import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
    products: [],
    recensions: [],
    token: '',
    user:Object,
    userById:Object

  },
 
  mutations: {

    addProducts(state, products) {
      state.products = [];
      state.products.push(products);
    },
    addRecensions(state, rec) {
      state.recensions = [];
      state.recensions = rec;
    },
    addRecensionSocket(state, rec) {
      state.recensions.push(rec);
    },
    setUser(state, user) {
      state.user = user;
      
    },
    setUserById(state, user) {
      state.userById = user;
      
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
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

    fetchRecensions({ commit }, obj) {
      fetch('http://localhost:8020/recensions/vratiRecenzije', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
      .then( tkn => {
        
        commit('addRecensions', tkn);
        
    });
        
    },

    fetchRecensionUser({ commit }, obj) {
      fetch('http://localhost:8020/recensions/vratiRecenzijeUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
      .then( tkn => {
        
        commit('addRecensions', tkn);
        
    });
        
    },


    createRecension({ commit }, obj) {
      fetch('http://localhost:8020/recensions/dodajRecenziju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        
    },

    getUser({ commit },obj) {
      fetch('http://localhost:8020/users/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          
            commit('setUser', tkn)
          
      });
    },

    getUserById({ commit },obj) {

      fetch('http://localhost:8020/users/getUserById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          
            commit('setUserById', tkn)
          
      });
    }, 

    register({ commit }, obj) {
      fetch('http://localhost:9050/api_register', {
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

      login({ commit }, obj) {
        fetch('http://localhost:9050/api_login', {
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

      socket_rec({ commit }, msg) {
        const rec = JSON.parse(msg);
        commit('addRecensionSocket', rec);
      }

  },
  
})
