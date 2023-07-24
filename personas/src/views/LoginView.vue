<template>
  <div class="about">
    <h5>login</h5>
    <button @click="login()">login</button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return {
    }
  },
  methods:{
    async login(){
      const token = 'tokenDeAutentificacion2';
      const username = 'Raul martinez';
      const rol='cajas';
      this.$store.dispatch("doLogin",{token, username, rol});
      this.$router.push("/");
    }
  }
}
</script>