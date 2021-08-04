import * as mutation from '../../mutation-types'

export default {
    
    [mutation.SET_LOCATION_LIST](state, payload) {
        state.location              = payload.dataList
        state.total                 = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_LOCATION_RES](state, payload) {
        state.locationresult = payload.locationdata
    },
    [mutation.SET_LOCATION_DETAIL](state, payload) {
        state.locationdetail = payload.data
    },
   
};