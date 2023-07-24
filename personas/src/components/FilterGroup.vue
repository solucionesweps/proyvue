<template>
  <div class="filter-group card">
    <i class="material-icons" style="float: left;">filter_list</i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FilterApp',
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-group{
  padding: 7px;
}
</style>
