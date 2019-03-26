<template>
  <div class="form-wrapper">
    <router-link to="/">Voltar</router-link>
    <v-toolbar flat color="white">
      <v-toolbar-title>Animações</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nova animação</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex md12>
                  <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="editedItem.director" label="Realizador(a)"></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="editedItem.country" label="País"></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-textarea v-model="editedItem.synopsis" label="Sinopse"></v-textarea>
                </v-flex>
                <v-flex md12>
                  <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-text-field v-model="editedItem.image" label="Imagem"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="animations" class="elevation-1">
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
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
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
      animations: this.$store.getters.animations,
      editedIndex: -1,
      editedItem: {
        title: '',
        director: '',
        country: '',
        synopsis: '',
        link: '',
        image: ''
      },
      defaultItem: {
        title: '',
        director: '',
        country: '',
        synopsis: '',
        link: '',
        image: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nova animação' : 'Editar animação'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.animations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.animations.indexOf(item)
      confirm('Tem certeza que deseja exluir essa animação?') &&
        this.$store.dispatch('deleteAnimation', index)
        
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('editAnimation', { index: this.editedIndex, object: this.editedItem })
      } else {
        this.$store.dispatch('addAnimation', this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
</style>