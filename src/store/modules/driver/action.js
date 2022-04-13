import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'


export default {
    async [action.DATA_ID_DRIVER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/driver/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_DRIVER_DETAIL, {
                forDriver : data.data,
                
            })
            router.push({ path: '/detail-driver/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EDIT_DRIVER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/driver/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_DRIVER_DETAIL, {
                forDriver : data.data,
                
            })
            router.push({ path: '/edit-driver/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EDIT_DRIVER_ENTERPRISE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/driver/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_DRIVER_DETAIL, {
                forDriver : data.data,
                
            })
            router.push({ path: '/edit-driver-enterprise/'+payload})
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DROPDOWN_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/driver/?dropdown=1&limit=300'+(payload ? '&q='+payload : ''), {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.SET_DROPDOWN_DRIVER, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DROPDOWN_D_ASSIGNEE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/driver/?dropdown=1&status=1&limit=300&assignenterprise='+payload.identerprise, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.SET_DROPDOWN_DRIVER, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DRIVER_TYPE]({commit, dispatch}) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/driver/type', {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data,
            }
            commit(mutation.SET_DRIVER_TYPE, objList )
        
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_DATA_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get(
                `/driver/?page=${payload.page}&status=${payload.status}&q=${payload.q}`, {
                headers: {'Authorization': 'Bearer '+token}
            })

            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from
            };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_DRIVER, objList )
        
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_DATA_DRIVER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('name', payloads.name)
            formData.append('email', payloads.email)
            formData.append('phonenumber', payloads.phonenumber)
            formData.append('address', payloads.address)
            formData.append('birthdate', payloads.birthdate)
            formData.append('nik', payloads.nik)
            formData.append('gender', payloads.gender)
            formData.append('photo', payloads.photo)
            formData.append('attendance_latitude', payloads.attendance_latitude)
            formData.append('attendance_longitude', payloads.attendance_longitude)

            let { data } = await localAxios.post('/driver' ,
                formData,
                { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                })
                commit(mutation.BUTTON_STATUS, false)
                router.push({ path: '/driver'})
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },

    async [action.UPDATE_DATA_DRIVER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('name', payloads.name)
            formData.append('email', payloads.email)
            formData.append('phonenumber', payloads.phonenumber)
            formData.append('address', payloads.address)
            formData.append('birthdate', payloads.birthdate)
            formData.append('nik', payloads.nik)
            formData.append('gender', payloads.gender)
            formData.append('attendance_latitude', payloads.attendance_latitude)
            formData.append('attendance_longitude', payloads.attendance_longitude)
            if(payloads.photo){
            formData.append('photo', payloads.photo)
            }
            if(payloads.typedriver){
                formData.append('typedriver', payloads.typedriver)
            }else{
                formData.append('typedriver', payloads.pkwt)
            }
            formData.append('_method', 'put')
            let { data } = await localAxios.post('/driver/'+payloads.iddriver,
                formData,
                { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                })
                commit(mutation.BUTTON_STATUS, false)
                router.push({ path: '/driver'})
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DROPDOWN_D_AVAILABLE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get(`/driver/available-for-order?dropdown=1&identerprise=${payload}`, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data,
            }
            commit(mutation.SET_DRIVER_D_AVAILABLE, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_DRIVER_ENTERPRISE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/driver/?driver_type=1&page='+payload.page+'&identerprise='+payload.identerprise+'&q='+payload.q+'&status='+payload.status, {
                headers: {'Authorization': 'Bearer '+token}
            })

            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from,
    
            };
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_DRIVER, objList )
        
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_DRIVER_ASSIGNEE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/driver/'+
                '?page='+payload.page+
                '&status=1'+
                '&assignenterprise='+payload.identerprise+
                '&places='+payload.idplaces, {
                headers: {'Authorization': 'Bearer '+token}
            })

            let objList = {
                dataList    : data.data.data,
                total       : data.data.total,
                nextC       : data.data.next_page_url,
                prevC       : data.data.prev_page_url,
                firstP      : data.data.first_page_url,
                fromPA      : data.data.from,
                identerprise: payload.identerprise,
                idplaces    : payload.idplaces,
                places      : await dispatch(action.ASSIGNEE_LOCATION, payload.identerprise)
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false)
            commit(mutation.SET_ASSIGNED_DRIVERS, objList )
        
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ASSIGN_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                identerprise        : payload.identerprise,
                idrequest           : payload.idrequest,
                idvendor            : payload.idvendor,
                time                : payload.time,
                userdata            : payload.userdata,
                unassign_ids        : payload.unassign_ids,
            });

            let { data } = await localAxios.put('/driver/assign-to-enterprise',
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.LIST_DRIVER_ENTERPRISE,{page: payload.page, identerprise: payload.identerprise})
                router.push('/list-driver-enterprise/'+payload.identerprise)
        }catch(err){
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false)
            swal("Please check your location selection or driver selection.")
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : payload.reason_suspend,
            });

            let { data } = await localAxios.put( '/user/suspend/'+ payload.users_id,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                });
                commit(mutation.SET_BUTTON_SUSPEND, false);
                commit(mutation.BUTTON_STATUS, false)
                if(payload.forenterprise){ 
                    dispatch(action.LIST_DRIVER_ENTERPRISE, {
                    page    : 1,
                    q: '',
                    identerprise: payload.identerprise,
                    status  : 1});
                }else{
                    dispatch(action.LIST_DATA_DRIVER, {
                        page    : 1,
                        q       : '',
                        status  : 1});
                }
            dispatch(action.TOTAL_ACCOUNT_DRIVER);
            dispatch(action.GRAFIK_DASHBOARD);
                // router.push({ path: '/driver'})
        }catch(err){
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_BUTTON_SUSPEND, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend           : null,
            });
            let { data } = await localAxios.put('/user/activate/'+payload.users_id,
            jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                });
                if(payload.forenterprise){ 
                    dispatch(action.LIST_DRIVER_ENTERPRISE, {
                    page    : 1,
                    q: '',
                    identerprise: payload.identerprise,
                    status  : 3});
                }else{
                    dispatch(action.LIST_DATA_DRIVER, {
                        page    : 1,
                        q       : '',
                        status  : 3});
                        router.push({ path: '/driver'})
                }
            commit(mutation.SET_BUTTON_ACTIVE, false);
            dispatch(action.TOTAL_ACCOUNT_DRIVER);
            dispatch(action.GRAFIK_DASHBOARD);
        }catch(err){
            commit(mutation.SET_BUTTON_ACTIVE, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_DRIVER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('driver/'+payload.users_id,{
                    headers: {
                        'Authorization'     : 'Bearer '+token
                    }
                });
                commit(mutation.BUTTON_STATUS, false);
                if(payload.forenterprise){ 
                    dispatch(action.LIST_DRIVER_ENTERPRISE, {
                    page    : 1,
                    q: '',
                    identerprise: payload.identerprise,
                    status  : 3});
                }else{
                    router.push('/driver')
                }
            commit(mutation.SET_BUTTON_DELETE, false);
            dispatch(action.TOTAL_ACCOUNT_DRIVER);
            dispatch(action.GRAFIK_DASHBOARD);
        }catch (err) {
            commit(mutation.SET_BUTTON_DELETE, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.RESEND_PIN]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.post(payload.pin_type,
                { id_user : payload.id },{
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            });
            commit(mutation.SET_RESEND_PIN_BUTTON, false);
            commit(mutation.BUTTON_STATUS, false);
            swal('success to resend pin','', 'success')
        }catch (err) {
            commit(mutation.SET_RESEND_PIN_BUTTON, false);
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error');
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.TOTAL_ACCOUNT_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('driver/total-account',
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_TOTAL_ACCOUNT_DRIVER, data.data)

        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_REQ_DRIVER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('driver-requests?enterprise_id='+payload.identerprise+'&status='+payload.status,
                {
                    headers: {'Authorization': 'Bearer '+token}
                });
            let objList = {
                dataList : data.data.data,
                total   : data.data.total,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from
            }
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LOADING, false);
            commit(mutation.SET_LIST_REQ_DRIVER, objList)

        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            commit(mutation.SET_LOADING, false);
            dispatch(action.DATA_ERROR, err)
        }
    },

    async [action.CREATE_REQ_DRIVER]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('enterprise_id', payloads.enterprise_id)
            formData.append('place_id', payloads.place_id)
            formData.append('number_of_drivers', payloads.number_of_drivers)
            formData.append('note', payloads.note)
            formData.append('purpose_time', payloads.purpose_time)

            let { data } = await localAxios.post('/driver-requests' ,
                formData,
                { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                })
                commit(mutation.BUTTON_STATUS, false)
                router.push({ path: '/driver/request-list'})
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    
};