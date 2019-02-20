<template>
  <q-page padding >
    <q-breadcrumbs>
      <q-breadcrumbs-el to="/" label="Home"/>
      <q-breadcrumbs-el  label="Item"/>
    </q-breadcrumbs>
    <ItemTable />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn to="/item-add" color="primary" size="xl" round > <q-icon name="add" /> </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
  import ItemTable from '../components/ItemTable'
  export default {
    components: {
      ItemTable
    }
  }
</script>
