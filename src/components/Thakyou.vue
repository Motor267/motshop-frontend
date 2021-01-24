<template>
  <div class="text-center">
      <br>
      <h3>Gracias por tu compra! recibirás el producto en las proximas 72 hrs</h3>
      <br>
      <router-link tag="a" :to="{name: 'home'}" class="btn btn-outline-primary">Regresar al sitio</router-link>
      <hr>
  </div>
</template>

<script>
export default {
    computed: {
        email() {
            return this.$store.getters.getCharge.email;
        }
    }
}
</script>

<style>

</style>
