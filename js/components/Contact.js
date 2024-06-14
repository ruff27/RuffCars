const Contact = {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      error: '',
      valid: true,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        name: value => {
          const pattern = /^[a-zA-Z\s]+$/;
          return pattern.test(value) || 'Name can only contain letters.';
        },
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      }
    },
    async submitForm() {
      const response = await fetch('http://localhost/RuffCars/backend/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        this.success = result.message;
        this.error = '';
        this.name = '';
        this.email = '';
        this.message = '';
      } else {
        this.error = result.message;
      }
    },
  },
  template: `
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <h1>Contact Us</h1>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.name]"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="Email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="message"
              :rules="[rules.required]"
              label="Message"
              required
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn color="primary" @click="validate">Submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
      <p v-if="success" class="text-success mt-2">{{ success }}</p>
    </v-container>
  `,
};
