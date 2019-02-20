<template>
  <q-table
    :columns="columns"
    :data="transactions"
    row-key="name"
    color="secondary"
    title="List Items"
    :pagination.sync="pagination"
  >
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="item_image" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> <img style="width: 100px; height: 100px" :src="props.row.Item.item_image" alt=""> </div>
        </div>
      </q-td>
      <q-td key="item_name" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.Item.item_name}} </div>
        </div>
      </q-td>
      <q-td key="detail" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <q-btn flat color="orange" @click="setDetail(props.row)">Detail</q-btn>
        </div>
      </q-td>
      <q-td key="item_price" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> Rp.{{props.row.total | parsedMoney}} </div>
        </div>
      </q-td>
      <q-td key="item_stocks" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div> {{props.row.Item.item_stocks}} pcs </div>
        </div>
      </q-td>
      <q-td key="status" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div v-if="props.row.status_transaction===0"> Menunggu Pembayaran </div>
        </div>
        <div class="row items-center justify-between no-wrap">
          <div v-if="props.row.status_transaction===1"> Sudah Dibayar </div>
        </div>
        <div class="row items-center justify-between no-wrap">
          <div v-if="props.row.status_transaction===2"> Barang Telah Dikirim </div>
        </div>
        <div class="row items-center justify-between no-wrap">
          <div v-if="props.row.status_transaction===3"> Barang Sampai </div>
        </div>
        <div class="row items-center justify-between no-wrap">
          <div v-if="props.row.status_transaction===-1"> Orderan gagal </div>
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
      <q-td key="actions" :props="props" >
        <div class="row items-center justify-between no-wrap">
          <div>
            <q-btn v-if="props.row.status_transaction==0" flat color="primary" @click="confirm(props.row)"><q-tooltip>Konfirmasi Pembayaran</q-tooltip>Confirm</q-btn>
            <q-btn v-if="props.row.status_transaction==1" flat color="primary" @click="confirm(props.row)"><q-tooltip>Barang telah dikirim</q-tooltip>Send Package</q-btn>
            <q-btn v-if="props.row.status_transaction==2" flat color="primary" @click="confirm(props.row)"><q-tooltip>Konfirmasi barang telah diterima</q-tooltip>Order Done</q-btn>
            <q-btn v-if="props.row.status_transaction==3" color="secondary"><q-tooltip>Barang telah sampai</q-tooltip>Finished</q-btn>
            <q-btn v-if="props.row.status_transaction!==3 && props.row.status_transaction!==-1" flat color="red" @click="reject(props.row)"><q-tooltip>Tolak Pembayaran</q-tooltip>Reject</q-btn>
            <q-btn v-if="props.row.status_transaction==-1" color="red"><q-tooltip>Orderan Gagal</q-tooltip>Order Failed</q-btn>
          </div>
        </div>
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    data () {
      return {
        columns: [
          { name: 'item_image', label: 'Item Image', field: 'item_image',
            align: 'left' },
          { name: 'item_name', label: 'Item Name', field: 'item_name',
            align: 'left' },
          { name: 'detail', label: 'Detail Trans', field: 'detail',
            align: 'left' },
          { name: 'item_price', label: 'Item Total Transactions', field: 'item_price',
            align: 'left' },
          { name: 'item_stocks', label: 'Item Stocks', field: 'item_stocks',
            align: 'left' },
          { name: 'status', label: 'Item Status', field: 'status',
            align: 'left'},
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
      }
    },
    methods: {
      ...mapActions([
        'fetchingTrans', 'confirmTrans', 'rejectTrans'
      ]),
      confirm(row) {
        this.confirmTrans(row)
      },
      reject(row) {
        this.rejectTrans(row)
      },
      setDetail(row) {
        this.$store.commit('setProductDetail', row)
        this.$store.commit('setModalTrans', true)
      }

    },
    computed: {
      ...mapState([
        'transactions'
      ]),
    },
    mounted () {
      this.fetchingTrans()
    },
    filters : {
      getDate (value) {
        let date = moment(value).format("MMMM Do YYYY");
        let time = moment(value).format("h:mm:ss a")
        return `${date} - ${time}`
      },
      parsedMoney (value) {
        return Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
      }
    }
  }
</script>
