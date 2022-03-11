import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import enterprise from "../../../router/enterprise";

const state = {
    listCor: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null,
        curPage     : null
    },
    order           : null,
    path            : null,
    totalP          : null,
    idorder         : null,
    trackingOrder   : null,
    orderGraphic    : null,
    orderBar        : null,
    rolePath        : 'open'
};


export default {
    state,
    mutations,
    actions,
    getters
}