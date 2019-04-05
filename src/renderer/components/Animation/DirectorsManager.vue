<template>
  <div class="form-wrapper">
    <v-btn to="/">Voltar</v-btn>
    <v-btn @click="saveLibraryToFile" color="red">Salvar no arquivo</v-btn>
    <v-btn to="/animations">Animações</v-btn>
    <v-btn to="/countries">Países</v-btn>
    <v-btn to="/studios">Estúdios</v-btn>
    <v-toolbar flat>
      <v-toolbar-title>Diretores</v-toolbar-title>
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
                <v-flex md6>
                  <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-autocomplete
                    v-model="editedItem.countries"
                    :items="countries"
                    :item-value="(obj) => (obj).id"
                    :item-text="(obj) => (obj).name"
                    label="Países"
                    hide-selected
                    hide-no-data
                    clearable
                    multiple
                    small-chips
                    deletable-chips
                    :return-object="false"
                    @input="afterCountrySelection"
                    ref="countriesAutocomplete"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md12>
                  <v-textarea v-model="editedItem.biography" label="Biografia"></v-textarea>
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
    <v-data-table :headers="headers" :items="directors" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ countries.filter(x => props.item.countries.includes(x.id) ).map(x => x.name).join(', ') }}</td>
        <td>{{ props.item.biography }}</td>
        <td>
          <img :src="props.item.image" width="100px" />
        </td>
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
        { text: 'Países', value: 'countries' },
        { text: 'Biografia', value: 'biography' },
        { text: 'Imagem', value: 'image' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      directors: this.$store.getters.directors,
      countries: this.$store.getters.countries,
      editedIndex: -1,
      editedItem: {
        name: '',
        countries: [],
        biography: '',
        image: ''
      },
      defaultItem: {
        name: '',
        countries: [],
        biography: '',
        image: ''
      }
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo(a) animador(a)' : 'Editar animador(a)'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.directors.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.directors.indexOf(item)
      confirm('Tem certeza que deseja exluir esse(a) diretor(a)?') &&
        this.$store.dispatch('deleteDirector', index)
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
        this.$store.dispatch('editDirector', {
          index: this.editedIndex,
          object: this.editedItem
        })
      } else {
        this.$store.dispatch('addDirector', this.editedItem)
      }
      this.close()
    },

    afterCountrySelection(item) {
      this.$nextTick(() => {
        this.$refs.countriesAutocomplete.blur()
        this.$refs.countriesAutocomplete.focus()
      })
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
