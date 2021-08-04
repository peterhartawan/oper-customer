import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_PICTASK_LIST](state, payload){
        state.listCor               = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
    },
    [mutation.SET_ID_ENTERPRISE](state, payload) {
        state.identerprise          = payload
    },
    [mutation.SET_ID_INSPECTOR](state, payload) {
        state.idinspector           = payload
    }
    // /*
    // * create enterprise to detail enterprise
    // * */
    // [mutation.SET_ENTERPRISE_RES](state, payload){
    //     state.enterprise = payload.enterpriseC
    //     state.adminEnterprise = payload.adminEnter
    // },
    //
    // [mutation.ID_CORP](state, payload) {
    //     state.dataIdCorp = payload
    // }

};