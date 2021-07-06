import {
    ADD_GOODS,
    ADD_TO_GOOD,
    DEL_GOODS,
    SEARCH_GOODS,
    CHANGEADDRESS,
    INITIAL,
    GETAID,
    FINSHLIST,
    MODIFY,
    DATA,
    INTRODUCTION,
    HOMESEARCH,
    MENUSEARCH,
    IMG,
    BGIMG,
    REPLACEADDRESS,
    SPLICE,
    BUYNOW,
    SHOPSIDS,
} from "./mutions-type"

export default {
    //mutations唯一性的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的事情比较单一一点
    //收藏品的count数量
    [ADD_GOODS](state, payload) {
        payload.count++
    },
    //添加收藏品
    [ADD_TO_GOOD](state, payload) {
        payload.checked = false
        state.goodList.push(payload)
    },
    //删除收藏品
    [DEL_GOODS](state, payload) {
        state.goodList.splice(payload, 1);

    },
    //搜索收藏商品
    [SEARCH_GOODS](state, payload) {
        if (payload === "") {
            state.searchList = [];
        } else {
            state.searchList.push(payload)
        }
    },
    [SPLICE](state, payload) {
        state.searchList.splice(payload, 1)
    },
    //地址
    [CHANGEADDRESS](state, payload) {
        state.addressObj = {}
        state.addressObj = payload;
    },
    //
    [INITIAL](state, payload) {
        state.initialList = payload.result;
        state.sids = payload.sids;
    },
    //地址的aid
    [GETAID](state, payload) {
        state.aid = payload;
    },

    [FINSHLIST](state, payload) {
        state.finshList = payload
    },
    [MODIFY](state, payload) {
        state.finshList.splice(payload.i, 1);
    },
    [DATA](state, payload) {
        state.dataList = payload
    },
    [INTRODUCTION](state, payload) {
        state.introduction = payload;
    },
    [HOMESEARCH](state, payload) {
        if (payload === "") {
            state.homeList = [];
        } else {
            state.homeList.push(payload)
        }
    },
    [MENUSEARCH](state, payload) {
        if (payload === "") {
            state.menuList = [];
        } else {
            state.menuList.push(payload)
        }
    },
    //保存上传头像的图片
    [IMG](state, payload) {
        state.img = payload;
    },
    [BGIMG](state, payload) {
        state.bgImg = payload
    },
    [REPLACEADDRESS](state, payload) {
        state.replaceList = payload
    },
    [BUYNOW](state, payload) {
        state.initialList = payload
    },
    [SHOPSIDS](state, payload) {
        state.shopSids = JSON.stringify([payload])
    },
    submit(state, payload) {
        state.isSubmit = payload
    },
    isbackstage(state, payload) {
        state.backstage = payload
    },



}