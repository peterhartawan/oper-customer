import * as getter from '../../getters-types'
export default {

    [getter.GET_LIST_LOCATION](state) {
        return state.location
    },
    [getter.GET_LOCATION_DETAIL](state) {
        return state.locationdetail
    },
    [getter.GET_LOCATION_TOTAL](state) {
        return state.total
    },
    [getter.GET_PAGINATE_LOCATION](state){
        return state.paginate
    },
};