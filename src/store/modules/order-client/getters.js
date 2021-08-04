import * as getter from '../../getters-types'


export default {
    [getter.GET_L_ORDER_CLIENT](state) {
        return state.listCor
    },
    [getter.GET_PAG_ORDER_CLIENT](state){
        return state.paginate
    },
    [getter.GET_ORDER_DETAIL](state) {
        return state.order
    },
    [getter.GET_PATH](state) {
        return state.path
    },
    [getter.GET_ID_ORDER](state) {
        return state.idorder
    },
    [getter.GET_ORDER_BAR_GRAPHIC](state) {
        return state.orderGraphic
    },
    [getter.GET_ORDER_BAR](state){
        return state.orderBar
    },
    [getter.GET_ROLE_PATH_ORDER](state){
        return state.rolePath
    }
};