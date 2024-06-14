const Navbar = {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="$root.authenticated">
      <router-link class="navbar-brand" to="/home">RuffCars</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item"><router-link to="/home" class="nav-link">Home</router-link></li>
          <li class="nav-item"><router-link to="/about" class="nav-link">About</router-link></li>
          <li class="nav-item"><router-link to="/cars" class="nav-link">Our Cars</router-link></li>
          <li class="nav-item"><router-link to="/reviews" class="nav-link">Reviews</router-link></li>
          <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
        </ul>
        <button @click="$root.logout()" class="btn btn-outline-danger my-2 my-sm-0">Logout</button>
      </div>
    </nav>
  `,
};
