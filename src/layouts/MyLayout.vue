<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item to="/admin" >
          <q-item-side icon="account_circle" />
          <q-item-main label="Admin" sublabel="Admin Page" />
        </q-item>
        <q-item to="/item" >
          <q-item-side icon="style" />
          <q-item-main label="Item" sublabel="Item Page" />
        </q-item>
        <q-item to="/transaction" >
          <q-item-side icon="shopping_cart" />
          <q-item-main label="Transaction" sublabel="Transactions Page" />
        </q-item>
        <q-item to="/user" >
          <q-item-side icon="people" />
          <q-item-main label="User" sublabel="Users Page" />
        </q-item>
        <!--<q-item   >-->
          <!--<q-item-side icon="logout" />-->
          <!--<q-item-main label="Logout" />-->
        <!--</q-item>-->

        <q-list-header>Account</q-list-header>
        <q-item @click.native="logout">
          <q-item-side icon="logout" />
          <q-item-main label="Logout" sublabel="Quit Application" ></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout () {
      swal({
        title: "Are you sure?",
        text: "Once logout, you have to login to see the content!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willLogout)=> {
          if (willLogout) {
            localStorage.clear()
            this.$router.push('/login')
          }
        })
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
