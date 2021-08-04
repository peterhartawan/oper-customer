import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {

        async [action.LIST_EMPLOYEE]({commit, dispatch}, payload) {
            try{
                let pathS = '';
                (payload !== null) ? pathS = '/employee/?status='+payload.status+'&page='+payload.page+(payload.employee_search ? '&q='+payload.employee_search : '') : pathS ='/employee?dropdown=1&limit=100';
                let token = localStorage.getItem('token')
                let {data} = await localAxios.get(pathS, {
                    headers: {'Authorization': 'Bearer '+token}
                })
                let objList = {
                    dataList    : data.data.data,
                    total       : data.data.total,
                    nextC       : data.data.next_page_url,
                    prevC       : data.data.prev_page_url,
                    firstP      : data.data.first_page_url,
                    fromPA      : data.data.from
                }
                commit(mutation.BUTTON_STATUS, false)
                commit(mutation.SET_EMPLOYEE_LIST , objList )
            }catch (err) {
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.LIST_EMPLOYEE_TASK]({commit, dispatch}, payload) {
            try{
                let Url = `${payload.path}?page=${payload.page}&month=${payload.month}&trx_id=${payload.trx_id}&from=${payload.form}&to=${payload.to}`
                let token = localStorage.getItem('token');
                let { data } = await localAxios.get(Url, {
                    headers: {'Authorization': 'Bearer '+token}
                });
                let objList = {
                    dataList : data.data.data,
                    nextC   : data.data.next_page_url,
                    prevC   : data.data.prev_page_url,
                    firstP  : data.data.first_page_url,
                    fromPA  : data.data.from,
                    total : data.data.total
                };
                commit(mutation.SET_SEARCH_BUTTON, false);
                commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_EMPLOYEE_LIST, objList )
            }catch (err) {
                commit(mutation.SET_SEARCH_BUTTON, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.EMPLOYEE_TASK_ID]({commit, dispatch}, payload) {
            try {
                let newPath = ''
                let token = localStorage.getItem('token');
                let { data } = await localAxios.get(`${payload.path}/${payload.id}`,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                // commit(mutation.SET_ID_ENTERPRISE, data.data.client_enterprise_identerprise)
                let payloadS = {
                    data: data.data
                }
                if(payload.path === '/employee/task/complete') {
                    newPath = '/employee/complete'
                } else {
                    newPath = '/employee/inprogress'
                }
                commit(mutation.SET_EMPLOYEE_DETAIL, payloadS)
                commit(mutation.SET_PATH, newPath)
                // dispatch(action.TEMPLATE_ID, data.data.task_template_task_template_id)
                // return data.data
            }
            catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
},
        async [action.DROPDOWN_EMPLOYEE]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token')
                let {data} = await localAxios.get('/employee/?dropdown=1&limit=100'+(payload ? '&q='+payload : ''), {
                    headers: {'Authorization': 'Bearer '+token}
                })
                let objList = {
                    dataList : data.data.data,
                }
                commit(mutation.SET_LOADING, false);
                commit(mutation.SET_DROPDOWN_EMPLOYEE, objList )
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.DROPDOWN_POSITION]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token')
                let {data} = await localAxios.get('/employeeposition/?dropdown=1&limit=999', {
                    headers: {'Authorization': 'Bearer '+token}
                })
                let objList = {
                    dataList    : data.data.data,
                }
                commit(mutation.SET_DROPDOWN_POSITION, objList )

            }catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.CREATE_DATA_EMPLOYEE]({commit, dispatch}, payloads) {
            try{
             
                let token = localStorage.getItem('token');
                const formData = new FormData()
                formData.append('name', payloads.name)
                formData.append('email', payloads.email)
                formData.append('phonenumber', payloads.phonenumber)
                formData.append('address', payloads.address)
                formData.append('birthdate', payloads.birthdate)
                formData.append('nik', payloads.nik)
                formData.append('idemployee_position', payloads.position)
                formData.append('gender', payloads.gender)
                formData.append('photo', payloads.photo)
                if(payloads.photo2){
                    formData.append('photo_2', payloads.photo2)
                }
                formData.append('attendance_latitude', payloads.attendance_latitude)
                formData.append('attendance_longitude', payloads.attendance_longitude)
                let { data } = await localAxios.post('/employee' ,
                    formData,
                    { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    router.replace({ path: '/employee'})
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.DETAIL_EMPLOYEE]({commit, dispatch}, payload) {
                try {
                    let token = localStorage.getItem('token');
                    let { data } = await localAxios.get( '/employee/'+payload,
                        { headers: {'Authorization': 'Bearer '+token }
                        })

                    commit(mutation.SET_EMPLOYEE_DETAIL, {
                        data : data.data,

                    })
                    // router.replace({ path: '/employee/'+payload})
                    return data.data

                }
                catch (err) {
                    dispatch(action.DATA_ERROR, err)
                }
            },
        async [action.UPDATE_EMPLOYEE]({commit, dispatch}, payloads) {
            try{
                let token = localStorage.getItem('token');
                const formData = new FormData()
                formData.append('name', payloads.name)
                formData.append('email', payloads.email)
                formData.append('phonenumber', payloads.phonenumber)
                formData.append('address', payloads.address)
                formData.append('birthdate', payloads.birthdate)
                formData.append('nik', payloads.nik)
                formData.append('idemployee_position', payloads.position)
                formData.append('gender', payloads.gender)
                if(payloads.photo){
                    formData.append('photo', payloads.photo)
                }
                if(payloads.photo2){
                    formData.append('photo_2', payloads.photo2)
                }
                formData.append('_method', 'put')
                formData.append('attendance_latitude', payloads.attendance_latitude)
                formData.append('attendance_longitude', payloads.attendance_longitude)
                let { data } = await localAxios.post('/employee/'+payloads.users_id,
                    formData,
                    { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    router.replace({ path: '/employee'})
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },

        async [action.LIST_POSITION]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token')
                let {data} = await localAxios.get('/employeeposition/?page='+payload.page, {
                    headers: {'Authorization': 'Bearer '+token}
                })
                let objList = {
                    dataList    : data.data.data,
                    total       : data.data.total,
                    nextC       : data.data.next_page_url,
                    prevC       : data.data.prev_page_url,
                    firstP      : data.data.first_page_url,
                    fromPA      : data.data.from
                }
                commit(mutation.BUTTON_STATUS, false)
                commit(mutation.SET_POSITION_LIST , objList )
            }catch (err) {
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.DATA_ERROR, err)
            }
        },

        async [action.CREATE_POSITION]({commit, dispatch}, payload) {
        if(payload.price){
            try{
                let token = localStorage.getItem('token');
                const jsonData = JSON.stringify({
                    job_name                : payload.job_name,
                    price                   : payload.price
                });

                let { data } = await localAxios.post('/employeeposition',
                    jsonData,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    dispatch(action.LIST_POSITION, 1 )
                    router.replace({ path: '/employee/list-position'})
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        }else{
            try{
                let token = localStorage.getItem('token');
                const jsonData = JSON.stringify({
                    job_name                : payload.job_name,
                });

                let { data } = await localAxios.post('/employeeposition',
                    jsonData,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    dispatch(action.LIST_POSITION, 1 )
                    router.replace({ path: '/employee/list-position'})
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }

        }
        },
        async [action.DETAIL_POSITION]({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                let { data } = await localAxios.get( '/employeeposition/'+payload,
                    { headers: {'Authorization': 'Bearer '+token }
                    })

                commit(mutation.SET_DETAIL_POSITION, {
                    data : data.data,

                })
                router.replace({ path: '/employee/list-position/'+payload})
                return data.data

            }
            catch (err) {
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.UPDATE_POSITION]({commit, dispatch}, payload) {
            if(payload.price){
                try{
                    let token = localStorage.getItem('token');
                    const jsonData = JSON.stringify({
                        job_name                : payload.job_name,
                        price                   : payload.price
                    });

                    let { data } = await localAxios.put('/employeeposition/'+payload.idemployee_position,
                        jsonData,
                        { headers: {'Authorization': 'Bearer '+token }
                        })
                        dispatch(action.LIST_POSITION, 1 )
                        router.replace({ path: '/employee/list-position'});
                        commit(mutation.BUTTON_STATUS, false)
                }catch(err){
                    commit(mutation.BUTTON_STATUS, false)
                    swal(err.response.data.message,'', 'error')
                    dispatch(action.DATA_ERROR, err)
                }
            }else{
                try{
                    let token = localStorage.getItem('token');
                    const jsonData = JSON.stringify({
                        job_name                : payload.job_name,
                    });

                    let { data } = await localAxios.put('/employeeposition/'+payload.idemployee_position,
                        jsonData,
                        { headers: {'Authorization': 'Bearer '+token }
                        })
                        dispatch(action.LIST_POSITION, 1 )
                        router.replace({ path: '/employee/list-position'});
                        commit(mutation.BUTTON_STATUS, false)
                }catch(err){
                    commit(mutation.BUTTON_STATUS, false)
                    swal(err.response.data.message,'', 'error')
                    dispatch(action.DATA_ERROR, err)
                }
            }
        },
        async [action.DELETE_POSITION]({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                let { data } = await localAxios.delete('/employeeposition/'+payload,{
                        headers: {
                            'Authorization'     : 'Bearer '+token
                        }
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    dispatch(action.LIST_POSITION, 1 )
                    router.replace({ path: '/employee/list-position'});
            }catch (err) {
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.ASSIGN_EMPLOYEE_TASK]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token');
                const jsonData =
                    JSON.stringify({
                    task_template_id  : payload.task_template_id,
                    booking_time      : payload.booking_time,
                    message           : payload.message,
                    employee_userid   : payload.employee_userid
                });

                let { data } = await localAxios.post('/employee/assign-task',
                    jsonData,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                    commit(mutation.BUTTON_STATUS, false)
                    commit(mutation.CLEAR_INPUT, true)
                    swal('Succes To Assign Task','', 'success')
                    router.replace('/employee/assign-task')
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.SUSPEND_EMPLOYEE]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token');
                const jsonData = JSON.stringify({
                    reason_suspend           : payload.reason_suspend,
                });
    
                let { data } = await localAxios.put( '/user/suspend/'+ payload.users_id,
                    jsonData,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                dispatch(action.LIST_EMPLOYEE, {status: 1, page: 1})
                router.replace({ path: '/employee'})
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.ACCOUNT_EMPLOYEE);
                dispatch(action.GRAFIK_DASHBOARD);
            }catch(err){
                commit(mutation.BUTTON_STATUS, false)
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.ACTIVATE_EMPLOYEE]({commit, dispatch}, payload) {
            try{
                let token = localStorage.getItem('token');
                const jsonData = JSON.stringify({
                    reason_suspend           : null,
                });
                let { data } = await localAxios.put('/user/activate/'+payload.users_id,
                jsonData,
                    { headers: {'Authorization': 'Bearer '+token }
                    })
                    // console.log('data disini :', data)
                    dispatch(action.LIST_EMPLOYEE, {status: 3, page: 1})
                    router.replace({ path: '/employee'});
                    commit(mutation.SET_BUTTON_ACTIVE, false);
                    commit(mutation.BUTTON_STATUS, false)
                    dispatch(action.ACCOUNT_EMPLOYEE);
                    dispatch(action.GRAFIK_DASHBOARD);
            }catch(err){
                commit(mutation.SET_BUTTON_ACTIVE, false);
                commit(mutation.BUTTON_STATUS, false);
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
            }
        },
        async [action.DELETE_EMPLOYEE]({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                let { data } = await localAxios.delete('employee/'+payload.users_id,{
                        headers: {
                            'Authorization'     : 'Bearer '+token
                        }
                    })
                    dispatch(action.LIST_EMPLOYEE, {status: 3, page: 1});
                    commit(mutation.SET_BUTTON_DELETE, false);
                    commit(mutation.BUTTON_STATUS, false);
                    router.replace('/employee');
                    dispatch(action.TOTAL_ACCOUNT_DRIVER);
                    dispatch(action.GRAFIK_DASHBOARD);
            }catch (err) {
                commit(mutation.SET_BUTTON_DELETE, false);
                commit(mutation.BUTTON_STATUS, false);
                swal(err.response.data.message,'', 'error');
                dispatch(action.DATA_ERROR, err)
    
            }
        },
        async [action.CANCEL_TASK]({commit, dispatch}, payload) {
            try {
                let token = localStorage.getItem('token');
                const jsonData = JSON.stringify({
                    reason_cancel       : payload.reason_cancel,
                    idorder             : payload.idorder
                        });
                let { data } = await localAxios.post(`employee/cancelorder`,
                        jsonData,
                        { headers: {'Authorization': 'Bearer '+token }
                        });
                swal('Task Canceled','', 'success');
                commit(mutation.SET_LOADING, false);
                router.replace('/employee/inprogress')
            }
            catch (err) {
                commit(mutation.SET_LOADING, false);
                swal(err.response.data.message,'', 'error')
                dispatch(action.DATA_ERROR, err)
                }
            },
            async [action.ACCOUNT_EMPLOYEE]({commit, dispatch}, payload) {
                try{
                    let token = localStorage.getItem('token');
                    let { data } = await localAxios.get('/employee/total-account',
                        {
                            headers: {'Authorization': 'Bearer '+token}
                        });
                    commit(mutation.BUTTON_STATUS, false);
                    commit(mutation.SET_ACCOUNT_EMPLOYEE, data.data)
        
                }catch (err) {
                    commit(mutation.BUTTON_STATUS, false)
                    dispatch(action.DATA_ERROR, err)
                }
            },
};