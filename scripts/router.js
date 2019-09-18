const routes = [
    { path: '/tasks', component: TaskList },
    { path: '/blogs', component: BlogList },
    { path: '/profile', component: Profile },
    { path: '/auth', component: AuthUI }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })