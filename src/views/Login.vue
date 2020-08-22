<template>
  <v-container fluid class="fill-height">
    <v-card style="width: 100%">
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="handleSubmit"
        >

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="primary"
            block
            class="mr-4"
            type="submit"
            @click="validate"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import SimpleLayout from "../layouts/SimpleLayout";
  import {mapActions} from 'vuex';

  export default {
    name: "Login",
    data: () => ({
      loading: false,
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    created() {
      this.$emit('update:layout', SimpleLayout);
    },
    methods: {
      ...mapActions('auth', ['login']),
      async handleSubmit() {
        this.loading = true;
        try {
          if (this.validate()) {
            await this.login({
              email: this.email,
              password: this.password
            })

            this.reset();
            await this.$router.push('/');
          }
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
    }
  }
</script>

<style scoped>

</style>