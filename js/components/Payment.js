const Payment = {
  data() {
    return {
      car: null,
      name: '',
      phoneNumber: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      error: '',
      valid: true,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        phoneNumber: value => {
          const pattern = /^[0-9]{10}$/;
          return pattern.test(value) || 'Must be a valid phone number (10 digits).';
        },
        name: value => {
          const pattern = /^[a-zA-Z\s]+$/;
          return pattern.test(value) || 'Name can only contain letters.';
        },
      },
    };
  },
  created() {
    if (this.$route.params.car) {
      this.car = JSON.parse(this.$route.params.car);
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.processPayment();
      }
    },
    async processPayment() {
      const response = await fetch('http://localhost/RuffCars/backend/payment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car: this.car.name,
          name: this.name,
          phone: this.phoneNumber,
          email: this.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        this.$router.push({
          name: 'receipt',
          params: {
            car: JSON.stringify(this.car),
            name: this.name,
            email: this.email,
            phone: this.phoneNumber
          }
        });
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
            <h1>Payment</h1>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="car.name"
              label="Car"
              disabled
            ></v-text-field>
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
              v-model="phoneNumber"
              :rules="[rules.required, rules.phoneNumber]"
              label="Phone Number"
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
            <v-text-field
              v-model="cardNumber"
              :rules="[rules.required]"
              label="Card Number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="expiryDate"
              :rules="[rules.required]"
              label="Expiry Date"
              required
            ></v-text-field>
          </v-col>
           <v-col cols="12">
            <v-text-field
              v-model="cvc"
              :rules="[rules.required]"
              label="CVC"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
          <v-col cols="12">
            <v-btn color="primary" @click="validate">Pay Now</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </v-container>
  `,
};
