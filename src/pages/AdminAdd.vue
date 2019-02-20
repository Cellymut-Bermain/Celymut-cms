<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el to="/admin" label="Admin"/>
      <q-breadcrumbs-el label="Add Admin"/>
    </q-breadcrumbs>
    <q-card inline style="width: 100%;"  >
      <q-card-title>
        Add Admin
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-field
          icon="account_circle"
          helper="input your username"
        >
          <q-input v-model="username" float-label="Username" @keyup.enter="addAdmin" />
        </q-field>
        <q-field
          icon="lock"
          helper="input your password"
        >
          <q-input type="password" v-model="password" float-label="Password" @keyup.enter="addAdmin" />
        </q-field>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn @click="addAdmin" flat label="Add Admin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  let token = localStorage.getItem('token')
  import {api} from "../config";
  import axios from 'axios'

  export default {
    data () {
      return {
        username : '',
        password: ''
      }
    },
    computed: {
    },
    methods: {
      addAdmin () {
        axios.post(api+'admins/add', {
          username: this.username,
          password: this.password
        }, {
          headers: {
            token
          }
        })
          .then(({data})=> {
            swal(data.message || data.msg || data)
              .then(()=> {
                this.$router.push('/admin')
              })
          })
          .catch(err=> {
            swal(err.message || err)
          })
      }
    },
    created () {

    }
  }
</script>

