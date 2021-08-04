
import * as getter from '../../getters-types'

export default {
    [getter.GET_LIST_VEN](state) {
        return state.listVen
    },
    [getter.GET_PAGINATE_VEN](state){
        return state.paginate
    },
    [getter.VENDOR](state) {
        return state.vendordetail
    },
    [getter.GET_VEN_TOTAL](state) {
        return state.totalVen
    },
    [getter.GET_DROPDOWN_VENDOR](state){
        return state.dropDown
    },
    [getter.GET_VENDOR_PROFILE](state){
        return state.VendorID
    },
    [getter.GET_ADMIN_DATA_VEND](state){
        return state.dataAdmin
    }
};

