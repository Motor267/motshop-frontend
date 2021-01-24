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
        @click="searchProduct()"
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
        <v-btn v-if="!activo" icon small :to = "{name: 'login'}">
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn v-if="activo" icon small :to = "{name: 'profile'}">
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
        <v-btn v-if="activo" icon small @click="logout()">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
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
import { mapActions } from "vuex";
export default {
    data() {
        return {
            search: '',
            categories: [],
        }
    },
    created() {
        Api().get('/categories')
            .then(response => {
                this.categories = response.data;
            });
            
    }, 
    computed: {
        activo() {
            return this.$store.getters.estaActivo
        },
        cart() {
            return this.$store.getters.getCart
        }
    },
    methods: {
        ...mapActions(['cerrarSesion']),
        logout(){
            this.cerrarSesion()
            this.$router.push({ name: 'home' });
        },
        searchProduct(){
            let search = this.search
            this.$router.push({ name: 'search', params: {search} });
        }
    }
}
</script>

<style>

</style>
