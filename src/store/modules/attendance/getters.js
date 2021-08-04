import * as getter from '../../getters-types'
export default {
    [getter.GET_LIST_ATT](state) {
        return state.listAtt
    },
    [getter.GET_PAGINATE_ATT](state) {
        return state.paginate
    },
    [getter.GET_FILTER_ATT](state) {
        return state.filterAttendance
    },
    [getter.GET_ATT_TOTAL](state) {
        return state.attTotal
    },
    [getter.GET_FILTER_TOTAL](state) {
        return state.filterTotal
    },
    [getter.ATTENDANCE](state) {
        return state.attendance
    },

};