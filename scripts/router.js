const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/blogs', component: BlogList },
    { path: '/profile', component: Profile },
    { path: '/auth', component: AuthUI }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })