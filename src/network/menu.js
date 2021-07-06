import { request } from "./requset";

//  商品类型接口
export const getMenu = () => {
        return request({
            url: '/type',
        })
    }
    // 根据商品类型获取商品接口
export const getMenuType = (keys, values) => {
        return request({
            url: "/typeProducts",
            params: {
                key: keys,
                value: values,
            }
        })
    }
    //查看商品详情接口
export const getGoods = (pid) => {
        return request({
            url: '/productDetail',
            params: {
                pid: pid,
            }
        })
    }
    // 收藏商品接口
export const getLike = (pid) => {
        return request({
            url: '/like',
            method: "post",
            params: {
                pid: pid,
            }
        })
    }
    // 根据商品pid查询收藏商品接口
export const getFindLike = (pid) => {
        return request({
            url: '/findlike',
            params: {
                pid: pid,
            }
        })
    }
    //  登录接口
export const getLogin = (info) => {
        return request({
            url: '/login',
            method: "post",
            params: {
                data: info
            }
        })
    }
    //  注册接口
export const getRegister = (info) => {
        return request({
            url: '/register',
            method: "post",
            params: {
                data: info
            }
        })
    }
    //修改密码接口
export const getPassword = (info) => {
        return request({
            url: '/updatePassword',
            method: "post",
            params: {
                data: info,
            }
        })
    }
    //  验证码验证接口
export const getEmail = (info) => {
        return request({
            url: '/emailValidCode',
            method: "post",
            params: {
                data: info
            }
        })
    }
    //  查询用户所有收藏商品接口
export const getFindAllLike = () => {
        return request({
            url: "/findAllLike",
        })
    }
    // 取消(删除)收藏商品接口
export const getNotlike = (info) => {
    return request({
        url: "/notlike",
        method: "post",
        params: {
            data: info
        }
    })
}
export const getAddShopcart = (info) => {
        return request({
            url: "/addShopcart",
            method: "post",
            params: {
                data: info
            }

        })

    }
    //查询购物车商品总数量接口
export const getShopcartCount = () => {
        return request({
            url: "/shopcartCount",
        })
    }
    //获取购物车商品条目 (不是商品总数量)
export const getShopcartRows = () => {
        return request({
            url: "/shopcartRows",
        })
    }
    //查询用户所有购物车数据接口
export const getFindAllShopcart = () => {
        return request({
            url: "/findAllShopcart",
        })
    }
    // 修改购物车商品数量接口
export const getModifyShopcartCount = (info) => {
        return request({
            url: "/modifyShopcartCount",
            method: 'post',
            params: {
                data: info
            }
            // sid: 购物车唯一标识,
            // count: 商品数量
        })
    }
    //删除 一个或者多个 购物车商品接口
export const getRemoveShopcart = (info) => {
        return request({
            url: "/removeShopcart",
            method: 'post',
            params: {
                data: info
            }
            // sids: sid购物车唯一标识集合字符串
            // 其中 sids 值为 JSON.stringify([sid1, sid2, sid3])
        })
    }
    //删除 一个或者多个 购物车商品接口 该接口为：物理删除(真删除，数据不在数据库中)
export const getDeleteShopcart = (info) => {
        return request({
            url: "/deleteShopcart",
            method: 'post',
            params: {
                data: info
            }
            // sids: sid购物车唯一标识集合字符串
            // 其中 sids 值为 JSON.stringify([sid1, sid2, sid3])
        })
    }
    //  新增地址接口
export const getAddAddress = (info) => {
        return request({
            url: "/addAddress",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //查询地址接口
export const getFindAddress = (info) => {
        return request({
            url: "/findAddress",
        })
    }
    //编辑地址接口
export const getEditAddress = (info) => {
        return request({
            url: "/editAddress",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //  删除地址接口
export const getDeleteAddress = (info) => {
        return request({
            url: "/deleteAddress",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //根据地址aid查询地址接口
export const getFindAddressByAid = (aids) => {
    return request({
        url: "/findAddressByAid",
        params: {
            aid: aids,
        }
    })
}


//提交订单页面查询需要购买商品接口
export const getCommitShopcart = (sid) => {
        return request({
            url: "/commitShopcart",
            params: {
                sids: sid,
            }
        })
    }
    //立即结算接口
export const getPay = (info) => {
        return request({
            url: "/pay",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //  查询订单接口
export const getFindOrder = (state) => {
    return request({
        url: "/findOrder",
        params: {
            status: state
        }

    })
}

//  确认收货接口
export const getReceive = (info) => {
        return request({
            url: "/receive",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    // 删除订单接口
export const getRemoveOrder = (info) => {
        return request({
            url: "/removeOrder",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //个人资料接口
export const getFindAccountInfo = () => {
        return request({
            url: "/findAccountInfo"
        })
    }
    //修改昵称接口
export const getUpdateNickName = (info) => {
        return request({
            url: "/updateNickName",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //  修改简介接口
export const getUpdateDesc = (info) => {
        return request({
            url: "/updateDesc",
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //我的接口
export const getFindMy = () => {
    return request({
        url: "/findMy"
    })
}



//banner接口
export const getBanner = () => {
        return request({
            url: "/banner"
        })
    }
    //商品类型接口
export const getType = () => {
        return request({
            url: "/type"
        })
    }
    //  搜索商品接口
export const getSearch = () => {
        return request({
            url: "/search"
        })
    }
    //  上传头像接口
export const getUpdateAvatar = (info) => {
        return request({
            url: '/updateAvatar',
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //上传用户背景接口
export const getUpdateUserBg = (info) => {
        return request({
            url: '/updateUserBg',
            method: 'post',
            params: {
                data: info
            }

        })
    }
    //  修改密码接口
export const getUpdatePassword = (info) => {
    return request({
        url: '/updatePassword',
        method: 'post',
        params: {
            data: info
        }

    })
}

// 退出登录接口
export const getLogout = (info) => {
        return request({
            url: '/logout',
            method: 'post',


        })
    }
    //  注销账号接口
export const getDestroyAccount = (info) => {
        return request({
            url: '/destroyAccount',
            method: 'post',


        })
    }
    //    找回密码接口
export const getRetrievePassword = (info) => {
    return request({
        url: '/retrievePassword',
        method: 'post',
        params: {
            data: info
        }


    })
}