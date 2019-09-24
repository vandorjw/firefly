const routes = [
    { path: '/tasks', component: TaskList },
    { path: '/blogs', component: BlogList },
    { path: '/blogs/create', component: BlogCreate },
    { path: '/blogs/update/:id', name: 'BlogUpdate', component: BlogUpdate},
    { path: '/profile', component: Profile },
    { path: '/auth', component: AuthUI },
    { path: '/', component: Home}
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })