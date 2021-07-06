import {
    ADD_GOODS,
    ADD_TO_GOOD,


} from "./mutions-type"
export default {
    addGoods(context, payload) {
        return new Promise((resolve, reject) => {
            //查找之前的数组是否有该商品
            let oldProduct = context.state.goodList.find(item => item.pid === payload.pid)
                //判断oldProduct
            if (oldProduct) {
                context.commit(ADD_GOODS, oldProduct)
                resolve("当前商品数量+1")
            } else {
                payload.count = 1;
                context.commit(ADD_TO_GOOD, payload)
                resolve("成功添加了新商品")
            }

        })
    },
    // addShopGoods(context, payload) {
    //     return new Promise((resolve, reject) => {
    //         //查找之前的数组是否有该商品
    //         let oldProduct = context.state.searchList.find(item => item.pid === payload.pid)
    //             //判断oldProduct
    //         if (oldProduct) {
    //             context.commit(SHOP_GOODS, oldProduct)
    //             resolve("当前商品数量+1")
    //         } else {
    //             payload.count = 1;
    //             context.commit(SHOP_TO_GOOD, payload)
    //             resolve("成功添加了新商品")
    //         }

    //     })
    // },

}