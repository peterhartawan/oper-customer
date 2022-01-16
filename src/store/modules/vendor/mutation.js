import * as mutation from '../../mutation-types'

export default {
    [mutation.SET_LIST_VEN](state, payload){
        state.listVen               = payload.dataList
        state.totalVen              = payload.totalVendor
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_VENDOR_RES](state, payload){
        state.vendor               = payload.vendordata

    },
    [mutation.SET_VENDOR_DETAIL](state, payload){
        state.vendordetail = payload.forVendor
    },
    [mutation.SET_DROPDOWN_VENDOR](state, payload){
        state.dropDown  = payload.dataList
    },
    [mutation.SET_PROFILE_VENDOR](state, payload){
        state.VendorID = payload.idVendor
    },
    [mutation.SET_ENTERPRISE_ID](state, payload){
        state.EnterpriseID = payload.idEnterprise
    },
    [mutation.SET_DATA_ADMIN_VEND](state, payload){
        state.dataAdmin = payload
    }
 };