const Home = {
  data() {
    return {
      cars: [
        { name: "Tesla Model S", image: "assets/images/tesla_s.jpg", price: "$79,990" },
        { name: "BMW 3 Series", image: "assets/images/bmw_3_series.jpg", price: "$41,250" },
        { name: "Mercedes-Benz E-Class", image: "assets/images/mercedes.jpg", price: "$54,250" }
      ]
    };
  },
  methods: {
    goToPayment(car) {
      this.$router.push({ name: 'payment', params: { car: JSON.stringify(car) } });
    }
  },
  template: `
    <div class="container mt-5 home-container">
      <div class="text-center">
        <h1 class="display-4">Welcome to RuffCars</h1>
        <p class="lead">We offer a wide range of quality cars to suit every budget and preference. Explore our featured cars below!</p>
      </div>
      <h2 class="mt-5">Featured Cars</h2>
      <div id="carouselExampleIndicators" class="carousel slide mt-4" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(car, index) in cars" :class="{ active: index === 0 }" :key="index">
            <img :src="car.image" class="d-block w-100 carousel-img" :alt="car.name">
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ car.name }}</h5>
              <p>{{ car.price }}</p>
              <button @click="goToPayment(car)" class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="text-center mt-4">
        <router-link to="/cars" class="btn btn-secondary">View All Cars</router-link>
      </div>
    </div>
  `,
};
