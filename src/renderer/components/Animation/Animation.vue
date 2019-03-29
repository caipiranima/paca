<template>
  <v-flex xs12 sm6 md3 xl2>
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
}
</style>
