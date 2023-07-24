
<template>
    <div class="card"  style="padding: 7px">
      <i class="material-icons" style="float:left;">search</i>  
      <div class="row">
        
        <div class="input-field" style="display:inline-block">
            <input id="search" type="search" class="validate" @search="$emit('searchtext',$event.target.value)">
            <label for="search">{{placeholder}}</label>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Search',
    props: {
      placeholder: String
    },
    emit:['searchtext']
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="scss">
  
  </style>
  