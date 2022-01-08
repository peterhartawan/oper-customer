
import * as getter from '../../getters-types'
export default {
[getter.GET_LIST_DRIVER](state) {
    return state.listDriver
},
[getter.GET_PAGINATE_DRIVER](state){
    return state.paginate
},
[getter.GET_DRIVER_A_LIST](state) {
    return state.driverAvList
},
[getter.GET_DRIVER_TOTAL](state) {
    return state.driverTotal
},
[getter.GET_DROPDOWN_DRIVER](state){
    return state.dropDown
},
[getter.GET_DRIVER_TYPE](state) {
    return state.driverType
},
[getter.DRIVER](state) {
    return state.detailDriver
},
[getter.GET_DRIVER_ASSIGNEE](state) {
    return state.driverAssignee
},
[getter.GET_DRIVER_ENTERPRISE](state) {
    return state.driverEnterprise
},
[getter.GET_TOTAL_ACCOUNT_DRIVER](state){
    return state.totalAccountD
},
[getter.GET_LIST_REQ_DRIVER](state){
    return state.listReqDriver
}
};

