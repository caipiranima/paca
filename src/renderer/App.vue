<template>
  <div id="app">
    <v-app dark>
      <v-toolbar color="deep-purple" dense fixed clipped-left app>
        <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
        <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">Paca</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout row align-center style="max-width: 650px">
          <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
          ></v-text-field>
        </v-layout>
      </v-toolbar>
      <v-content>
        <v-container fluid pa-0>
          <v-layout justify-center align-center>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'paca'
}
</script>

<style>

</style>
