import mutations from './mutation'
import getters from './getters'
import actions from './action'


const state = {
    //employee
    employee: null,
    detailEmployee: null,
    dropdownEmployee: null,
    dropdownPosition: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    total: null,

    //position
    position: null,
    positionresult: null,
    detailPosition: null,
    PaginatePosition : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    TotalPosition: null,
    totalEmployee: null,
    roleTab      : 'inprogress'
};



export default {
    state,
    mutations,
    actions,
    getters
}