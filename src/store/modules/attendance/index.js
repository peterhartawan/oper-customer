import mutations from './mutation'
import getters from './getters'
import actions from './action'

const state = {
    listAtt: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    dropDown: null,
    filterAttendance: null,
    attendance: null,
    attTotal:   null,
    filterTotal: null,
};







export default {
    state,
    mutations,
    actions,
    getters
}