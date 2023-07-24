<template>
  <div class="filter-group card">
    <i class="material-icons" style="float: left;">filter_list</i>
    <FilterItem :items="categorias" label="Categoría" @onfilter="onCategoriaFilter"></FilterItem>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FilterItem from './FilterItem.vue';

export default {
  name: 'FilterApp',
  components: {
    FilterItem,
  },
  computed: {
    ...mapGetters('categoria', ['getCategorias']),
    categorias() {
      return this.getCategorias;
    },
  },
  methods: {
    onCategoriaFilter(categoriaId) {
      // Implementa la lógica para filtrar por categoría
      // Puedes usar el valor categoriaId para filtrar tus datos en otras partes de la aplicación.
      console.log('Filtrar por categoría:', categoriaId);
    },
  },
};
</script>

<style scoped lang="scss">
.filter-group {
  padding: 7px;
}
</style>