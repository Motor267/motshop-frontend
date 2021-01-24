<template>
     <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout  justify-center>
               <v-flex xs12 sm8 md8>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="#6A76AB">
                        <v-toolbar-title><v-icon>mdi-account</v-icon> Perfil de {{user.data.name}}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form
                        >
                            <v-text-field
                            class="form-textfield"
                            v-model="newUser.name"
                            label="Nombre"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            class="form-textfield"
                            v-model="newUser.line1"
                            label="Calle y Número"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            class="form-textfield"
                            v-model="newUser.line2"
                            label="Colonía"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            class="form-textfield"
                            v-model="newUser.city"
                            label="Ciudad"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            class="form-textfield"
                            v-model="newUser.numCard"
                            label="Número de tarjeta"
                            required
                            >
                            </v-text-field>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                    v-model="newUser.expDate"
                                    label="Caducidad (XX/XX)"
                                    required
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    v-model="newUser.codeCard"
                                    label="Codigo de Seguridad"
                                    required
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="#6A76AB" @click="updateUser(newUser)">Guardar</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/Api'
export default {
    data() {
        return {
            newUser: []
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        }
    },
    created(){
        this.newUser = this.user.data
    },
    methods: {
        updateUser(user){
            let modifiedValue = {
                name: user.name,
                email: user.email,
                city: user.city,
                line1: user.line1,
                line2: user.line2,
                numCard: user.numCard?user.numCard:'',
                expDate: user.expDate,
                codeCard: user.codeCard?user.codeCard:'',
            }

            Api().put(`/users/${this.newUser._id}`, modifiedValue)
                .then(res => {
                Vue.notify({
                    group: 'operation',
                    title: 'Se guardaron los cambios, se veran reflejados cuando vuelvas a inciar sesión'
                })
            })
        }
    }
}
</script>