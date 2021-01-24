<template>
  <div id="app">
    <notifications group="operation" position="bottom right" classes="vue-notification"/>
    <Navbar />
      <router-view />
      <v-footer dark
        color="#6A76AB" 
        padless>
      <v-col
        class="text-center"
        cols="12"
      >
        <p>Angel Eduardo Soto García 17130848</p>
        {{ new Date().getFullYear() }} — <strong>Motshop</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Products from './components/Products.vue'
import Navbar from './components/Navbar.vue'
import { mapActions } from "vuex";

export default {
  name: 'app',
  components: {
    Products,
    Navbar
  },
  methods: {
    ...mapActions(['leerToken']),
    async leer(){
      await this.leerToken()
    }
  },
  created(){
     this.leer();
  }
  
}
</script>

<style>
.vue-notification {
  padding: 15px;
  margin: 0 15px 25px;
 
  font-size: 12px;
 
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  
}

</style>