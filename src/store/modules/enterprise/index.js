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
        fromP       : null
    },
    enterprise      : null,
    adminEnterprise : null,
    dataIdCorp      : null,
    totalP          : null,
    dataAdmin       : null,
};


export default {
    state,
    mutations,
    actions,
    getters
}