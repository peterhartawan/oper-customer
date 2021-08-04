import * as mutation from '../../mutation-types'

export default {
    [mutation.SET_LIST_ATT](state, payload){
        state.listAtt               = payload.dataList
        state.attTotal              = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_FILTER_ATT](state, payload){
        state.filterAttendance      = payload.filterAtt
        state.filterTotal           = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
       
    },
    [mutation.SET_ATTENDANCE_DETAIL](state, payload){
        state.attendance = payload.forAttendance
    },
   
};