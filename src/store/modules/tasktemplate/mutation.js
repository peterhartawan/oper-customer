import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_TEMPLATE_LIST](state, payload){
        state.listCor               = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
    },
    [mutation.SET_TEMPLATE_ID](state, payload){
        state.template          = payload
    },
    [mutation.SET_TEMPLATE_REPORT](state, payload){
        state.templateReport          = payload
    },
    [mutation.SET_DIALOG_VISIBLE](state, payload){
        state.dialogVisible     = payload
    },
    [mutation.SET_POSITION_TEMPLATE](state, payload){
        state.positionTemplate     = payload
    }


};