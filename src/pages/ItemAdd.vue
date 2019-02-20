<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/item" label="Item"/>
      <q-breadcrumbs-el label="Add Item"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Add Item
      </q-card-title>
      <q-card-separator />
      <q-card-main>

        <q-field
          icon="label"
          helper="input your item stock"
        >
          <q-input v-model="item_stock" float-label="Item Stocks" type="number"  suffix="Pcs" />
        </q-field>

        <q-field
          icon="label"
          helper="input your item price"
        >
          <q-input v-model="item_price" float-label="Item Price" type="number"  prefix="Rp" />
        </q-field>
        <br>

        <q-field
          icon="label"
          helper="Select your Category Item"
        >
          <q-select
            v-model="select"
            :options="parents"
          />
        </q-field>

        <br>

        <q-field
          icon="label"
          helper="Select your Size Item"
        >
          <q-btn-toggle
            v-model="size"
            toggle-color="primary"
            :options="[
              {label: 'King Size', value: 'King Size (230cm x 230cm)'},
              {label: 'Single Size', value: 'Single Size (150cm x 230 cm)'},
            ]"
          />
        </q-field>
        <br>
        <q-field>
          <div class="justify-left row wrap align-start">
            <div v-for="(color, index) in colors" :key="index" class="col-1">
              <img class="image-color" @click="chooseColor(color)" style="width: 50px; height: auto" :src="color.color" alt="">
            </div>
          </div>
        </q-field>
        <q-field>
          <div> {{color_pick}} </div>
        </q-field>

        <q-field >
          <input class="custom-file-input" @change="onChangeHandler" type="file">
          <q-btn @click="uploadImage" :loading="loading"
                 :percentage="percentage" size="lg" color="red" flat round icon="cloud_upload" >
            <q-tooltip>Upload</q-tooltip>
          </q-btn>
          <br>
          <label > Max File 1MB</label>
        </q-field>
        <q-field v-if="item_image" >
          <img style="width: 100px; height: auto" :src="item_image" alt=""><br>
          <q-btn small flat @click="deleteImage" icon="delete" round color="red"></q-btn>
        </q-field>

      </q-card-main>
      <q-card-actions align="end">
        <q-btn @click="addItem" flat label="Add Item" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  let token = localStorage.getItem('token')
  import {api, storage} from "../config";
  import axios from 'axios'
  import swal from 'sweetalert'
  import colors from '../config/color'

  export default {
    data () {
      return {
        colors,
        color_pick: 'blush',
        // item_stock: null,
        item_stock: 20,
        item_price: 900000,
        // item_price: null,
        // item_image: null,
        image: '',
        // image_name: null,
        item_image: 'https://firebasestorage.googleapis.com/v0/b/cellymut-staging.appspot.com/o/assets%2Fmonopoly-01.png?alt=media&token=42b0f44b-651d-4de9-ae6f-dcc270260a83',
        image_name: 'monopoly-01.png',
        loading: false,
        percentage: 0,
        parents : [],
        select: 1,
        size: 'Single Size (150cm x 230 cm)',
      }
    },
    computed: {
    },
    methods: {
      chooseColor(color) {
        let temp = color.color
        temp = temp.split('/')
        temp = temp[1]
        temp = temp.split('.')
        temp = temp[0]
        console.log(temp)
        this.color_pick = temp
      },
      addItem () {
        axios.post(api+'items/add', {
          item_price : this.item_price,
          item_stocks: this.item_stock,
          item_image: this.item_image,
          image_name: this.image_name,
          parent_id: this.select,
          size: this.size,
          color: this.color_pick
        }, {
          headers: {
            token
          }
        })
          .then(({data})=> {
            swal('Berhasil menambahkan item baru!')
            console.log(data)
            if (data.status) {
              swal(data.msg).then(()=> {this.$router.push('/item')})
            }
            else {
              swal(data.msg)
            }
          })
          .catch(err=> {
            console.log(err)
          })
      },
      onChangeHandler (e) {
        this.image = e.target.files[0]
      },
      uploadImage () {
        let self = this
        if (this.image) {
          self.loading = true
          // const interval = setInterval(() => {
          //   this.percentage += Math.floor(Math.random() * 8 + 10)
          //   if (this.percentage >= 100) {
          //     clearInterval(interval)
          //   }
          // }, 700)
          console.log(this.image)
          storage.ref('assets/'+this.image.name).put(this.image)
            .then(()=> {
              storage.ref('assets/'+this.image.name).getDownloadURL()
                .then((url)=> {
                  console.log('ini url', url)
                  self.item_image = url
                  self.image_name = self.image.name
                  self.loading = false
                })
                .catch(err=> {
                  console.log('gagal get url download', err)
                })
            })
            .catch(err=> {
              console.log(err)
            })
        }
        else {
          swal('Image tidak boleh kosong!!')
        }
      },
      deleteImage () {
        storage.ref('assets/'+this.image.name).delete()
          .then(()=> {
            this.item_image = null
            this.image = null
          })
          .catch(err=> {
            console.log(err)
          })
      },
      fetchingParents () {
        axios.get(api+'items/parents/all')
          .then(({data})=> {
            console.log(data)
            let parents = data.parents
            let temp = []
            for(var i=0;i<parents.length;i++) {
              let obj = {}
              obj.label = parents[i].item_name
              obj.value = parents[i].id
              temp.push(obj)
            }
            this.parents = temp
          })
          .catch(err=> {
            console.log(err)
          })
      }
    },
    mounted () {
      this.fetchingParents()
    }
  }
</script>

<style>
  .image-color {
    cursor: pointer !important;
  }
  .image-color:active {

  }
</style>
