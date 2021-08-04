import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import * as getter from '../../getters-types'
import localAxios from "../../../services/http/client";
import * as typeS from '../../../services/path_service'
import swal from 'sweetalert2'

const state = {
};

const mutations = {
};

const actions = {
    async [action.RESEND_LINK_ACTIVATION]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let obj;
            if(payload.page === '/vendor'){
                obj = { idvendor : payload.id}
            }else if(payload.page === '/enterprise') {
                obj = { identerprise : payload.id}
            }else if(payload.page === '/dispatcher') {
                obj = { iddispatcher : payload.iddispatcher}
            }
            let {data}  = await localAxios.post(`${payload.page}/resend-activation`,
                obj,
                    { headers: {'Authorization': 'Bearer '+token}
                    });
            swal(data.message,'', 'success');
            commit(mutation.SET_BUTTON_RESEND_ACTIVE, false);
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_BUTTON_RESEND_ACTIVE, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
};

const getters = {
};

export default {
    state,
    mutations,
    actions,
    getters
}