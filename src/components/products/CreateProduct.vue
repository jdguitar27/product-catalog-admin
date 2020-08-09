<template>
  <v-card
    color="grey darken-2"
    dark
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="headline">New Product</v-card-title>
    <v-card-text>
      <v-form
        @submit.prevent="createProduct"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="50"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-textarea
          v-model="description"
          :rules="descriptionRules"
          label="Description"
          rows="2"
          required
        ></v-textarea>

        <v-text-field
          type="number"
          v-model.number="price"
          :rules="priceRules"
          label="Price"
          required
        ></v-text-field>

        <v-text-field
          type="number"
          v-model.number="discount"
          :rules="discountRules"
          label="Discount"
          required
        ></v-text-field>

        <v-select
          v-model="categories"
          :rules="categoriesRules"
          :items="productsCategoriesSelectItems"
          item-text="text"
          item-value="value"
          label="Categories"
          multiple
          chips
        ></v-select>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          type="submit"
        >
          Create
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<script>
  import faker from "faker";
  import {Categories, Products, serverTimestamp} from "../../firebase/collections";

  export default {
    name: "CreateProduct",

    data: () => ({
      loading: false,
      productsCategoriesSelectItems: [],
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required'
      ],
      price: 0,
      priceRules: [
        v => (v && v > 0) || 'Price must be greater than 0'
      ],
      discount: 0,
      discountRules: [
        v => (v >= 0) || 'Discount must be greater or equal than 0'
      ],
      categories: [],
      categoriesRules: [
        v => !!v || 'Categories are required',
        v => (v && v.length > 0) || 'At leat one categorie is required',
      ],
      images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
    }),

    created() {
      this.loadCategories()
    },

    methods: {
      /**
       * Fetch all the categories from firestore and fill the select values.
       */
      async loadCategories() {
        this.loading = true;
        try {
          const categories = await Categories.get();
          this.productsCategoriesSelectItems = categories.docs.map(doc => ({
            text: doc.data().name,
            value: doc.id
          }));
        } catch (e) {
          console.log(e)
        }
        this.loading = false;
      },
      validate() {
        return this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
      async createProduct() {
        this.loading = true;
        try {
          if(this.validate()) {
            await Products.add({
              name: this.name,
              description: this.description,
              price: parseFloat(this.price),
              discount: parseFloat(this.discount),
              categories: this.categories,
              images: this.images,
              createdAt: serverTimestamp()
            })
            this.reset();
          }
        } catch (e) {
          console.log(e)
        }
        this.loading = false;
      }
    },
  }
</script>

<style scoped>

</style>