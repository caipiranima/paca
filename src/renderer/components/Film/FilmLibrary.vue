<template>
  <div class="form-wrapper">
    <router-link to="/">Voltar</router-link>
    <h1 class="title">Filmes</h1>
    <!-- <form v-on:submit.prevent="onSubmit">
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
    </form>-->
    <h3>Lista de Animações</h3>
    <v-data-table :headers="headers" :items="films" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.director }}</td>
        <td>{{ props.item.country }}</td>
        <td>{{ props.item.synopsis }}</td>
        <td>{{ props.item.link }}</td>
        <td>{{ props.item.image }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">mdi-lead-pencil</v-icon>
          <v-icon small @click="deleteItem(props.item)">mdi-delete</v-icon>
        </td>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'Realizador(a)', value: 'director' },
        { text: 'País', value: 'country' },
        { text: 'Sinopse', value: 'synopsis' },
        { text: 'Link', value: 'link' },
        { text: 'Imagem', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      updating: false,
      films: this.$store.getters.films,
      film: {
        title: '',
        direcotr: '',
        country: '',
        synopsis: '',
        link: '',
        image: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.updating) {
        this.onUpdate()
        return
      }
      this.$store.dispatch('addFilm', this.film)
      this.film = {
        title: '',
        direcotr: '',
        country: '',
        synopsis: '',
        link: '',
        image: ''
      }
    }
  }
}
</script>

<style>
</style>
