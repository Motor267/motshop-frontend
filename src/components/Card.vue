<template>
    <v-card
    max-width="344"
    >
        <router-link tag="a" :to="{name: 'product', params: {id: product._id}}">
            <!-- <img class="card-img-top" :src="product.image" :alt="product.name" height="300"> -->
            <v-img class="card-img-top" style="max-height: 250px;"  :src="product.image"></v-img>
        </router-link>
        <div class="mx-2">
            <h5 class="card-title text-info">{{ product.name }}</h5>
            <p><span class="font-weight-bold">Categoría</span>: {{ product.catName }}</p>
            <p class="card-text">{{ product.description.substring(0, 50) }}</p>
            <p class="card-text text-danger">${{ product.price }} MXN</p>
            
            <v-card-actions>
                <v-btn
                    dark
                    color="#00FF00"
                    :to="{ name: 'product', params: { id: product._id }}"
                    >
                    Ver
                </v-btn>
                <v-btn
                    style="float: right;"
                    class="mx-2"
                    dark
                    color="#0000FF"
                    @click="addToCart(product)"
                >
                    <v-icon>
                        mdi-cart
                    </v-icon>
                </v-btn>   
            </v-card-actions> 
        </div>
    </v-card>
</template>

<script>
import mixins from '@/mixins/mixins';
export default {
    props: ['product'],
    mixins: [mixins]
}
</script>

<style scoped>
.card-title {
        cursor: pointer;
    }
</style>
