<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/item" label="Item"/>
      <q-breadcrumbs-el label="Edit Item"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Edit Item
      </q-card-title>
      <q-card-separator />
      <q-card-main>

        <q-field
          icon="label"
          helper="input your item stock"
        >
          <q-input v-model="item_stock" float-label="Item Stocks" type="number"  suffix="Pcs" @keyup.enter="EditItem" />
        </q-field>

        <q-field
          icon="label"
          helper="input your item price"
        >
          <q-input v-model="item_price" float-label="Item Stocks" type="number"  prefix="Rp" @keyup.enter="EditItem" />
        </q-field>

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
        <q-btn @click="EditItem" flat label="Edit Item" />
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
        item_stock: null,
        item_price: null,
        item_image: null,
        image: '',
        image_name: null,
        loading: false,
        percentage: 0,
        parents : [],
        select: 1,
        size: null,
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
      EditItem () {
        let id = this.$route.params.id
        console.log(this.color_pick)
        axios.put(api+'items/update/'+id, {
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
            console.log(data)
            swal('Berhasil edit item!')
            this.$router.push('/item')
          })
          .catch(err=> {
            console.log(err)
          })
      },
      onChangeHandler (e) {
        this.image = e.target.files[0]
      },
      uploadImage () {
        if (this.image) {
          this.loading = true
          const interval = setInterval(() => {
            this.percentage += Math.floor(Math.random() * 8 + 10)
            if (this.percentage >= 100) {
              clearInterval(interval)
              this.loading = false
            }
          }, 700)
          console.log(this.image)
          storage.ref('assets/'+this.image.name).put(this.image)
            .then(()=> {
              storage.ref('assets/'+this.image.name).getDownloadURL()
                .then((url)=> {
                  console.log('ini url', url)
                  this.item_image = url
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
        storage.ref('assets/'+this.image_name).delete()
          .then(()=> {
            this.item_image = null
            this.image_name = null
            this.image = null
          })
          .catch(err=> {
            console.log(err)
          })
      },
      fetchingGetOne () {
        let id = this.$route.params.id
        console.log('ini idn ya', id)
        axios.get(api+'items/'+id)
          .then(({data})=> {
            let temp = data.item
            this.item_image = temp.item_image
            this.item_stock = temp.item_stocks
            this.item_price = temp.item_price
            this.image_name = temp.image_name
            this.select = temp.parent_id
            this.size = temp.size
            this.color_pick = temp.color
            console.log(temp)
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
    created () {
      this.fetchingParents()
      this.fetchingGetOne()
    }
  }
</script>
