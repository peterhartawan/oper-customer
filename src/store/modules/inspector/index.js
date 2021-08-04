import mutations from './mutation'
import getters from './getters'
import actions from './action'

const state = {
    listCor: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null,
        totalP      : null
    },
    enterprise: null,
    adminEnterprise: null,
    dataIdCorp: null,
    identerprise: null,
    idinspector: null
};


export default {
    state,
    mutations,
    actions,
    getters
}