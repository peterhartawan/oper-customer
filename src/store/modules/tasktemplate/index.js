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
    template: null,
    adminEnterprise: null,
    dataIdCorp: null,
    identerprise: null,
    idtemplate  : null,
    templateReport: null,
    dialogVisible: false,
    positionTemplate: null
};


export default {
    state,
    mutations,
    actions,
    getters
}