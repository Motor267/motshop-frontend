<template>
  <v-container>
    <v-row>
      <div class="col-md-3"></div>
      <div class="col-md-8">
        <img :src="product.image" :alt="product.name"  height="400">
        <h5>{{ product.name }}</h5>
        <p><span class="font-weight-bold">Categoría</span>: {{ product.category }}</p>
        <p class="text-danger font-weight-bold">${{product.price}} MXN</p>
        <p>
          {{ product.description }}
        </p>
        <v-btn color="#0000FF" dark @click="addToCart(product)">Agregar al Carrito</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Api from '@/config/Api'
import mixins from '@/mixins/mixins'

export default {
  props: ['id'],
  mixins: [mixins],
  data(){
    return {
      product: {}
    }
  },
  created() {
       Api().get(`/products/${this.id}`)
              .then(response => {
                this.product = response.data
              });
  },
  methods: {
        checkout(e) {
            e.preventDefault();
            this.$router.push({ name: 'checkout' });
        }
    }
}
</script>

<style>

</style>
