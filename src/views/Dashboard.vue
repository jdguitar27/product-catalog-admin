<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
  import AdminLayout from "../layouts/AdminLayout";

  export default {
    name: "Dashboard",
    created() {
      this.$emit('update:layout', AdminLayout);
    }
  }
</script>

<style scoped>

</style>