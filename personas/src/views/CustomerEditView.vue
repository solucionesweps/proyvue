<template>
  <div>
    <h5>Editar cliente {{ $route.params.id }}</h5>
    <form class="col s12" @submit.prevent="saveCustomer()">
      <div class="row">
        <div class="input-field col s12">
          <input id="name" type="text" class="validate" v-model="payload.name">
          <label for="name">Nombre completo</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select v-model="payload.genero">
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <label>Género</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="phone" type="number" class="validate" v-model="payload.phone">
          <label for="phone">Teléfono</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" v-model="payload.email">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select v-model="payload.statesId" @change="pedirCiudad()">
            <option value="0" disabled selected>Elija un departamento</option>
            <option v-for="(value, key) in states" :key="key" :value="value.id">{{ value.name }}
            </option>
          </select>
          <label>Departamento</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select v-model="payload.citiesId">
            <option value="0" disabled selected>Elija una ciudad</option>
            <option v-for="(value, key) in cities" :key="key" :value="value.id">{{ value.name }}
            </option>
          </select>
          <label>Ciudad</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'CustomerEditView',
  data() {
    return {
      api: process.env.VUE_APP_API,
      states:[],
      cities:[],
      payload: {
        name: "",
        phone: null,
        statesId: null,
        citiesId: null
      }
    }
  },
  methods: {
    getItem(){
      const id = this.$route.params.id;
      console.log(id);
      this.axios({
                method: 'get',
                url: this.api + '/customers/' + id
            })
                .then((response) => {
                    this.payload = response.data;
                    this.getCities(this.payload.statesId);
                    setTimeout(function () {
                        M.updateTextFields();
                    });
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },
    getStates(){
      this.axios({
                method: 'get',
                url: this.api + '/states/'
            })
                .then((response) => {
                    this.states = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },
    saveCustomer() {
      this.axios({
                method: 'patch',
                url: this.api + '/customers/'+this.$route.params.id,
                data: this.payload
            })
                .then((response) => {
                    this.states = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    },
    pedirCiudad(){
      this.getCities(this.payload.statesId);
    },
    getCities(statesId){
      this.axios({
                method: 'get',
                url: this.api + '/cities?statesId='+ statesId
            })
                .then((response) => {
                    this.cities = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
    }
  },
  created(){
    this.getItem();
    this.getStates();
  }
}
</script>