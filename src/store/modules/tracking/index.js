import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import localAxios from "../../../services/http/client";
import * as typeS from '../../../services/path_service'
import swal from "../order-client/action";

const state = {
    listTracking: null,
    paginate : {
        nextClick   : null,
        prevClick   : null,
        firstPage   : null,
        fromP       : null
    },
    trackingType    : null,
    trackingAtt     : null,
};

const mutations = {
    [mutation.TRACKING_ORDER](state, payload){
        state.listTracking         = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
    },
    [mutation.TRACKING_TYPE](state, payload){
        state.trackingType  = payload
    },
    [mutation.TRACKING_ATTENDANCE](state, payload){
        state.trackingAtt         = payload.dataList
    }
};

const actions = {
    async [action.TRACKING]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get(`${typeS.tracking}${payload.type}${payload.id}&page=${payload.page}&limit=1000`,
                {
                    headers: {'Authorization': 'Bearer ' + token}
                });
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE : data.data.total
            };
            commit(mutation.TRACKING_ORDER, objList )
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.TRACKING_ATTENDANCE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get('/tracking/attendance/?idattendance='+payload+'&limit=100',
                {
                    headers: {'Authorization': 'Bearer ' + token}
                });
            let objList = {
                dataList : data.data.data,
            }
            
            commit(mutation.SET_LOADING, false);
            commit(mutation.TRACKING_ATTENDANCE, objList )
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    }
};

const getters = {
    [getter.GET_TRACKING_PAGINATE](state){
        return state.paginate
    },
    [getter.GET_TRACKING_ORDER](state) {
        return state.listTracking
    },
    [getter.GET_TRACKING_TYPE](state){
        return state.trackingType
    },
    [getter.GET_TRACKING_ATTENDANCE](state){
        return state.trackingAtt
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}