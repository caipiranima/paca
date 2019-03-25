<template>
  <div class="film" v-on:click="$emit('play-film', link)">
    <img :src="image">
  </div>
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
</style>
