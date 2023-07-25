<template>
  <div>
    <h5>{{ isEditView ? "Editar Ciudad" : "Nueva Ciudad" }}</h5>
    <div class="row card p-2" style="max-width: 650px;">
      <form class="col s12" @submit.prevent="isEditView ? updateCity() : saveCity()">
        
        <div class="row">
          <div class="input-field col s12">
            <select v-model="city.statesId" @change="getCitiesByStateId()">
              <option value="0" disabled selected>Elija un departamento</option>
              <option v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
            </select>
            <label>Departamento</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate" v-model="city.name">
            <label for="name">Nombre de la ciudad</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button class="btn waves-effect waves-light" type="submit" name="action">
              {{ isEditView ? "Guardar Cambios" : "Guardar Nueva Ciudad" }}
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitiesFormView",
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      city: {
        name: "",
        statesId: 0,
      },
      states: [],
      isEditView: false,
    };
  },
  methods: {
    getCitiesByStateId() {
      // Lógica para obtener las ciudades basado en el departamento seleccionado (igual que en CitiesListView.vue)
    },
    saveCity() {
      this.axios
        .post(this.api + "/cities", this.city)
        .then((response) => {
          this.$router.push({ name: "citieslist" });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCity() {
      this.axios
        .put(this.api + "/cities/" + this.$route.params.id, this.city)
        .then((response) => {
          this.$router.push({ name: "citieslist" });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCityById() {
      this.axios
        .get(this.api + "/cities/" + this.$route.params.id)
        .then((response) => {
          this.city = response.data;
          this.isEditView = true;
          setTimeout(() => {
            var elems = document.querySelectorAll("select");
            var select = M.FormSelect.init(elems);
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStates() {
      this.axios
        .get(this.api + "/states")
        .then((response) => {
          this.states = response.data;
          setTimeout(() => {
            var elems = document.querySelectorAll("select");
            var select = M.FormSelect.init(elems);
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getStates();
    if (this.$route.params.id) {
      this.getCityById();
    }
  },
  created() {
    setTimeout(() => {
      var elems = document.querySelectorAll("select");
      var select = M.FormSelect.init(elems);
    });
  },
};
</script>

<style></style>
