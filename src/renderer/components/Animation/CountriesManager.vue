<template>
  <div class="form-wrapper">
    <v-btn to="/">Voltar</v-btn>
    <v-btn @click="saveLibraryToFile" color="red">Salvar no arquivo</v-btn>
    <v-btn to="/animations">Animações</v-btn>
    <v-btn to="/directors">Diretores</v-btn>
    <v-btn to="/studios">Estúdios</v-btn>
    <v-toolbar flat color="white">
      <v-toolbar-title>Países</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="720px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" fab dark v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex md12>
                  <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                </v-flex>
                <v-flex md12>
                  <v-textarea v-model="editedItem.history" label="História"></v-textarea>
                </v-flex>
                <v-flex md12>
                  <v-image-upload v-model="editedItem.image"/>
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
    <v-data-table :headers="headers" :items="countries" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.history }}</td>
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
import VImageUpload from '../VImageUpload'

export default {
  components: {
    VImageUpload
  },

  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Nome', value: 'name' },
        { text: 'História', value: 'history' },
        { text: 'Imagem', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      countries: this.$store.getters.countries,
      editedIndex: -1,
      editedItem: {
        name: '',
        history: '',
        image: ''
      },
      defaultItem: {
        name: '',
        history: '',
        image: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo país' : 'Editar país'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.countries.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.countries.indexOf(item)
      confirm('Tem certeza que deseja exluir esse país?') &&
        this.$store.dispatch('deleteCountry', index)
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
        this.$store.dispatch('editCountry', {
          index: this.editedIndex,
          object: this.editedItem
        })
      } else {
        this.$store.dispatch('addCountry', this.editedItem)
      }
      this.close()
    },

    saveLibraryToFile() {
      this.$store.dispatch('saveLibrary')
    }
  }
}
</script>

<style>
.form-wrapper {
  padding: 10px
}
</style>
