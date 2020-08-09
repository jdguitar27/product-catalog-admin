<template>
  <v-container
    fluid
  >
    <h1>Products</h1>

    <create-product/>

    <v-select
      :items="categories"
      v-model="selectedCategorie"
      label="Select product categorie"
    ></v-select>

    <v-btn color="success" @click="createRandomProduct">
      Create random Product
    </v-btn>

    <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">description</th>
          <th class="text-left">Price</th>
          <th class="text-left">Discount</th>
          <th class="text-right">Options</th>
        </tr>
        </thead>
        <v-scroll-x-transition group leave-absolute tag="tbody">
          <tr v-for="(product, index) in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}$</td>
            <td>{{ product.discount }}%</td>
            <td class="text-right">
              <v-btn-toggle>
                <v-btn depressed color="success" small>
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn depressed @click.native="deleteProduct(product.id)" color="red" small>
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </v-btn-toggle>
            </td>
          </tr>
        </v-scroll-x-transition>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  import {Products, Categories} from '../firebase/collections';
  import faker from 'faker';
  import CreateProduct from "../components/products/CreateProduct";

  export default {
    name: "Products",
    components: {
      CreateProduct
    },
    data: () => ({
      products: [],
      categories: [],
      selectedCategorie: ''
    }),
    created() {
      this.loadCategories();

      /**
       * Fetch all products from firestore and keep observing for changes.
       */
      Products.orderBy('name', 'asc').onSnapshot(snapshot => {
        this.products = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
      });
    },
    methods: {
      /**
       * Fetch all the categories from firestore and fill the select values.
       */
      async loadCategories() {
        this.loading = true;
        try {
          const categories = await Categories.get();
          this.categories = categories.docs.map(doc => ({
            text: doc.data().name,
            value: doc.id
          }));
        } catch (e) {
          console.log(e)
        }
        this.loading = false;
      },

      /**
       * Create a random product using faker and store it in firestore.
       */
      async createRandomProduct() {
        this.loading = true;
        try {
          if (this.selectedCategorie != '') {
            const res = await Products.add({
              name: faker.commerce.productName(),
              description: faker.commerce.productAdjective(),
              price: parseFloat(faker.commerce.price()),
              discount: parseFloat(faker.commerce.price(0, 30)),
              categories: [this.selectedCategorie],
              images: [faker.image.abstract(), faker.image.abstract()],
            });
          }
        } catch (e) {
          console.log(e)
        }
        this.loading = false;
      },

      /**
       * Delete a product from firestore using it unique identifier.
       * @param id Unique document identifier
       * @returns {Promise<void>}
       */
      async deleteProduct(id) {
        await Products.doc(id).delete();
      }
    }
  }
</script>

<style scoped>

</style>