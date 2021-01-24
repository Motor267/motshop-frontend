import VueRouter from 'vue-router';
import Products from '@/components/Products'
import Product from '@/components/Product'
import Category from '@/components/Category'
import Checkout from '@/components/Checkout'
import Thakyou from '@/components/Thakyou'
import Search from '@/components/Search'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Register from '@/components/Register'
const routes = [{
        path: '/',
        name: 'home',
        component: Products
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product,
        props: true
    },
    {
        path: '/category/:category',
        name: 'category',
        component: Category,
        props: true
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
    },
    {
        path: '/thankyou',
        name: 'thankyou',
        component: Thakyou,
    },
    {
        path: '/search/:search',
        name: 'search',
        component: Search,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
    }, ,
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;