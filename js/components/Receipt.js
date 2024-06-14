const Receipt = {
    data() {
      return {
        car: null,
        name: '',
        email: '',
        phone: '',
      };
    },
    created() {
      if (this.$route.params.car) {
        this.car = JSON.parse(this.$route.params.car);
        this.name = this.$route.params.name;
        this.email = this.$route.params.email;
        this.phone = this.$route.params.phone;
      }
    },
    template: `
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>Receipt</h1>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Order Details</v-card-title>
              <v-card-text>
                <p><strong>Car:</strong> {{ car }}</p>
                <p><strong>Name:</strong> {{ name }}</p>
                <p><strong>Email:</strong> {{ email }}</p>
                <p><strong>Phone:</strong> {{ phone }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="$router.push('/home')">Go to Home</v-btn>
      </v-container>
    `,
};
  
  