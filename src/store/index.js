import Vue from "vue";
import Vuex from "vuex";
//Vuex持久化,刷新
import createVuexAlong from 'vuex-along' //vuex-along

import mutations from "./mutations"
import actions from "./actioins"
import getters from "./getters"


Vue.use(Vuex);

const state = {
    goodList: [],
    sidsArray: [],
    //提交订单的sids
    sids: '',
    //收藏搜索
    searchList: [],
    sumMoney: 0,
    addressObj: {},
    initialList: {},
    aid: '',
    order: '',
    finshList: {},
    dataList: {},
    homeList: [],
    menuList: [],
    img: '',
    bgImg: '',
    replaceList: {},
    shopSids: '',
    isSubmit: '',
    backstage: '',



};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [createVuexAlong()] //vuex-along
});


export default store;