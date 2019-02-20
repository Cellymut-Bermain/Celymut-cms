<template>
  <q-table
    :columns="columns"
    :data="items"
    row-key="name"
    color="secondary"
    title="List Items"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="item_image" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> <img style="width: 100px; height: 100px" :src="props.row.item_image" alt=""> </div>
        </div>
      </q-td>
      <q-td key="item_name" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.item_name}}  </div>
        </div>
      </q-td>
      <q-td key="item_price" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.item_price}}  </div>
        </div>
      </q-td>
      <q-td key="item_stocks" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.item_stocks}}  </div>
        </div>
      </q-td>
      <q-td key="status" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <!--<div> {{props.row.status}}  </div>-->
          <!--<div><q-toggle @input="buttonTrigger(props.row)" v-model="props.row.status" checked-icon /></div>-->
          <div class="row wrap items-center">
            <div class="col-lg-3">
            <img style="30px; height: 30px;" :src="color_parsed[props.row.color]" alt="">
            </div>
            <div class="col-lg-8"> {{props.row.size}}  </div>
          </div>
        </div>
      </q-td>
      <q-td key="createdAt" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.createdAt | getDate}}  </div>
        </div>
      </q-td>
      <q-td key="updatedAt" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.updatedAt | getDate}}  </div>
        </div>
      </q-td>
      <q-td key="actions"  :props="props" >
        <q-btn v-if="props.row.parent_id!==-1" @click="toEdit(props.row)"  flat round color="primary"> <q-icon name="edit" />  </q-btn>
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import moment from 'moment'
  import color from '../../config/color'
  export default {
    data () {
      return {
        columns: [
          { name: 'item_image', label: 'Item Image', field: 'item_image',
            align: 'left' },
          { name: 'item_name', label: 'Item Name', field: 'item_name',
            align: 'left', sortable: true },
          { name: 'item_price', label: 'Item Price', field: 'item_price',
            align: 'left' },
          { name: 'item_stocks', label: 'Item Stocks', field: 'item_stocks',
            align: 'left' },
          { name: 'status', label: 'Item (Color, Size)', field: 'status',
            align: 'left' },
          { name: 'createdAt', label: 'Created At', field: 'createdAt',
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
        color
      }
    },
    methods: {
      ...mapActions([
        'fetchingItems', 'changeStatus'
      ]),
      toEdit(row) {
        console.log(row)
        this.$router.push('/item-edit/'+row.id)
      },
      buttonTrigger(row) {
        this.changeStatus(row)
      },
    },
    computed: {
      ...mapState([
        'items'
      ]),
      color_parsed () {
        let temp = {}
        for(var i=0;i<this.color.length;i++) {
          temp[this.color[i].value] = this.color[i].color
        }
        return temp
      }
    },
    mounted () {
      this.fetchingItems()
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
