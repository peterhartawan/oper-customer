import * as getter from '../../getters-types'


export default {
    [getter.GET_LIST](state) {
        return state.listCor
    },
    [getter.GET_PAGINATE](state){
        return state.paginate
    },
    [getter.ENTERPRISE](state) {
        return state.enterprise
    },
    [getter.ADMIN_ENTERPRISE](state) {
        return state.adminEnterprise
    },
    [getter.G_ID_CORP](state) {
        return state.dataIdCorp
    },
    [getter.GET_ADMIN_DATA_ENTERPRISE](state){
        return state.dataAdmin
    }
};