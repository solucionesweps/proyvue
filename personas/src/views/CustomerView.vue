<template>
    <div>
        <h5>Personas</h5>
        <tabs>
            <template v-slot:lista>
                <search placeholder="Buscar persona" @searchtext="searchFx($event)"></search>
                <filter-group>
                    <filter-item :items="states" label="Departamento"
                        @onfilter="onFilterFx('statesId', $event)"></filter-item>
                </filter-group>
                <table class="highlight responsive-table ">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Género</th>
                            <th>Email</th>
                            <th>Departamento Nacimiento</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.genero }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.states.name }}</td>
                            <td>
                                <router-link :to="'/customer/' + item.id"><i class="material-icons">create</i></router-link>
                                <i class="material-icons" style="color:red" @click="eliminarItem(item.id)">delete_forever</i>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </template>
            <template v-slot:nuevo>
                <div class="row card p-2" style="max-width: 650px;">
                    <h6>Formulario nueva Persona</h6>
                    <form class="col s12" @submit.prevent="saveCustomer()">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate" v-model="payload.name">
                                <label for="name"> Nombre completo</label>
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
                                <input id="email" type="email" class="validate" v-model="payload.email">
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="phone" type="number" class="validate" v-model="payload.phone">
                                <label for="phone"> Teléfono</label>
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
                        <div class="row" v-if="cities.length > 0">
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
        </tabs>
       
    </div>
</template>
  
<script>

import Tabs from '@/components/Tabs.vue'
import Search from '@/components/Search.vue'
import FilterGroup from '@/components/FilterGroup.vue';
import FilterItem from '@/components/FilterItem.vue';
export default {
    name: 'Customer',
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
            name: '',
            genero: '',
            phone: null,
            email: '',
            statesId: 0,
            cityId: 0
            }
        }
    },
    methods: {
        onFilterFx(field, event) {
            if (event === '') {
                this.toFilter = '';
            } else {
                this.toFilter = '&' + field + '=' + event;
            }
            this.getItems();
        },
        pedirCiudad() {
            this.getCities(this.payload.statesId);
        },
        getItems() {
            this.axios({
                method: 'get',
                url: this.api + '/customers?_expand=states'+this.toSearch+this.toFilter
            })
                .then((response) => {
                    this.items = response.data;
                    console.log(response);
                })
                .catch((error) => { console.log(error) })
                .finally(() => { });
        },
        getStates() {
            this.axios({
                method: 'get',
                url: this.api + '/states'
            })
                .then((response) => {
                    this.states = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        getCities(statesId) {
            this.axios({
                method: 'get',
                url: this.api + '/cities?statesId=' + statesId
            })
                .then((response) => {
                    this.cities = response.data;
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    console.log(response);
                });
        },
        saveCustomer() {

            this.axios({
                method: 'post',
                url: this.api + '/customers',
                data: this.payload
            })
                .then((response) => {
                    this.payload = {
                        name: '',
                        phone: null,
                        statesId: 0,
                    };
                    setTimeout(function () {
                        var elems = document.querySelectorAll('select');
                        var select = M.FormSelect.init(elems);
                    });
                    this.getItems();

                    console.log(response);
                });


        },
        eliminarItem(id) {
            if (confirm("Esta seguro de eliminar?")) {
                this.axios({
                    method: 'delete',
                    url: this.api + '/customers/' + id
                })
                    .then((response) => {
                        this.getItems();
                        console.log(response);
                    });
            }
        },
        searchFx(event){
            if (event === "") {
                this.toSearch = '';
            } else {
                this.toSearch = '&q=' + event;
            }
            this.getItems();
        }
    },
    mounted() {
        this.getItems();
        this.getStates();
    },
    components: {
        Tabs,Search,FilterGroup,FilterItem
    },
    created() {
        setTimeout(() => {
            var elems = document.querySelectorAll('select');
            var select = M.FormSelect.init(elems);
        });
    }
}
</script>

<style></style>