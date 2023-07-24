<template>
  <div>
    <div class="filter-item input-field" v-if="items && items.length > 0">
      <select @change="$emit('onfilter', $event.target.value)">
        <option value="" >todos</option>
        <option v-for="(value, key) in items" :key="key" :value="value.id">{{ value.name }}
        </option>
      </select>
      <label>{{label}}</label>
    </div>
    <div v-else>No hay items</div>
  </div>
</template>

<script>
export default {
  name: 'FilterItem',
  props: ['items', 'label'],
  emits: ['onfilter'],
  created() {
    setTimeout(function () {
      var elems = document.querySelectorAll('select');
      var select = M.FormSelect.init(elems);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .filter-item {
    display: inline-block
  }
</style>
