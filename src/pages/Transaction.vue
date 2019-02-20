<template>
  <q-page padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el  label="Transactions"/>
    </q-breadcrumbs>
    <TransactionsTable />
    <ModalTrans v-if="modalTrans" />
  </q-page>
</template>

<script>
  import TransactionsTable from '../components/TransactionTable'
  import ModalTrans from '../components/ModalTrans'
  export default {
    components: {TransactionsTable, ModalTrans},
    computed: {
      modalTrans: {
        get() {
          return this.$store.state.modalTrans
        }
      }
    }

  }
</script>
