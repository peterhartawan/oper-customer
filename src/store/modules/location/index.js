import mutations from './mutation'
import getters from './getters'
import actions from './action'


const state = {
    location: null,
    locationresult: null,
    locationdetail: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    total: null,
};



export default {
    state,
    mutations,
    actions,
    getters
}