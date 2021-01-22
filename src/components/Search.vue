<template>
  <div>
      <h4>Buscaste: {{search}}</h4>
      <Cards :products="dataSearch" />
  </div>
</template>

<script>
import Cards from './Cards';
import Api from '@/config/Api'

export default {
    components: {
        Cards
    },
    data() {
        return {
            products: [],
            currentPage: '',
            pages: '',
            prevUrl: '',
            nextUrl: '',
            search: '',
            dataSearch: [],
        }
    },
    computed:{
        da(){                
            return this.products
        }
    },
    created() {
         this.checkPage()
        this.getSearch()
    },
    watch: {
        '$route.params.search': function(){
            this.getSearch()
            this.dataSearch = []
            this.checkPage()
        },
    },
    methods: {
        async checkPage() {
             Api().get('/products')
                .then(response => {
                    this.products = response.data.products;
    
                    this.products.filter(p => 
                    {
                        const regex = new RegExp(this.search, 'gi')
                        if(p.name.match(regex)!=null || p.catName.match(regex)!=null){
                            console.log(p);
                            this.dataSearch.push(p)
                        }
                    })
                })
        },
        getSearch(){
            this.search = this.$route.params.search
        },
    }
}
</script>

<style scoped>
    
</style>
