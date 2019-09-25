const routes = [{
    path: '/tasks',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/blogs',
    name: 'BlogList',
    component: BlogList
  },
  {
    path: '/blogs/create',
    name: 'BlogCreate',
    component: BlogCreate
  },
  {
    path: '/blogs/update/:id',
    name: 'BlogUpdate',
    component: BlogUpdate
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/auth',
    name: 'AuthUI',
    component: AuthUI
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})