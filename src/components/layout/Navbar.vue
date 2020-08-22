<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Application</v-toolbar-title>

    <v-spacer/>

    <v-menu
      left
      bottom
      v-if="loggedIn"
      :offset-y="true"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>{{ user.displayName ? user.displayName : user.email }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="logoutUser"
        >
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "Navbar",
    computed: {
      ...mapGetters('auth', ['user', 'loggedIn']),
    },
    methods: {
      ...mapActions(['toggleDrawer']),
      ...mapActions('auth', ['logout']),
      logoutUser() {
        this.logout();
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>