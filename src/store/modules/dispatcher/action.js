import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'




export default {
    async [action.LIST_DISPATCHER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(
                `${typeS.dispatcher_page}${payload.page}&status=${payload.status}&typedispatcher=
                 ${payload.typedispatcher}&q=${payload.dispathcer_search}`,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE : data.data.total
            };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_DISPATCHER, objList )
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_DISPATCHER_ROLE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(`${typeS.dispatcher_role}${payload.role}&page=${payload.page}`, {
                headers: {'Authorization': 'Bearer '+token}
            });
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE : data.data.total
            };
            commit(mutation.SET_LIST_DISPATCHER, objList );
            commit(mutation.BUTTON_STATUS, false);
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_DISPATCHER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', payloads.name);
            formData.append('email', payloads.email);
            formData.append('phonenumber', payloads.phonenumber);
            formData.append('address', payloads.address);
            formData.append('birthdate', payloads.birthdate);
            formData.append('nik', payloads.nik);
            formData.append('gender', payloads.gender);
            formData.append('idvendor', payloads.idvendor);
            formData.append('photo', payloads.photo);

            let { data } = await localAxios.post(typeS.dispatcher ,
                formData,
                { headers: {'Authorization': 'Bearer '+token }
                })
            commit(mutation.BUTTON_STATUS, false);
            router.push('/dispatcher');
            // commit(mutation.SET_ENTERPRISE_RES, {
            //     enterpriseC : data.data,
            //     adminEnter  : data.data.admins[0]
            // })
            // router.push({ path: '/detail-enterprise/'+ data.data.identerprise })
            // 'Content-Type': 'multipart/form-data'
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DATA_ID_DISPATCHER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(typeS.dispatcher +payload,
                { headers: {'Authorization': 'Bearer '+token }
                })
            commit(mutation.SET_DISPATCHER_RES, data.data)
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_DISPATCHER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                email               : payload.email,
                name                : payload.name,
                phonenumber         : payload.phone,
                birthdate           : payload.birthdate,
                address             : payload.address,
                nik                 : payload.nik,
                gender              : payload.gender.toString(),
                idvendor            : payload.idDispatch.toString(),
                idrole              : payload.id_dispatcher_type.toString()
            })
            let { data } = await localAxios.put(typeS.dispatcher + payload.id,
                jsonData, {
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            });
            commit(mutation.SET_DISPATCHER_RES, data.data)
            commit(mutation.BUTTON_STATUS, false)
            router.push('detail-dispatcher')
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_DISPATCHER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete(typeS.dispatcher + payload,{
                    headers: {
                        'Authorization'     : 'Bearer '+token
                    }
                })
                let obj = {
                    page: 1,
                    typedispatcher : '',
                    dispathcer_search: '',
                    status: 3 };
                dispatch(action.LIST_DISPATCHER, obj);
                commit(mutation.SET_BUTTON_DELETE, false);
                commit(mutation.BUTTON_STATUS, false);
                router.push('/dispatcher')
        }catch (err) {
            commit(mutation.SET_BUTTON_DELETE, false);
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SEARCH_DISPATCHER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(typeS.search_dispatcher + payload, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE : data.data.total
            }
            commit(mutation.SET_LIST_DISPATCHER, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ASSIGN_TO_ENTERPRISE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let jsonData = JSON.stringify({
                dispatcher_userid   : payload.id,
                identerprise        : payload.identerprise
            })
            let { data } = await localAxios.put(typeS.assign_to_enteprise,
                jsonData, { headers: {  'Authorization': 'Bearer '+token}
            })
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            // router.push({ path: '/detail-enterprise/'+ payload.identerprise })
        }catch (err) {
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.MULTI_TO_ENTERPRISE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let jsonData = JSON.stringify({
                // dispatcher_userid   : payload.id,
                assign_ids          : payload.assign_ids,
                unassign_ids        : payload.unassign_ids,
                identerprise        : payload.identerprise
            })
            let { data } = await localAxios.put(typeS.multi_to_enteprise,
                jsonData, { headers: {  'Authorization': 'Bearer '+token}
            })
            swal(data.data, '', 'success')
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            // dispatch(action.DISPATCHER_AVAILABLE, this.form)
            router.replace({ path: '/enterprise/'})
        }catch (err) {
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_DISPATCHER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : payload.reason_suspend,
            });

            let { data } = await localAxios.put( '/user/suspend/'+ payload.users_id,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                });
                let obj = {
                    page: 1,
                    typedispatcher : '',
                    dispathcer_search: '',
                    status: 1 };
                commit(mutation.SET_BUTTON_SUSPEND, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.LIST_DISPATCHER, obj);
            router.push({ path: '/dispatcher'})
        }catch(err){
            commit(mutation.SET_BUTTON_SUSPEND, false);
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_DISPATCHER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : null,
            });
            let { data } = await localAxios.put('/user/activate/'+payload,
            jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
                commit(mutation.BUTTON_STATUS, false)
                let obj = {
                    page: 1,
                    typedispatcher : '',
                    dispathcer_search: '',
                    status: 3 };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_BUTTON_ACTIVE, false);
            dispatch(action.LIST_DISPATCHER, obj);
            router.push({ path: '/dispatcher'})
        }catch(err){
            commit(mutation.SET_BUTTON_ACTIVE, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error');
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.TOTAL_ACCOUNT_DISPATCHER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(`${typeS.dispatcher}total-account`,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_TOTAL_ACCOUNT_DISPCHER, data.data)

        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DISPATCHER_AVAILABLE]({commit, dispatch}, payload) {
        try{
            let path;
            (payload === undefined) ? path = `${typeS.dispatcher}available` : path = `${typeS.dispatcher}available?q=${payload}`
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(path,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_DISPATCHER_AVAILABLE, data.data);

        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.MULTI_DISPATCHER_AVAILABLE]({commit, dispatch}, payload) {
        try{
            let path;
            (payload.search === undefined) ? 
                path = 
                `${typeS.dispatcher}mdavailable?assignenterprise=${payload.assignEnterprise}` 
                : 
                path = 
                `${typeS.dispatcher}mdavailable?q=${payload.search}&assignenterprise=${payload.assignEnterprise}`
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(path,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_DISPATCHER_AVAILABLE, data.data);
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },

};
