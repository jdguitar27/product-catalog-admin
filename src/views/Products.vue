<template>
  <v-container
    fluid
  >
    <h1>products</h1>
    <v-select
      :items="categories"
      v-model="selectedCategorie"
      label="Standard"
    ></v-select>
    <v-btn @click="createRandomProduct">
      Create random Product
    </v-btn>
<!--    <create-product-form/>-->

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
        <tbody>
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
              <v-btn depressed @click.native="deleteproduct(product.id)" color="red" small>
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-btn-toggle>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  import {Products, Categories} from '../firebase/collections';
  import faker from 'faker';

  export default {
    name: "Products",
    data: () => ({
      products: [],
      categories: [],
      selectedCategorie: ''
    }),
    created() {
      this.loadCategories();
      Products.orderBy('name', 'desc').onSnapshot(snapshot => {
        this.products = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
      });
    },
    methods: {
      async loadCategories() {
        const categories =  await Categories.get();
        this.categories = categories.docs.map(doc => ({
          text: doc.data().name,
          value: doc.id
        }));
      },
      async createRandomProduct() {
        this.loading = true;
        try {
          if(this.selectedCategorie != '') {
            const res = await Products.add({
              name: faker.commerce.productName(),
              description: faker.commerce.productAdjective(),
              price: faker.commerce.price(),
              discount: faker.commerce.price(0,100),
              categories: [this.selectedCategorie],
              images: [faker.image.abstract(), faker.image.abstract()],
            });
          }
        } catch (e) {
          console.log(e)
        }
        this.loading = false;
      },
      async deleteproduct(id) {
        await Products.doc(id).delete();
        console.log('registro borrado');
      }
    }
  }
</script>

<style scoped>

</style>