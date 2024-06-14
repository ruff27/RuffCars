const Login = {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'hellovue') {
        this.$root.setAuthenticated(true);
        this.$router.push('/home');
      } else {
        this.error = 'Invalid username or password';
      }
    },
  },
  template: `
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <h1>Login</h1>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary">Login</v-btn>
            <p v-if="error" class="text-danger mt-2">{{ error }}</p>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  `,
};
