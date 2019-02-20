<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/admin" label="Admin"/>
      <q-breadcrumbs-el label="Edit Admin"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Edit Admin
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-field
          icon="account_circle"
          helper="input your username"
        >
          <q-input readonly v-model="username" float-label="Username" @keyup.enter="updateAdmin" />
        </q-field>
        <q-field
          icon="lock"
          helper="input your new password"
        >
          <q-input type="password" v-model="password" float-label="Password" @keyup.enter="updateAdmin" />
        </q-field>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn @click="updateAdmin" flat label="Edit Admin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  import {api} from "../config";
  import axios from 'axios'
  const token = localStorage.getItem('token')
  export default {
    data () {
      return {
        username : '',
        password: '',
      }
    },
    computed: {
      // ...mapState([
      //   'loginStatus'
      // ])
    },
    methods: {
      updateAdmin () {
        let id = this.$route.params.id
        axios.put(api+'admins/update/'+id, {
          username: this.username,
          password: this.password
        }, {
          headers: {
            token
          }
        })
          .then(({data})=> {
            swal(data.message || data.msg)
              .then(this.$router.push('/admin'))
          })
          .catch(err=> {
            console.log(err)
          })
      },
      getOne () {
        let id = this.$route.params.id
        axios.get(api+'admins/'+id)
          .then(({data})=> {
            this.username = data.admin.username
          })
          .catch(err=> {
            console.log(err)
          })
      }
    },
    created () {
      this.getOne()
    }
  }
</script>

