<template>
  <v-flex xs12 sm6 md4 lg3>
    <div class="animation" v-on:click="$emit('play-animation', link)">
      <img :src="image">
    </div>
  </v-flex>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.animation img {
  width: 100%;
  height: 100%;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12) !important;
  border-radius: 3px;
}
</style>
