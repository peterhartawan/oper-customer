import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_LIST_COR](state, payload){
        state.listCor               = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
    },
    /*
    * create enterprise to detail enterprise
    * */
    [mutation.SET_ENTERPRISE_RES](state, payload){
        state.enterprise = payload.enterpriseC
        state.adminEnterprise = payload.adminEnter
    },

    [mutation.ID_CORP](state, payload) {
        state.dataIdCorp = payload
    },
    [mutation.SET_DATA_ADMIN_ENTERPRISE](state, payload){
        state.dataAdmin = payload
    }

};