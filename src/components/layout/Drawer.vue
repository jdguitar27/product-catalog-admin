<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    app
    clipped
  >
    <v-list dense>
      <v-list-item link to="/" exact>
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/products">
        <v-list-item-action>
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Products</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/categories">
        <v-list-item-action>
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-expansion-panels accordion flat tile>
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>
          <v-flex>
            <v-icon>mdi-account-circle</v-icon>
            Item
          </v-flex>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "Drawer",
    data() {
      return {
      };
    },
    computed: {
      // ...mapGetters(['drawer'])
    }
  }
</script>

<style scoped>

</style>