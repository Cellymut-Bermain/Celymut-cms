<template>
  <q-modal v-model="modalTrans">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Detail Pembelian
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          v-close-overlay
          icon="clear"
        />
      </q-toolbar>
      <div style="width: 100%;padding: 24px">
        <q-card>
          <q-card-title>
            Nama Barang : {{productDetail.Item.item_name}}
          </q-card-title>
          <q-card-main>
            <p>Nama Customer: {{productDetail.User.first_name}} {{productDetail.User.last_name}} </p>
            <p>Email Customer: {{productDetail.User.email}}</p>
            <p>Phone Customer: {{productDetail.User.phone_number}}</p>
            <p>Courier Cost: {{productDetail.cost_courier}} </p>
            <p>Courier Type: {{productDetail.type_courier}}</p>
            <p>Alamat Pengriman:
              {{productDetail.alamat_pengiriman}}
            </p>
          </q-card-main>
        </q-card>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  export default {
    computed: {
      modalTrans: {
        get() {
          return this.$store.state.modalTrans
        },
        set(value) {
          this.$store.commit('setModalTrans', value)
        }
      },
      productDetail: {
        get(){
          return this.$store.state.productDetail
        }
      }
    }
  }
</script>
