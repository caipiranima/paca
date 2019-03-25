<template>
  <div id="wrapper">
    <router-link to="/film">Adicionar animações</router-link>
    <film
      v-for="film in films"
      :key="film.id"
      :name="film.name"
      :image="film.image"
      :link="film.link"
      v-on:play-film="playFilm"
    ></film>
    <div id="player"></div>
  </div>
</template>

<script>
import Plyr from "plyr";
import Film from "./Film/Film";

export default {
  components: {
    Film
  },
  data() {
    return {
      films: this.$store.getters.films
    };
  },
  methods: {
    playFilm(videoLink) {
      document
        .getElementById("player")
        .setAttribute("data-plyr-provider", "vimeo");
      document
        .getElementById("player")
        .setAttribute("data-plyr-embed-id", videoLink);
      const player = Plyr.setup("#player")[0];
      //   player.source = {
      //     type: "video",
      //     sources: [
      //       {
      //         src: videoLink,
      //         provider: "vimeo"
      //       }
      //     ]
      //   };
      player.fullscreen.enter();
      player.on("ready", () => {
        player.play();
      });

      player.on("exitfullscreen", () => {
        player.destroy();
      });
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
};
</script>

<style>
@import url("~plyr/dist/plyr.css");
</style>
