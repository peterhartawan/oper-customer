import * as mutation from '../../mutation-types'
export default {
    [mutation.SET_REQUEST_DETAILS](state, payload){
        state.requestDetails = payload
    },
    [mutation.RESET_REQUEST_DETAILS](state, payload){
        state.requestDetails = null
    },
    [mutation.SET_SEARCH_INDEX](state, payload){
        state.searchIndex  = payload
    },
    [mutation.SET_DROPDOWN_DRIVER](state, payload){
        payload.dataList.forEach((element, index) => {
            element.numrow = index+1
        })
        state.dropDown  = payload.dataList
    },
    [mutation.SET_DRIVER_D_AVAILABLE](state, payload){
        state.driverAvList  = payload.dataList
    },
    [mutation.RESET_ASSIGNED_DRIVERS](state){
        state.assignedDrivers = null
        state.checked = []
        state.selectedPlaces = []
        state.selectedTimes = []
    },
    [mutation.SET_ASSIGNED_DRIVERS](state, payload){
        //get all selected drivers for first time connection
        if(state.assignedDrivers == null){
            state.assignedDrivers = payload.selected_drivers
            payload.selected_drivers.forEach((element,index) => {
                //places
                if(element.places != null){
                    if(element.stay_time != null){
                        state.selectedTimes[index] = element.stay_time
                    }

                    var exists = 0;
                    payload.places.forEach((place) => {
                        if(element.places.idplaces == place.idplaces)
                            exists++
                    });
                    if(exists){
                        state.selectedPlaces[index] = element.places

                        //time
                        if(payload.stay_time != null){
                            state.selectedTimes[index] = payload.stay_time
                        }
                    }
                }
            })
        }
        var paToIndex = payload.fromPA - 1
        let olxIdVendor = process.env.VUE_APP_ID_VENDOR_OLX
        let idvendor = JSON.parse(localStorage.getItem('user')).vendor_idvendor
        payload.dataList.forEach((element, index) => {
            let x = paToIndex + index
            if(state.checked[x] == null){
                state.checked[x] = false
                
                if(idvendor == olxIdVendor){
                    //olx
                    if(element.client_enterprise_identerprise == payload.identerprise){
                        state.assignedDrivers[x] = element
                        state.checked[x] = true
                    }
                }
                else{
                    //places
                    if(element.places != null){
                        if(element.stay_time != null){
                            state.selectedTimes[x] = element.stay_time
                        }

                        var exists = 0;
                        payload.places.forEach((place) => {
                            if(element.places.idplaces == place.idplaces)
                                exists++
                        });
                        if(exists){
                            state.selectedPlaces[x] = element.places
                            if(element.client_enterprise_identerprise == payload.identerprise){
                                if(payload.idplaces != null){
                                    if(state.selectedPlaces[x].idplaces == payload.idplaces){
                                        state.assignedDrivers[x] = element
                                        state.checked[x] = true
                                    }
                                } else {
                                    state.assignedDrivers[x] = element
                                    state.checked[x] = true
                                }

                                //time
                                if(payload.stay_time != null && state.checked[x]){
                                    state.selectedTimes[x] = payload.stay_time
                                }
                            }
                        }
                    }
                }
            }
        })

        state.listDriverAssignee    = payload.dataList
        state.driverTotal           = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_LIST_DRIVER](state, payload){
        state.listDriver            = payload.dataList
        state.driverTotal           = payload.total
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
    },
    [mutation.SET_DRIVER_TYPE](state, payload){
        state.driverType  = payload.dataList
    },
    [mutation.SET_DRIVER_DETAIL](state, payload){
        state.detailDriver  = payload.forDriver
    },
    [mutation.SET_DRIVER_RES](state, payload){
        state.driver               = payload.driverdata
       
    },
    [mutation.SET_DRIVER_ASSIGNEE](state, payload){
        state.driverAssignee         = payload.dataList
       
    },
    [mutation.SET_DRIVER_ENTERPRISE](state, payload){
        state.driverEnterprise         = payload.dataList
    },
    [mutation.SET_TOTAL_ACCOUNT_DRIVER](state, payload){
        state.totalAccountD = payload
    },
    [mutation.SET_LIST_REQ_DRIVER](state, payload){
        state.listReqDriver = payload
    }
};