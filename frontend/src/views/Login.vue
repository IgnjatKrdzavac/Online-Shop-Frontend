<template>
  <div id="app">
    <h1>Login</h1>
    <br><br><br><br>
    <div id = "login">
    <b-form @submit="onSubmit">
      <br><br>
      <b-form-group label="Email:" label-for="email" >
        <b-form-input id="email" v-model="form.email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password"  required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="info">Submit</b-button>
    </b-form>
    </div>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    
    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();
        if(this.form.email.length < 2){
          alert("Nedovoljan broj reci")
        }
        if(this.form.password.length < 2){
          alert("Nedovoljan broj reci")
        }
        this.login(this.form);
        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>
 #login{
    margin: auto;
  overflow:auto;
  height: 20rem;
  width: 25rem;
  background-color:#339CB0  ;
 }

</style>
