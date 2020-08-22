<template>
  <v-app id="inspire">
    <slot></slot>
    <v-footer app class="d-flex justify-center transparent">
      <span>&copy; José Durán {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    name: "SimpleLayout"
  }
</script>

<style scoped>

</style>