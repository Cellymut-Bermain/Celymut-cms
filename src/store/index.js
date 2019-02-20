import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from '../router/index'
import {api} from "../config";
import { Notify } from 'quasar'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    users: [],
    admins: [],
    transactions: [],
    items: [],
    modalTrans: false,
    productDetail: null
  },
  mutations: {
    setModalTrans (state, payload) {
      state.modalTrans = payload
    },
    setProductDetail (state, payload) {
      state.productDetail = payload
    },
    setAdmins (state, payload) {
      state.admins = payload
    },
    setDeleteAdmin (state, payload) {
      state.admins.splice(payload, 1)
    },

    setItems (state, payload) {
      state.items = payload
    },
    changeStatusItem (state, payload) {
      state.items[payload.__index] = payload
      state.items[payload.__index].status = payload.statusTemp
    },

    setTransactions (state, payload) {
      state.transactions = payload
    },


    setUsers (state, payload) {
      state.users = payload
    },

    setTrans (state, payload) {
      state.transactions = payload
    },
    setConfirmTrans (state, payload) {
      state.transactions[payload].status_transaction += 1
    },
    setRejectTrans (state, payload) {
      state.transactions[payload].status_transaction = -1
    }


  },
  actions: {
    fetchingAdmins ({commit}) {
      axios.get(api+'admins')
        .then(({data})=> {
          commit('setAdmins',data.admins)
        })
        .catch(err=> {
          console.log('Some error', err)
        })
    },
    deleteAdmin ({commit}, payload) {
      let token = localStorage.getItem('token')
      axios.delete(api+'admins/delete/'+payload.id, {
        headers: {
          token
        }
      })
        .then(({data})=> {
          swal(data.message || data.msg || data)
            commit('setDeleteAdmin', payload.__index)
        })
        .catch(err=> {
          swal(err.message || err)
        })
    },



    fetchingItems ({commit}) {
      axios.get(api+'items')
        .then(({data})=> {
          let temp = data.items
          for (var i=0;i<temp.length;i++) {
            if (temp[i].status==1) {
              temp[i].status = true
            }
            else {
              temp[i].status = false
            }
          }
          console.log('ini temp',temp)
          commit('setItems', temp)
        })
        .catch(err=> {
          console.log(err)
        })
    },
    changeStatus({commit}, payload) {
      let token = localStorage.getItem('token')
      payload.statusTemp = payload.status
      if (payload.status === true) {
        payload.status = 1
      }
      else {
        payload.status = 0
      }
      axios.put(api+'items/change-status/'+ payload.id, {
        status: payload.status
      }, {
        headers: {
          token
        }
      })
        .then(({data})=> {
          console.log(data.message || data.msg )
          commit('changeStatusItem', payload)
        })
        .catch(err=> {
          console.log(err)
        })
    },


    fetchingUsers ({commit}) {
      axios.get(api+'users')
        .then(({data})=> {
          console.log(data)
          commit('setUsers', data.users)
        })
        .catch(err=> {
        console.log(err)
      })
    },


    fetchingTrans ({commit}) {
      axios.get(api+'transactions')
        .then(({data})=> {
          console.log(data)
          commit('setTrans', data.trans)

        })
        .catch(err=> {
          console.log(err)
        })
    },
    confirmTrans ({commit}, payload){
      swal({
        title: "Apakah kamu yakin?",
        text: "Status transaksi ini akan berubah",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.put(api+'transactions/confirm/'+payload.id,{}, {})
              .then(({data})=> {
                console.log(data)
                swal('Kamu berhasil konfirmasi pembayaran!!')
                commit('setConfirmTrans', payload.__index)
              })
              .catch(err=> {
                console.log(err)
              })
          }
        });
    },
    rejectTrans ({commit}, payload) {
      swal({
        title: "Apakah kamu yakin?",
        text: "Transaksi ini akan ditandai sebagai orderan gagal",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.put(api+'transactions/reject/'+payload.id,payload, {})
              .then(({data})=> {
                console.log('data',data)
                swal('Kamu berhasil menolak transaksi ini !!')
                commit('setRejectTrans', payload.__index)
              })
              .catch(err=> {
                console.log(err)
              })
          }
        });
    }
  }
})
