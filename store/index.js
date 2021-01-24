import Vuex from 'vuex'
import Vue from 'vue'


// para decodificar el jwt
import decode from 'jwt-decode'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || [],

        //Login
        token: '',
        userDB: ''
    },
    mutations: {
        setCart: (state, payload) => {
            state.cart.push(payload);
        },
        setQuantity: (state, payload) => {
            let item = state.cart.find(product => {
                return product.id === payload.id
            });
            item.qty = payload.qty;
        },
        setPrice: (state, payload) => {
            let item = state.cart.find(product => {
                return product.id === payload.id
            });
            item.subtotal = payload.subtotal;
        },

        //Login
        obtenerUsuario(state, payload) {
            state.token = payload;
            if (payload === '') {
                state.userDB = ''
            } else {
                state.userDB = decode(payload);
            }
        }



    },
    actions: {
        //Login
        guardarUsuario({ commit }, payload) {
            localStorage.setItem('token', payload);
            commit('obtenerUsuario', payload)
        },
        cerrarSesion({ commit }) {
            commit('obtenerUsuario', '');
            localStorage.removeItem('token');
        },
        leerToken({ commit }) {

            const token = localStorage.getItem('token');
            if (token) {
                commit('obtenerUsuario', token);
            } else {
                commit('obtenerUsuario', '');
            }

        }
    },
    getters: {
        getCart: state => state.cart,
        estaActivo: state => !!state.token,
        getUser: state => state.userDB,
    }
});