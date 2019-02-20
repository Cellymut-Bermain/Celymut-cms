
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/admin', component: () => import('pages/Admin.vue') },
      { path: '/admin-add', component: () => import('pages/AdminAdd.vue') },
      { path: '/admin-edit/:id', component: () => import('pages/AdminEdit.vue') },
      { path: '/item', component: () => import('pages/Item.vue') },
      { path: '/item-add', component: () => import('pages/ItemAdd.vue') },
      { path: '/item-edit/:id', component: () => import('pages/ItemEdit.vue') },
      { path: '/transaction', component: () => import('pages/Transaction.vue') },
      { path: '/user', component: () => import('pages/User.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
