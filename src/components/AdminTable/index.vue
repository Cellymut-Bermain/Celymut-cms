<template>
  <q-table
    :columns="columns"
    :data="admins"
    row-key="name"
    color="secondary"
    title="List Admin"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="username" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.username}} </div>
        </div>
      </q-td>
      <q-td key="role_admin"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.role_admin}} </div>
        </div>
      </q-td>
      <q-td key="createdAt"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.createdAt | getDate}} </div>
        </div>
      </q-td>
      <q-td key="updatedAt"  :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.updatedAt | getDate}} </div>
        </div>
      </q-td>
      <q-td key="actions"  :props="props" >
        <q-btn v-if="props.row.role_admin !=='super_admin'" @click="toEdit(props.row)" flat round color="primary"> <q-icon name="edit" />  </q-btn>
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
        'admins'
      ])
    },
    data () {
      return {
        columns: [
          { name: 'username', label: 'Username', field: 'username',
            align: 'left'},
          { name: 'role_admin', label: 'Role Admin', field: 'role_admin',
            align: 'left' },
          { name: 'createdAt', label: 'Create At', field: 'createdAt',
            align: 'left', sortable: true },
          { name: 'updatedAt', label: 'Updated At', field: 'updatedAt',
            align: 'left', sortable: true },
          { name: 'actions', label: 'Actions', field: 'actions',
            align: 'left'},
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
        'fetchingAdmins', 'deleteAdmin'
      ]),
      toDelete (row) {
        this.deleteAdmin(row)
      },
      toEdit (row) {
        this.$router.push('/admin-edit/'+row.id)
        // this.$q.notify({
        //   message: "soon update coming!!",
        //   position: 'top-right'
        // })
      }
    },
    mounted () {
      this.fetchingAdmins()
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
