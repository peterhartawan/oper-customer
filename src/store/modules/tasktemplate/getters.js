import * as getter from '../../getters-types'


export default {
    [getter.GET_TEMPLATE_LIST](state) {
        return state.listCor
    },
    [getter.GET_TEMPLATE_PAGINATE](state){
        return state.paginate
    },
    [getter.GET_TEMPLATE_ID](state){
        return state.template
    },
    [getter.GET_TEMPLATE_REPORT](state){
        return state.templateReport
    },
    [getter.GET_DIALOG_VISIBLE](state) {
        return state.dialogVisible
    },
    [getter.GET_POSITION_TEMPLATE](state) {
        return state.positionTemplate
    },
    // [getter.G_ID_CORP](state) {
    //     return state.dataIdCorp
    // }
};