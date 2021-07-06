import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'assets/css/animate.css'

import 'lib-flexible/flexible'



import {
    Toast,
    Tabbar,
    TabbarItem,
    Search,
    NavBar,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Checkbox,
    CheckboxGroup,
    Button,
    Form,
    Field,
    Area,
    popup,
    Switch,
    Popup,
    Lazyload,
    Swipe,
    SwipeItem,
    Uploader,
    Dialog,
    Overlay,
    ActionSheet,
    AddressList,
    ImagePreview,
    PullRefresh,
    SwipeCell,
    Card,
    Calendar,
    Empty,


} from 'vant';

Vue
    .use(Tabbar)
    .use(TabbarItem)
    .use(Search)
    .use(NavBar)
    .use(Stepper)
    .use(GoodsAction)
    .use(GoodsActionButton)
    .use(GoodsActionIcon)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(Area)
    .use(popup)
    .use(Switch)
    .use(Popup)
    .use(Lazyload, {
        lazyComponent: true,
    })
    .use(Swipe)
    .use(SwipeItem)
    .use(Dialog)
    .use(Uploader)
    .use(Overlay)
    .use(ActionSheet)
    .use(AddressList)
    .use(ImagePreview)
    .use(PullRefresh)
    .use(SwipeCell)
    .use(Card)
    .use(Calendar)
    .use(Empty)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    axios,
    Toast,
    render: h => h(App)
}).$mount('#app')