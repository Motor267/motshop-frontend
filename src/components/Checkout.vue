<template>
<v-app id="inspire">
  <v-container>
      <v-row>
          <div class="col-md-12">
              <div v-if="cart.length==0">
                  <h3 class="text-center text-danger">Tu carrito esta vacío !</h3>
              </div>
              <div v-else>
                  <v-data-table
                  :headers="headers"
                  :items="cart"
                  hide-default-footer
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn
                        class="mx-1"
                        icon
                        color="#0000FF"
                        @click="action('min',item)"
                        >
                            <v-icon dark>
                            mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn
                            
                            icon
                            color="#FF0000"
                            @click="action('clear',item)"
                        >
                            <v-icon dark>
                            mdi-delete
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-1"
                            icon
                            color="#0000FF"
                            @click="action('add',item)"
                        >
                            <v-icon dark>
                            mdi-plus
                            </v-icon>
                        </v-btn>
                    </template> 
                  </v-data-table>
                  <hr>
                <h4>Total: ${{ total }} MXN</h4> 
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="#FF0000"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        Comprar
                    </v-btn>
                    </template>
            
                    <v-card>
                        <v-card-title>
                            Confirmar compra con tus datos
                        </v-card-title>
                
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-form
                                        class="form-container"
                                        ref="addForm"
                                        v-model="addValidation"
                                        lazy-validation
                                    >
                                        <v-text-field
                                        class="form-textfield"
                                        v-model="order.name"
                                        label="Nombre"
                                        required
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        class="form-textfield"
                                        v-model="order.line1"
                                        label="Calle y Número"
                                        required
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        class="form-textfield"
                                        v-model="order.line2"
                                        label="Colonía"
                                        required
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        class="form-textfield"
                                        v-model="order.city"
                                        label="Ciudad"
                                        required
                                        >
                                        </v-text-field>
                                        <v-text-field
                                        class="form-textfield"
                                        v-model="order.numCard"
                                        label="Número de tarjeta"
                                        required
                                        >
                                        </v-text-field>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                v-model="order.expDate"
                                                label="Caducidad (XX/XX)"
                                                required
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                v-model="order.codeCard"
                                                label="Codigo de Seguridad"
                                                required
                                                >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                                <v-btn
                                
                                color="FFFFFF"
                                @click="dialog=false"
                                >
                                    Cancelar
                                </v-btn>

                                <v-btn
                                color="FFFFFF"
                                @click="createOrder(order)"
                                >
                                    Pagar
                                </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
              </div>
          </div>
      </v-row>
  </v-container>
</v-app>
</template>

<script>
import Api from '@/config/Api'

export default {
    data:() => ({
        dialog: false,
        addValidation: false,
        order: {
            name: '',
            line1: '',
            line2: '',
            city: '',
            numCard: '',
            expDate: '',
            codeCard: '',
            productsId: []
        },
        headers: [
            { text: 'Producto', value: 'name' },
            { text: 'Precio', value: 'price' },
            { text: 'Cantidad', value: 'qty' },
            { text: 'Subtotal', value: 'subtotal' },
            { text: 'Acciones', value: 'actions' },
        ]
    }),
    created(){
        if(this.activo){
            this.order = this.user.data
        }
    },
    computed: {
         activo() {
             return this.$store.getters.estaActivo
         },
         cart() {
             return this.$store.getters.getCart
         },
         user() {
             return this.$store.getters.getUser
         },
         total() {
             let som = this.cart.length;
              this.cart.map(item => {
                 som += item.subtotal
             });
             return som;
         }
    },
    methods: {
        createOrder(order){
            let modifiedValue = {
                name: order.name,
                email: order.email,
                city: order.city,
                line1: order.line1,
                line2: order.line2,
                numCard: order.numCard?order.numCard:'',
                expDate: order.expDate,
                productsId: [],
            }
            let cart = JSON.parse(localStorage.getItem('cart'))
            for(let i=0; i<cart.length; i++){
                modifiedValue.productsId.push(cart[i].id)
            }
            Api().post('/orders', modifiedValue)
              .then(response => {
                this.$router.push({name: 'thankyou'});
                localStorage.removeItem('cart')
                this.$store.state.cart = [];
            });
        
        },
        action(event, item) {
            switch (event) {
                case 'add':
                    item.qty++;
                    item.subtotal = item.price*item.qty;
                    this.$store.commit('setQuantity', item);
                    this.$store.commit('setPrice', item);
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    break;
                case 'min':
                    item.qty--;
                    item.subtotal = item.price*item.qty;
                    this.$store.commit('setQuantity', item);
                    this.$store.commit('setPrice', item);
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    if(item.qty === 0) this.clearFromCart(item)
                    break;
                case 'clear':
                    this.clearFromCart(item)
                    break;
                default:
                    break;
            }
        },
        clearFromCart(product) {
            let item = this.cart.find(item => {
                return item.id === product.id
            });
            let index = this.cart.indexOf(item);
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
}
</script>

<style>
.form-container{
    width: 100%;
}
.form-textfield{
    min-width: 200px;
    max-width: 100%;
    width: 80%;
}
</style>
