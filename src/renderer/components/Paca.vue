<template>
  <div id="wrapper">
    <router-link to="/animation">Adicionar animações</router-link>
    <v-container flex grid-list-lg>
      <v-layout row wrap>
        <animation
          v-for="animation in animations"
          :key="animation.id"
          :name="animation.name"
          :image="animation.image"
          :link="animation.link"
          v-on:play-animation="playAnimation"
        ></animation>
      </v-layout>
    </v-container>
    <div id="player"></div>
  </div>
</template>

<script>
import Plyr from 'plyr'
import Animation from './Animation/Animation'

export default {
  components: {
    Animation
  },
  data() {
    return {
      animations: this.$store.getters.animations
    }
  },
  methods: {
    playAnimation(animationLink) {
      document
        .getElementById('player')
        .setAttribute('data-plyr-provider', animationLink.includes('vimeo') ? 'vimeo' : 'youtube')
      document
        .getElementById('player')
        .setAttribute('data-plyr-embed-id', animationLink)
      const player = Plyr.setup('#player')[0]
      player.fullscreen.enter()
      player.on('ready', () => {
        player.play()
      })

      player.on('exitfullscreen', () => {
        player.destroy()
      })
      // TODO Implementar a função de tocar uma sessão de filmes 
      player.on('ended', () => {
        player.destroy()
      })
      //   player.on("ended", () => {
      //     player.source = {
      //       type: "video",
      //       sources: [
      //         {
      //           src: "265045525",
      //           provider: "vimeo"
      //         }
      //       ]
      //     };

      //     // player.fullscreen.enter();
      //     player.play();
      //   });
    }
  }
}
</script>

<style>
@import url('~plyr/dist/plyr.css');
</style>
