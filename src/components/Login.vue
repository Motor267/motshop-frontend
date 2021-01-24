<template>
     <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout  justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="#6A76AB">
                        <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              v-model="usuario.email"
                              prepend-icon="mdi-account"
                              name="login"
                              label="Email"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              v-model="usuario.pass"
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              label="Contraseña"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="#6A76AB" :to = "{name: 'register'}" >Registrarse</v-btn>
                        <v-btn dark color="#6A76AB" @click="login()">Acceder</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

 <script>
 import { mapMutations, mapActions } from "vuex";
import Api from '@/config/Api'
export default {
    
  data() {
    return {
      usuario: {email: 'angel.14.98@hotmail.com', pass: '4321'},
      mensaje: ''
    }
  },
  methods:{
    ...mapMutations(['obtenerUsuario']),
    ...mapActions(['guardarUsuario', 'leerToken', 'cerrarSesion']),
    login(){
       Api().post('/login', this.usuario)
        .then(res => {
          // console.log(res.data.token);
          const token = res.data.token;
          // this.usuarioDB = res.data.usuarioDB
          this.guardarUsuario(token);
          this.$router.push({name: 'home'});  
        })
        .catch(err => {
          console.log(err.response.data.mensaje);
          this.mensaje = err.response.data.mensaje;
        })
    }
  }
}
 </script>