<template>
  <div class="form-wrapper">
    <router-link to="/">Voltar</router-link>
    <h1 class="title">Filmes</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label for="title" class="label"></label>
        <div class="control">
          <input name="title" type="text" placeholder="Title" v-model="film.title" class="input">
        </div>
      </div>
      <div class="field">
        <label for="director" class="label"></label>
        <div class="control">
          <input
            name="director"
            type="text"
            placeholder="Realizador(a)"
            v-model="film.director"
            class="input"
          >
        </div>
      </div>
      <div class="field">
        <label for="country" class="label"></label>
        <div class="control">
          <input name="country" type="text" placeholder="País" v-model="film.country" class="input">
        </div>
      </div>
      <div class="field">
        <label for="synopsis" class="label"></label>
        <div class="control">
          <input
            name="synopsis"
            type="text"
            placeholder="Sinopse"
            v-model="film.synopsis"
            class="input"
          >
        </div>
      </div>
      <div class="field">
        <label for="link" class="label"></label>
        <div class="control">
          <input name="link" type="text" placeholder="Link" v-model="film.link" class="input">
        </div>
      </div>
      <div class="field">
        <label for="image" class="label"></label>
        <div class="control">
          <input name="image" type="text" placeholder="Sinopse" v-model="film.image" class="input">
        </div>
      </div>
      <button v-if="updating" class="button">Atualizar</button>
      <button v-else class="button">Adicionar</button>
    </form>
    <h3>Lista de Animações</h3>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <tr>
        <th>Título</th>
        <th>Realizador(a)</th>
        <th>País</th>
        <th>Sinopse</th>
        <th>Link</th>
        <th>Imagem</th>
        <td>Atualizar</td>
        <td>Excluir</td>
      </tr>
      <tr v-for="(f, id) in films">
        <td>{{ f.title }}</td>
        <td>{{ f.director }}</td>
        <td>{{ f.country }}</td>
        <td>{{ f.synopsis }}</td>
        <td>{{ f.link }}</td>
        <td>
          <img :src="f.image" class="is-16by9">
        </td>
        <td v-on:click.prevent="onEdit(id)">
          <a>✎</a>
        </td>
        <td v-on:click.prevent="onDelete(id)">
          <a>✗</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updating: false,
      films: this.$store.getters.films,
      film: {
        title: "",
        direcotr: "",
        country: "",
        synopsis: "",
        link: "",
        image: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.updating) {
        this.onUpdate();
        return;
      }
      this.$store.dispatch('addFilm', this.film);
      this.film = {
        title: "",
        direcotr: "",
        country: "",
        synopsis: "",
        link: "",
        image: ""
      };
    }
  }
};
</script>

<style lang="sass" >
  @import '~bulma/bulma.sass'
</style>
