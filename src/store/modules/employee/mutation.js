import * as mutation from '../../mutation-types'

export default {
    
    [mutation.SET_EMPLOYEE_LIST](state, payload) {
        state.employee              = payload.dataList
        state.total                 = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_POSITION_LIST](state, payload) {
        state.position                      = payload.dataList
        state.TotalPosition                 = payload.total
        state.PaginatePosition.nextClick    = payload.nextC
        state.PaginatePosition.prevClick    = payload.prevC
        state.PaginatePosition.firstPage    = payload.firstP
        state.PaginatePosition.fromP        = payload.fromPA
    },
    [mutation.SET_EMPLOYEE_DETAIL](state, payload){
        state.detailEmployee  = payload.data
    },
    [mutation.SET_DROPDOWN_POSITION](state, payload) {
        state.dropdownPosition              = payload.dataList
    },
    [mutation.SET_DROPDOWN_EMPLOYEE](state, payload) {
        state.dropdownEmployee              = payload.dataList
    },
    [mutation.SET_DETAIL_POSITION](state, payload){
        state.detailPosition  = payload.data
    },
    [mutation.SET_ACCOUNT_EMPLOYEE](state, payload){
        state.totalEmployee = payload
    },
    [mutation.SET_ROLE_TAB_EMPLOYEE](state, payload){
        state.roleTab = payload
    }
};