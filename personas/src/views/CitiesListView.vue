<template>
    <div>
      <h5>Ciudades</h5>
      <tabs>
        <!-- Contenido de la pestaña "lista" -->
        <template v-slot:lista>
          <search placeholder="Buscar ciudad" @searchtext="searchFx($event)"></search>
          <filter-group>
            <filter-item :items="states" label="Departamento" @onfilter="onFilterFx('statesId', $event)"></filter-item>
          </filter-group>
          <table class="highlight responsive-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Departamento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city in items" :key="city.id">
                <td>{{ city.name }}</td>
                <td>{{ getDepartmentName(city.statesId) }}</td>
                <td>
                  <router-link :to="'/cities/' + city.id + '/edit'"><i class="material-icons">create</i></router-link>
                  <i class="material-icons" style="color:red" @click="deleteCity(city.id)">delete_forever</i>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        
        <!-- Contenido de la pestaña "nuevo" -->
        <template v-slot:nuevo>
          <cities-form-view :isNewCity="true" />
        </template>
      </tabs>
      
    </div>
  </template>
  
  <script>
  import Tabs from "@/components/Tabs.vue";
  import Search from "@/components/Search.vue";
  import FilterGroup from "@/components/FilterGroup.vue";
  import FilterItem from "@/components/FilterItem.vue";
  import CitiesFormView from "@/views/CitiesFormView.vue"; // Importamos el componente CitiesFormView
  
  export default {
    name: "CitiesList",
    data() {
      const api = process.env.VUE_APP_API;
      return {
        api,
        items: [],
        states: [],
        cities: [],
        toSearch: "",
        toFilter: "",
        payload: {
          name: "",
          statesId: 0,
        },
      };
    },
    methods: {
      onFilterFx(field, event) {
        if (event === "") {
          this.toFilter = '';
        } else {
          this.toFilter = "&" + field + "=" + event;
        }
        this.getCities();
      },
      getCities() {
        this.axios({
          method: "get",
          url: this.api + "/cities?_expand=states" + this.toSearch + this.toFilter,
        })
          .then((response) => {
            this.items = response.data;
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      },
      getStates() {
        this.axios({
          method: "get",
          url: this.api + "/states",
        })
          .then((response) => {
            this.states = response.data;
            setTimeout(() => {
              var elems = document.querySelectorAll("select");
              var select = M.FormSelect.init(elems);
            });
            console.log(response);
          });
      },
      getDepartmentName(statesId) {
        const state = this.states.find((state) => state.id === statesId);
        return state ? state.name : "Desconocido";
      },
      saveCity() {
        this.axios({
          method: "post",
          url: this.api + "/cities",
          data: this.payload
        })
          .then((response) => {
            this.payload = {
              name: "",
              statesId: 0,
            };
            setTimeout(function () {
              var elems = document.querySelectorAll("select");
              var select = M.FormSelect.init(elems);
            });
            this.getCities();
            console.log(response);
          });
      },
      deleteCity(id) {
        if (confirm("¿Está seguro de eliminar la ciudad?")) {
          this.axios({
            method: "delete",
            url: this.api + "/cities/" + id,
          })
            .then((response) => {
              this.getCities();
              console.log(response);
            });
        }
      },
      searchFx(event) {
        if (event === "") {
          this.toSearch = "";
        } else {
          this.toSearch = "&q=" + event;
        }
        this.getCities();
      },
    },
    mounted() {
      this.getCities();
      this.getStates();
    },
    components: {
      Tabs,
      Search,
      FilterGroup,
      FilterItem,
      CitiesFormView // Agregamos el componente CitiesFormView aquí
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
  