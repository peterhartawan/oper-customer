import * as getter from '../../getters-types'
export default {
    //EMPLOYEE
    [getter.GET_LIST_EMPLOYEE](state) {
        return state.employee
    },
    // [getter.GET_LOCATION_DETAIL](state) {
    //     return state.locationdetail
    // },
    [getter.GET_EMPLOYEE_TOTAL](state) {
        return state.total
    },
    [getter.GET_PAGINATE_EMPLOYEE](state){
        return state.paginate
    },

    //POSITION
    [getter.GET_LIST_POSITION](state) {
        return state.position
    },
    // [getter.GET_LOCATION_DETAIL](state) {
    //     return state.locationdetail
    // },
    [getter.GET_POSITION_TOTAL](state) {
        return state.TotalPosition
    },
    [getter.GET_PAGINATE_POSITION](state){
        return state.PaginatePosition
    },
    [getter.GET_DETAIL_EMPLOYEE](state){
        return state.detailEmployee
    },
    [getter.GET_DROPDOWN_EMPLOYEE](state) {
        return state.dropdownEmployee
    },
    [getter.GET_DROPDOWN_POSITION](state) {
        return state.dropdownPosition
    },
    [getter.GET_DETAIL_POSITION](state){
        return state.detailPosition
    },
    [getter.GET_ACCOUNT_EMPLOYEE](state){
        return state.totalEmployee
    },
    [getter.GET_ROLE_TAB_EMPLOYEE](state){
        return state.roleTab
    }
};