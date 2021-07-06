import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Main'),
        children: [{
                path: 'shop',
                name: 'Shop',
                component: () =>
                    import ("../views/shop/Shop")
            },
            {
                path: 'menu',
                name: 'Menu',
                component: () =>
                    import ("../views/menu/Menu")
            },
            {
                path: 'home',
                alias: '',
                name: 'Home',
                component: () =>
                    import ("../views/home/Home")
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () =>
                    import ("../views/profile/Profile"),


            }
        ],



    },
    {
        path: '/detail/:pid',
        name: 'Detail',
        component: () =>
            import ('../views/other/detail/Detail'),
    },
    {
        path: '/sign',
        name: 'Sign',
        component: () =>
            import ('../views/other/sign/Sign'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/other/register/Register'),
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () =>
            import ('../views/other/forget/Forget'),
    },
    {
        path: '/findPassowrd',
        name: 'FindPassowrd',
        component: () =>
            import ('../views/other/findPassword/FindPassowrd'),
    },
    // {
    //     path: '/collection',
    //     name: 'Collection',
    //     component: () =>
    //         import ('../views/profile/profileChild/Collection'),
    // },
    {
        path: '/personalData',
        name: 'PersonalData',
        component: () =>
            import ('../views/profile/profileChild/PersonalData'),
    },
    {
        path: '/myOrder',
        name: 'MyOrder',
        component: () =>
            import ('../views/profile/profileChild/MyOrder'),
    },
    {
        path: '/collection',
        name: 'Collection',
        component: () =>
            import ('../views/profile/profileChild/Collection'),

    },
    {
        path: '/addressManagement',
        name: 'AddressManagement',
        component: () =>
            import ('../views/profile/profileChild/AddressManagement'),
    },
    {
        path: "/collectionAll",
        name: "CollectionAll",
        component: () =>
            import ("../views/profile/profileChild/collectionChild/CollectionAll")
    },
    {
        path: "/collectionSearch",
        name: "CollectionSearch",
        component: () =>
            import ("../views/profile/profileChild/collectionChild/CollectionSearch")
    },
    {
        path: "/shopSettlement",
        name: "ShopSettlement",
        component: () =>
            import ("../views/shop/shopChild/ShopSettlement"),
    },
    {
        path: "/address",
        name: "Address",
        component: () =>
            import ("../views/profile/profileChild/AddressManagementChiled/Address")
    },
    {
        path: "/addressChange/:aid",
        name: "AddressChange",

        component: () =>
            import ("../views/profile/profileChild/AddressManagementChiled/AddressChange"),
        meta: { keepAlive: false },

    },

    {
        path: "/shopOrder",
        name: "ShopOrder",
        component: () =>
            import ("../views/shop/shopChild/ShopOrder")
    },
    {
        path: "/securityCenter",
        name: "securityCenter",
        component: () =>
            import ("../views/profile/profileChild/SecurityCenter")
    },



]


const router = new VueRouter({
    routes,
})

export default router


//避免了对当前位置的冗余导航
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}