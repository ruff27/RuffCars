const Reviews = {
  data() {
    return {
      newReview: '',
      newName: '',
      reviews: [],
      editIndex: null,
      editReviewText: '',
      editName: ''
    };
  },
  methods: {
    addReview() {
      if (this.newReview && this.newName) {
        this.reviews.push({ name: this.newName, content: this.newReview });
        this.newReview = '';
        this.newName = '';
      }
    },
    editReview(index) {
      this.editIndex = index;
      this.editReviewText = this.reviews[index].content;
      this.editName = this.reviews[index].name;
    },
    saveReview(index) {
      if (this.editReviewText && this.editName) {
        this.reviews[index].content = this.editReviewText;
        this.reviews[index].name = this.editName;
        this.editIndex = null;
        this.editReviewText = '';
        this.editName = '';
      }
    },
    deleteReview(index) {
      this.reviews.splice(index, 1);
    },
    cancelEdit() {
      this.editIndex = null;
      this.editReviewText = '';
      this.editName = '';
    }
  },
  template: `
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center">Reviews</h1>
          <v-form @submit.prevent="addReview">
            <v-text-field
              v-model="newName"
              label="Name"
              required
              class="mb-4"
            ></v-text-field>
            <v-textarea
              v-model="newReview"
              label="Leave a review"
              required
              class="mb-4"
            ></v-textarea>
            <v-btn type="submit" color="primary" class="mb-4">Submit</v-btn>
          </v-form>
          <v-list>
            <v-list-item
              v-for="(review, index) in reviews"
              :key="index"
            >
              <v-list-item-content>
                <div v-if="editIndex === index">
                  <v-text-field
                    v-model="editName"
                    label="Name"
                    required
                    class="mb-3"
                  ></v-text-field>
                  <v-textarea
                    v-model="editReviewText"
                    label="Edit Review"
                    required
                    class="mb-3"
                  ></v-textarea>
                  <v-btn color="success" @click="saveReview(index)" class="mr-2">Save</v-btn>
                  <v-btn color="secondary" @click="cancelEdit">Cancel</v-btn>
                </div>
                <div v-else>
                  <v-list-item-title>{{ review.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ review.content }}</v-list-item-subtitle>
                  <v-btn color="warning" small @click="editReview(index)" class="mr-2">Edit</v-btn>
                  <v-btn color="red" small @click="deleteReview(index)">Delete</v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  `,
};
