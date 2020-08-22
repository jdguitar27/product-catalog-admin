<template>
  <v-app id="inspire">
    <drawer/>
    <navbar/>

    <v-main>
        <slot></slot>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Drawer from "../components/layout/Drawer";
  import { mapActions } from 'vuex';
  import Navbar from "../components/layout/Navbar";
  export default {
    name: 'AdminLayout',
    components: {
      Drawer,
      Navbar
    },
    props: {
      source: String,
    },
    created() {
      this.$vuetify.theme.dark = true
    }
  }
</script>