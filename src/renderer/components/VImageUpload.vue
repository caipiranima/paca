<template>
  <div>
    <v-btn
      raised
      :class="{ 'd-none': !uploading }"
      @click="onPickFile"
      ref="btnUploadImage"
    >Escolher imagem</v-btn>
    <v-btn
      raised
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      :class="{ 'd-none': !cropping, 'white--text': true }"
      @click="uploadToImgur"
      ref="btnCropImage"
    >Cortar e fazer upload</v-btn>
    <v-btn fab dark small color="red" :class="{ 'd-none': !editing, 'btn-remove-image': true }" @click="changeImage">
      <v-icon dark>mdi-close</v-icon>
    </v-btn>

    <input type="file" class="d-none" ref="fileInput" accept="image/*" @change="onFileChange">
    <img :src="filename" ref="image" :class="{ 'd-none': uploading }">
  </div>
</template>

<script>
import imgur from 'imgur'
import Croppie from 'croppie'

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
      croppie: null,
      uploading: true,
      cropping: false,
      loading: false,
      editing: false
    }
  },
  watch: {
    value(v) {
      this.filename = v
      if (v === '') {
        this.uploading = true
        this.editing = false
      } else {
        this.uploading = false
        this.editing = true
      }
      if (this.croppie !== null) this.croppie.destroy()
      this.cropping = false
      this.loading = false
    }
  },
  mounted() {
    this.filename = this.value
  },

  methods: {
    onPickFile() {
      this.$refs.fileInput.click()
    },

    uploadToImgur() {
      var vm = this
      this.loading = true
      this.croppie
        .result({
          type: 'base64',
          size: {
            width: 640,
            height: 360
          }
        })
        .then(function(image) {
          imgur
            .uploadBase64(image.substring(22))
            .then(json => {
              vm.cropping = false
              vm.loading = false
              vm.filename = json.data.link
              vm.$emit('input', vm.filename)
            })
            .catch(function(err) {
              console.error(err.message)
            })
        })
      this.croppie.destroy()
    },

    startCrop(file) {
      var vm = this
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        //vm.filename = fileReader.result
        vm.croppie = new Croppie(vm.$refs.image, {
          viewport: {
            width: 320,
            height: 180
          },
          boundary: {
            width: 320,
            height: 180
          },
          url: fileReader.result
        })
      })
      fileReader.readAsDataURL(file)
      this.cropping = true
      this.uploading = false
    },

    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      this.startCrop(files[0])
    },

    changeImage() {
      this.filename = ''
      this.uploading = true
      this.editing = false
    }
  }
}
</script>

<style scoped>
@import url('~croppie/croppie.css');

img {
  width: 100%;
  height: 100%;
}
.v-btn {
  margin-left: -2px;
}

.btn-remove-image {
  float:right;
  margin-bottom: -55px;
}
</style>


