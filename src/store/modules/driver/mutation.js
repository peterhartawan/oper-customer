import * as mutation from '../../mutation-types'
export default {
    [mutation.SET_DROPDOWN_DRIVER](state, payload){
        state.dropDown  = payload.dataList
    },
    [mutation.SET_DRIVER_D_AVAILABLE](state, payload){
        state.driverAvList  = payload.dataList
    },
    [mutation.SET_LIST_DRIVER](state, payload){
        state.listDriver            = payload.dataList
        state.driverTotal           = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_DRIVER_TYPE](state, payload){
        state.driverType  = payload.dataList
    },
    [mutation.SET_DRIVER_DETAIL](state, payload){
        state.detailDriver  = payload.forDriver
    },
    [mutation.SET_DRIVER_RES](state, payload){
        state.driver               = payload.driverdata
       
    },
    [mutation.SET_DRIVER_ASSIGNEE](state, payload){
        state.driverAssignee         = payload.dataList
       
    },
    [mutation.SET_DRIVER_ENTERPRISE](state, payload){
        state.driverEnterprise         = payload.dataList
    },
    [mutation.SET_TOTAL_ACCOUNT_DRIVER](state, payload){
        state.totalAccountD = payload
    }
};