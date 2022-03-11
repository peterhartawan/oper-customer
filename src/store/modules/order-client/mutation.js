import * as mutation from '../../mutation-types'
import {TRACKING_ORDER} from "../../action-types";

export default {
    /**
     * for list corporate need to next click and other
     * */
    [mutation.SET_L_ORDER_CLIET](state, payload){
        state.listCor               = payload.dataList
        state.paginate.nextClick    = payload.nextC
        state.paginate.prevClick    = payload.prevC
        state.paginate.firstPage    = payload.firstP
        state.paginate.fromP        = payload.fromPA
        state.paginate.totalP       = payload.totalPE
        state.paginate.curPage      = payload.curPage
    },
    /*
    * create enterprise to detail enterprise
    * */
    [mutation.SET_ORDER_CLIENT_DETAIL](state, payload){
        state.order = payload
    },

    [mutation.SET_PATH](state, payload) {
        state.path = payload
    },
    [mutation.ID_ORDER](state, payload) {
        state.idorder = payload
    },
    [mutation.SET_ORDER_BAR_GRAPHIC](state, payload){
        state.orderBar = payload.total_order;
        let label, data;

        label = payload.grafik.complete.labels;
        // label = payload.grafik.open.labels.concat(payload.grafik.inprogress.labels.filter((item)=> {
        //     return payload.grafik.open.labels.indexOf(item) < 0;
        // }));
        // label = label.concat(payload.grafik.complete.labels.filter((item)=> {
        //     return label.indexOf(item) < 0;
        // }));
        data = [payload.grafik.complete.series];
        state.orderGraphic = {
            label,
            data
        }

    },
    [mutation.SET_ROLE_PATH_ORDER](state, payload){
        state.rolePath = payload
    }
};