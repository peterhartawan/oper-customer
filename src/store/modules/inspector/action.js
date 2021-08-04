import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'




export default {
    async [action.PICTASK_LIST]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(typeS.inspector_page + payload.currentP + '&identerprise=' + payload.identerpriseS, {
                headers: {'Authorization': 'Bearer '+token}
            });
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE  : data.data.total
            };
            commit(mutation.SET_LOADING, false)
            commit(mutation.SET_PICTASK_LIST, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_PIC_TASK]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name                : payloads.name,
                phonenumber         : payloads.phone.toString(),
                identerprise        : payloads.identerprise.toString()
            });
            let { data } = await localAxios.post( typeS.inspector,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
            let obj = {
                currentP        : 1,
                identerpriseS   : data.data.client_enterprise_identerprise
            }
            dispatch(action.PICTASK_LIST, obj)
            router.replace('/pic-task-list')
            commit(mutation.BUTTON_STATUS, false)
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_INSPECTOR]({commit, dispatch}, payloads) {
        try {
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                name                : payloads.name,
                phonenumber         : payloads.phone.toString(),
                identerprise        : payloads.identerprise.toString()
            })
            let { data } = await localAxios.put(typeS.inspector + payloads.idinspector,
                jsonData, {
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            })
            commit(mutation.BUTTON_STATUS, false)
            router.replace('/pic-task-list')
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_INSPECTOR]({commit, dispatch}, payload) {
        try {

            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete(typeS.inspector + payload.idList,{
                    headers: {
                        'Authorization'     : 'Bearer '+token
                    }
                });
            let obj = {
                currentP        : payload.currPage,
                identerpriseS   : payload.identer
            };
            dispatch(action.PICTASK_LIST, obj);
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ID_INSPECTOR] ({commit, dispatch}, payload) {
        try {

            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(typeS.inspector + payload ,{
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            })
            return data.data

        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    }

};
