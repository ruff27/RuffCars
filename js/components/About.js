const About = {
  template: `
    <div class="container mt-5 about-container">
      <h1>About Us</h1>
      <p class="lead">We are a car dealership website based in Melbourne, VIC, Australia, delivering the best to car buyers.</p>
      <p>Explore our extensive collection of cars on the <router-link to="/cars" class="text-primary">Cars</router-link> page or get in touch with us through our <router-link to="/contact" class="text-primary">Contact</router-link> page.</p>
      <div class="about-image-container">
        <img src="assets/images/showroom.jpg" alt="Car Showroom" class="img-fluid rounded">
      </div>
    </div>
  `,
};
