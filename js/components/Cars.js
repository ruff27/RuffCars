const Cars = {
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      cars: [],
      currentPage: 1,
      carsPerPage: 4,
      error: "",
      search: "",
      selectedBrand: "All Brands",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredCars.length / this.carsPerPage);
    },
    filteredCars() {
      return this.cars.filter(car => {
        return (
          car.name.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.selectedBrand === "All Brands" || car.manufacturer === this.selectedBrand)
        );
      });
    },
    paginatedCars() {
      const start = (this.currentPage - 1) * this.carsPerPage;
      const end = start + this.carsPerPage;
      return this.filteredCars.slice(start, end);
    },
    brands() {
      return ['All Brands', ...new Set(this.cars.map(car => car.manufacturer))];
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    proceedToPayment(car) {
      this.$router.push({ name: 'payment', params: { car: JSON.stringify(car) } });
    },
    setSelectedBrand(brand) {
      this.selectedBrand = brand;
      this.currentPage = 1; // Reset to the first page when changing the brand
    },
    likeCar(car) {
      car.likes = (car.likes || 0) + 1;
    }
  },
  mounted() {
    fetch('data/cars.json')
      .then(response => response.json())
      .then(data => {
        this.cars = data;
      })
      .catch(error => {
        this.error = "Failed to fetch";
      });
  },
  template: `
    <div class="container mt-5 cars-container">
      <h1>Our Cars</h1>
      <div class="filters mb-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ selectedBrand }}</button>
            <div class="dropdown-menu">
              <button class="dropdown-item" v-for="brand in brands" :key="brand" @click="setSelectedBrand(brand)">{{ brand }}</button>
            </div>
          </div>
          <input type="text" v-model="search" class="form-control" placeholder="Search Cars...">
        </div>
        
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Price</th>
              <th scope="col">Image</th>
              <th scope="col">Likes</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="car in paginatedCars" :key="car.name">
              <td>{{ car.name }}</td>
              <td>{{ car.manufacturer }}</td>
              <td>{{ car.price }}</td>
              <td><img :src="car.image" class="img-thumbnail car-image" alt="car image"></td>
              <td>{{ car.likes || 0 }} <button class="btn btn-sm btn-outline-secondary" @click="likeCar(car)"><i class="fas fa-thumbs-up"></i> Like</button></td>
              <td><button class="btn btn-primary" @click="proceedToPayment(car)">Buy Now</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <paginate
        :page-count="totalPages"
        :click-handler="changePage"
        :prev-text="'Previous'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
      />
    </div>
  `,
};
