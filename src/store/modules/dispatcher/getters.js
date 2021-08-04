import * as getter from '../../getters-types'


export default {
    [getter.GET_LIST_DISPATCHER](state) {
        return state.listCor
    },
    [getter.GET_PAGINATE_DISPATCHER](state){
        return state.paginate
    },
    [getter.DISPATCHER](state) {
        return state.enterprise
    },
    [getter.GET_TOTAL_ACCOUNT_DISPAT](state) {
        return state.totalAccount
    },
    [getter.ID_DISPATCHER](state) {
        return state.iddispatcher
    },
    [getter.GET_DISPATCHER_AVAILABLE](state){
        return state.dispatcherAvail
    }
};