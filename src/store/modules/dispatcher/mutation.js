import * as mutation from '../../mutation-types'

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_LIST_DISPATCHER](state, payload){
        state.listCor               = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
    },
    /*
    * create enterprise to detail enterprise
    * */
    [mutation.SET_DISPATCHER_RES](state, payload){
        state.enterprise = payload
    },

    [mutation.SET_ID_DISPATCHER](state, payload) {
        state.iddispatcher = payload
    },
    [mutation.SET_TOTAL_ACCOUNT_DISPCHER](state, payload){
        state.totalAccount = payload
    },
    [mutation.SET_DISPATCHER_AVAILABLE](state, payload){
        // console.log('dispatcher check list update event fired.')
        state.dispatcherAvail = payload
        if(state.selectedDispatchers == null){
            state.selectedDispatchers = []
            payload.forEach((element) => {
                if(element.checked == true){
                    state.selectedDispatchers.push(element)
                }
            })
        }
        // console.log(state.selectedDispatchers)
    },
    [mutation.SET_SELECTED_DISPATCHERS](state, payload){
        state.selectedDispatchers = payload
        // console.log(state.selectedDispatchers)
        // console.log(payload)
        // console.log(state.selectedDispatchers)
    },
};