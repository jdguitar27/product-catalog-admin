<template>
  <v-app id="inspire">

    <drawer/>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Drawer from "./components/layout/Drawer";
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    components: {
      Drawer
    },
    props: {
      source: String,
    },
    created() {
      this.$vuetify.theme.dark = true
    },
    methods: {
      ...mapActions(['toggleDrawer']),
    }
  }
</script>