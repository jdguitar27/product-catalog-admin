<template>
  <v-container>
    <h1>Categories</h1>

    <create-categorie-form/>

    <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right">Options</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(categorie, index) in categories" :key="categorie.id">
          <td>{{ categorie.name }}</td>
          <td class="text-right">
            <v-btn-toggle>
              <v-btn depressed color="success" small>
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn depressed @click.native="deleteCategorie(categorie.id)" color="red" small>
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
  import AdminLayout from "../layouts/AdminLayout";
  import CreateCategorieForm from "../components/categories/CreateCategorieForm";
  import { Categories } from '../firebase/collections';

  export default {
    name: "Categories",
    components: {
      CreateCategorieForm
    },
    data: () => ({
      categories: []
    }),
    created() {
      this.$emit('update:layout', AdminLayout)
      Categories.orderBy('createdAt', 'desc').onSnapshot(snapshot => {;
        this.categories = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
      });
    },
    methods: {
      async deleteCategorie(id) {
        await Categories.doc(id).delete();
        console.log('registro borrado');
      }
    }
  }
</script>

<style scoped>

</style>