import * as getter from '../../getters-types'


export default {
    [getter.GET_PICTASK_LIST](state) {
        return state.listCor
    },
    [getter.GET_PICTASK_PAGINATE](state){
        return state.paginate
    },
    [getter.GET_ID_ENTERPRISE](state){
        return state.identerprise
    },
    [getter.GET_ID_INSPECTOR](state) {
        return state.idinspector
    },
    // [getter.ADMIN_ENTERPRISE](state) {
    //     return state.adminEnterprise
    // },
    // [getter.G_ID_CORP](state) {
    //     return state.dataIdCorp
    // }
};