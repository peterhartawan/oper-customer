import mutations from './mutation'
import getters from './getters'
import actions from './action'


const state = {
    listVen: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    vendor: null,
    vendordetail: null,
    totalVen: null,
    dropDown: null,
    VendorID: null,
    dataAdmin: null
};



export default {
    state,
    mutations,
    actions,
    getters
}