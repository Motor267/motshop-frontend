<template>
 <v-app-bar
        color="#6A76AB"
        dark
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
        <v-toolbar-title class="text-center">
            <h1 class="font-weight-bold">
            <v-icon size="50">mdi-cart</v-icon>Motshop 
            </h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- SEARCH BAR -->
        <v-text-field
        style="margin-top:28px;"
        v-model="search"
        label="Buscar aquí"
        solo
        >
        </v-text-field>
        <v-btn
        height="47"
        :to = "{name: 'search', params: {search}}"
        >
        <v-icon>
            mdi-magnify
        </v-icon>
        </v-btn>
        <!-- /SEARCH BAR -->
        <v-spacer></v-spacer>
        <v-badge
            class="mx-2"
            color="#FF0000"
            :content="cart.length"
        >
            <v-btn icon small :to = "{name: 'checkout'}">
                <v-icon>mdi-cart</v-icon>
            </v-btn>
        </v-badge>

        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab 
            :to = "{name: 'home'}"
            >
                Home
            </v-tab>
            <v-tab 
            v-for="cat in categories" 
            :key="cat._id"
            :to = "{name: 'category', params: {category: cat.title}}">
                {{cat.name}}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
</template>

<script>
import Api from '@/config/Api'
export default {
    data() {
        return {
            search: '',
            categories: []
        }
    },
    created() {
        Api().get('/categories')
            .then(response => {
                this.categories = response.data;
            });
            
    }, 
    computed: {
        cart() {
            return this.$store.getters.getCart
        }
    }
}
</script>

<style>

</style>
