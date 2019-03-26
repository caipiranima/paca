<template>
  <div id="app">
    <v-app>
      <div class="container">
        <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'paca'
  }
</script>

<style>
  .container {
    padding: 24px;
  }
</style>
