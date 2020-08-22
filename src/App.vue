<template>
  <v-fade-transition appear>
    <component :is="layout">
      <v-fade-transition mode="out-in">
        <router-view :layout.sync="layout"></router-view>
      </v-fade-transition>
    </component>
  </v-fade-transition>
</template>

<script>
  import SimpleLayout from "./layouts/SimpleLayout";
  import AdminLayout from "./layouts/AdminLayout";

  export default {
    name: 'App',
    components: {
      SimpleLayout,
      AdminLayout
    },
    props: {
      source: String,
    },
    data: () => ({
      layout: 'admin-layout'
    }),
    created() {
      this.$vuetify.theme.dark = true
    }
  }
</script>