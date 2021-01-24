<template>
     <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout  justify-center>
               <v-flex xs12 sm8 md8>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="#6A76AB">
                        <v-toolbar-title>Registrarse </v-toolbar-title>
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
                            v-model="newUser.email"
                            label="Email"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            type="password"
                            class="form-textfield"
                            v-model="newUser.pass"
                            label="Contraseña"
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
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="#6A76AB" @click="register()">Registrar</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import Api from '@/config/Api'

export default {
    data() {
        return {
            newUser: {}
        }
    },
     methods: {
         register(){
             console.log(this.newUser)
             Api().post(`/users/new-user`, this.newUser)
                .then(res => {
                this.$router.push({name: 'login'});
            })
         }
     }
}
</script>