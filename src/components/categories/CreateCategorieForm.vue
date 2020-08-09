<template>
  <v-form
    @submit.prevent="createCategorie"
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
  >
    <v-text-field
      v-model="name"
      :counter="15"
      :rules="nameRules"
      label="Categorie name"
      :disabled="loading"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid || loading"
      color="success"
      type="submit"
      :loading="loading"
    >
      Create
    </v-btn>

<!--    <v-btn-->
<!--      color="error"-->
<!--      class="mr-4"-->
<!--      @click="reset"-->
<!--    >-->
<!--      Reset Form-->
<!--    </v-btn>-->

<!--    <v-btn-->
<!--      color="warning"-->
<!--      @click="resetValidation"-->
<!--    >-->
<!--      Reset Validation-->
<!--    </v-btn>-->
  </v-form>
</template>

<script>
  import faker from 'faker';
  import firebase from 'firebase';
  import { Categories } from '../../firebase/collections';


  export default {
    name: "CreateCategorieForm",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'El nombre de la categoría es requerido',
        v => (v && v.length <= 15) || 'El nombre debe contener menos de 15 caracteres',
      ],
      lazy: false,
      loading: false
    }),
    created() {
      this.name = faker.commerce.department();
    },
    methods: {
      validate() {
        this.$refs.form.validate()
      },
      reset() {
        this.$refs.form.reset()
        this.name = faker.commerce.department();
      },
      resetValidation() {
        this.$refs.form.resetValidation()
      },
      async createCategorie() {
        this.loading = true;
        try {
          this.$refs.form.validate()
          if(this.valid) {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            const res = await Categories.add({
              name: this.name,
              createdAt: serverTimestamp()
            });

            this.reset()
          }
        } catch (e) {
          console.log(e);
        }
        this.loading = false;
      }
    },
  }
</script>

<style scoped>

</style>