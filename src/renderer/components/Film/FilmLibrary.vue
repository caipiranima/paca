<template>
  <div class="form-wrapper">
    <h1 class="title">Filmes</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="field">
        <label for="filmTitle" class="label"></label>
        <div class="control">
          <input name="filmeTitle" type="text" placeholder="Title" v-model="film.title" class="input">
        </div>
      </div>
      <button v-if="updating" class="button">Update</button>
      <button v-else class="button">Add</button>
    </form>
    <h3>Lista de Animações</h3>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <tr>
        <th>Título</th>
        <th>Realizador(a)</th>
        <th>País</th>
        <th>Sinopse</th>
        <th>Link</th>
        <!-- <th>Imagem</th> -->
        <td>Atualizar</td>
        <td>Excluir</td>
      </tr>
      <tr v-for="(f, id) in films">
        <td>{{ f.title }}</td>
        <td>{{ f.director }}</td>
        <td>{{ f.country }}</td>
        <td>{{ f.synopsis }}</td>
        <td>{{ f.link }}</td>
        <!-- <td><img :src="f.image" /></td> -->
        <td v-on:click.prevent="onEdit(id)"><a>✎</a></td>
        <td v-on:click.prevent="onDelete(id)"><a>✗</a></td>
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
        title: ''
      }
    };
  }
};
</script>

<style lang="sass" >
  @import '~bulma/bulma.sass'
</style>
