<template>
  <q-table
    :columns="columns"
    row-key="name"
    :data="users"
    color="secondary"
    title="Registered User"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="id" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.id}} </div>
        </div>
      </q-td>
      <q-td key="first_name" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.first_name}} </div>
        </div>
      </q-td>
      <q-td key="last_name" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.last_name}} </div>
        </div>
      </q-td>
      <q-td key="email" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.email}} </div>
        </div>
      </q-td>
      <q-td key="phone_number" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.phone_number}} </div>
        </div>
      </q-td>
      <q-td key="address" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.address}} </div>
        </div>
      </q-td>
      <q-td key="city" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.city}} </div>
        </div>
      </q-td>
      <q-td key="country" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.country}} </div>
        </div>
      </q-td>
      <q-td key="provinsi" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.provinsi}} </div>
        </div>
      </q-td>
      <q-td key="postal_code" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.postal_code}} </div>
        </div>
      </q-td>
      <q-td key="createdAt" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.createdAt | getDate}} </div>
        </div>
      </q-td>
      <q-td key="updatedAt" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.updatedAt | getDate}} </div>
        </div>
      </q-td>
    </q-tr>

  </q-table>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    computed: {
      ...mapState([
        'users'
      ])
    },
    data () {
      return {
        columns: [
          { name: 'id', label: 'ID', field: 'id',
            align: 'left' },
          { name: 'first_name', label: 'First Name', field: 'first_name',
            align: 'left' },
          { name: 'last_name', label: 'Last Name', field: 'last_name',
            align: 'left' },
          { name: 'email', label: 'Email', field: 'email',
            align: 'left' },
          { name: 'phone_number', label: 'Phone Number', field: 'phone_number',
            align: 'left'},
          { name: 'address', label: 'Address', field: 'address',
            align: 'left'},
          { name: 'city', label: 'City', field: 'city',
            align: 'left'},
          { name: 'country', label: 'Country', field: 'country',
            align: 'left'},
          { name: 'provinsi', label: 'Provinsi ', field: 'provinsi',
            align: 'left'},
          { name: 'postal_code', label: 'Postal Code ', field: 'postal_code',
            align: 'left'},
          { name: 'createdAt', label: 'Created At ', field: 'createdAt',
            align: 'left', sortable: true},
          { name: 'updatedAt', label: 'Updated At ', field: 'updatedAt',
            align: 'left', sortable: true},
        ],
        pagination: {
          sortBy: null, // String, column "name" property value
          descending: false,
          page: 1,
          rowsPerPage: 100 // current rows per page being displayed
        },
      }
    },
    methods: {
      ...mapActions([
        'fetchingUsers'
      ]),
    },
    mounted () {
      this.fetchingUsers()
    },
    filters : {
      getDate (value) {
        let date = moment(value).format("MMMM Do YYYY");
        let time = moment(value).format("h:mm:ss a")
        return `${date} - ${time}`
      }
    }
  }
</script>
