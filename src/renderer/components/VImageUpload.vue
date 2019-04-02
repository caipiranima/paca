<template>
  <div>
    <v-btn raised class="primary" @click="onPickFile">Escolher imagem</v-btn>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="onFileChange"
    >
    <img :src="image">
    <v-btn raised class="primary" style="display: none">Upload</v-btn>
  </div>
</template>

<script>
import imgur from 'imgur'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filename: '',
      image: ''
    }
  },
  watch: {
    value(v) {
      this.filename = v
      this.image = this.filename
    }
  },
  mounted() {
    this.filename = this.value
    this.image = this.filename
  },

  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },

    uploadToImgur(file) {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        debugger
        imgur
          .uploadBase64(btoa(fileReader.result))
          .then(json => {
            this.filename = json.data.link
            this.image = this.filename
            this.$emit('input', this.filename)
          })
          .catch(function(err) {
            console.error(err.message)
          })
      })
      fileReader.readAsBinaryString(file)
    },

    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      this.uploadToImgur(files[0])
    }
  }
}
</script>

<style scoped>
img {
  width: 50%;
  height: 100%;
}
.v-btn {
  margin-top: -22px;
  margin-left: -2px;
}
</style>


