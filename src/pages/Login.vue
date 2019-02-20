<template>
  <div class="justify-center row items-center" >
    <q-card inline style="width: 500px;margin-top:30vh"  >
      <q-card-title>
        LOGIN
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <q-field
          icon="account_circle"
          helper="input your username"
        >
          <q-input v-model="username" float-label="Username" @keyup.enter="login" />
        </q-field>
        <q-field
          icon="lock"
          helper="input your password"
        >
          <q-input type="password" v-model="password" float-label="Password" @keyup.enter="login" />
        </q-field>
      </q-card-main>
      <q-card-actions align='end'>
        <q-btn  @click="login" flat label="Login"  />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import {api} from '../config'
  import swal from 'sweetalert'
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
      login () {
        axios.post(api+'admins/login', {
          username: this.username,
          password: this.password
        })
          .then(({data})=> {
            console.log(data)
            this.$q.notify({
              message: "Welcome " + data.admin.username,
              timeout: 3000,
              type: 'positive',
              color: 'positive',
            })
            localStorage.setItem('token', data.token)
            this.$router.push('/')
          })
          .catch(err=> {
            console.log(err)
            swal(err.message | err)
          })
      }
    },
    created () {
      let token = localStorage.getItem('token')
      if (token) {
        this.$router.push('/')
      }
    }
  }
</script>
