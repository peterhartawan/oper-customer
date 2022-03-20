import mutations from './mutation'
import getters from './getters'
import actions from './action'

// import corporate from "../../../router/corporate";

const state = {
    listDriver: null,
    dropDown: null,
    driverAvList: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    driverTotal: null,
    driverType: null,
    detailDriver: null,
    driverAssignee: null,
    driverEnterprise: null,
    totalAccountD: null,
    requestDetails: null,
    listReqDriver: null,
    listDriverAssignee: null,
    assignedDrivers: [],
    checked: [],
    selectedPlaces: [],
    searchIndex: []
};


export default {
    state,
    mutations,
    actions,
    getters
}