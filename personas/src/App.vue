<template>
  <div class="container">
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo"></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
         
          <li><router-link to="/customer">Personas</router-link></li>
          <li><router-link to="/cities">Ciudades</router-link></li>
         
         
          <li v-if="$store.getters.isLogin"><a @click="logout()">Salir</a></li>
          <li v-if="!$store.getters.isLogin"><router-link to="/login">Login</router-link></li>        
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/customer">Personas</router-link></li>
      <li><router-link to="/cities">Ciudades</router-link></li>
      
  
      <li v-if="$store.getters.isLogin"><a @click="logout()">Salir</a></li>
      <li v-if="!$store.getters.isLogin"><router-link to="/login">Login</router-link></li> 
    </ul>
    <div>es login {{ $store.getters.isLogin }} {{ $store.state }}</div>
  <router-view/>
  </div>
</template>

<style lang="scss">


</style>

<script>



export default {
  name: 'AppView',
  data(){
    return {
      
    }
  },
  methods:{
    logout(){
      this.$store.dispatch("doLogout");
      this.$router.push("/login");

    }
  },
  created() {
    document.title = "Sistema de Registro";
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});

    });
  }
}
</script>