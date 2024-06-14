const routes = [
  { path: '/', component: Login, name: 'login' },
  { path: '/home', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
  { path: '/cars', component: Cars, name: 'cars' },
  { path: '/payment', component: Payment, name: 'payment' },
  { path: '/receipt', component: Receipt, name: 'receipt' },
  { path: '/reviews', component: Reviews, name: 'reviews' },
  { path: '/contact', component: Contact, name: 'contact' },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  data() {
    return {
      authenticated: false,
      authenticatedUser: '',
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
      this.$router.push({ name: 'login' });
    }
  },
  created() {
    // Redirect to login if not authenticated
    if (!this.authenticated) {
      this.$router.push({ name: 'login' });
    }
  }
});

app.use(router);
app.component('nav-bar', Navbar);

router.beforeEach((to, from, next) => {
  if (!app.config.globalProperties.$root) {
    next();
  } else {
    const isAuthenticated = app.config.globalProperties.$root.authenticated;
    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
    else next();
  }
});

const vuetify = Vuetify.createVuetify();
app.use(vuetify);
app.mount('#app');