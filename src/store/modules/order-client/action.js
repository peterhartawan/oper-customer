import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'



export default {
    async [action.LIST_ORDER_CLIENT]({commit, dispatch}, payload) {
        try{
            let param = '';
            let token = localStorage.getItem('token');
            if(payload.enterprise_name !== '' || payload.driver_name !== '' || payload.month !== '' || payload.trx_id !== '' || payload.idvendor !== '' || payload.start_date !== '' || payload.end_date !== '') {
                param =     `${payload.path}?page=${payload.page}&enterprise_name=${payload.enterprise_name}
                            &driver_name=${payload.driver_name}&month=${payload.month}
                            &trx_id=${payload.trx_id}&idvendor=${payload.idvendor}&from=${payload.start_date}&to=${payload.end_date}`
            } else {
                param = `${payload.path}?page=${payload.page}`
            }
            let { data } = await localAxios.get(param, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE : data.data.total,
                curPage : payload.page
            }
            commit(mutation.BUTTON_STATUS, false)
            commit(mutation.SET_L_ORDER_CLIET, objList )
        }catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_ORDER_CLIENT]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                task_template_id        : payloads.task_template_id,
                booking_time            : payloads.booking_time,
                origin_latitude         : payloads.origin_latitude,
                origin_longitude        : payloads.origin_longitude,
                destination_latitude    : payloads.destination_latitude,
                destination_longitude   : payloads.destination_longitude,
                client_vehicle_license  : payloads.client_vehicle_license,
                user_fullname           : payloads.user_fullname,
                user_phonenumber        : payloads.user_phonenumber,
                vehicle_owner           : payloads.vehicle_owner,
                vehicle_brand_id        : payloads.vehicle_brand+'',
                vehicle_type            : payloads.vehicle_type,
                vehicle_transmission    : payloads.vehicle_transmission,
                vehicle_year            : payloads.vehicle_year,
                vehicle_color           : payloads.vehicle_color,
                message                 : payloads.message,
                origin_name             : payloads.origin_name,
                destination_name        : payloads.destination_name
            })
            let { data } = await localAxios.post(typeS.order ,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token}
                })
            commit(mutation.BUTTON_STATUS, false)
            commit(mutation.SET_ORDER_CLIENT_DETAIL, data.data)
            router.push('/order/open')
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_ORDER_CLIENT]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                task_template_id        : payloads.task_template_id,
                booking_time            : payloads.booking_time,
                origin_latitude         : payloads.origin_latitude,
                origin_longitude        : payloads.origin_longitude,
                destination_latitude    : payloads.destination_latitude,
                destination_longitude   : payloads.destination_longitude,
                client_vehicle_license  : payloads.client_vehicle_license,
                user_fullname           : payloads.user_fullname,
                user_phonenumber        : payloads.user_phonenumber,
                vehicle_owner           : payloads.vehicle_owner,
                vehicle_brand_id        : payloads.vehicle_brand+'',
                vehicle_type            : payloads.vehicle_type,
                vehicle_transmission    : payloads.vehicle_transmission,
                vehicle_year            : ''+payloads.vehicle_year,
                vehicle_color           : payloads.vehicle_color,
                message                 : payloads.message,
                origin_name             : payloads.origin_name,
                destination_name        : payloads.destination_name
            })
            let { data } = await localAxios.put(typeS.order + payloads.idorder,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token}
                })
            commit(mutation.BUTTON_STATUS, false)
            let obj = {
                id    : payloads.idorder,
                path  : '/order/open'
            }
            dispatch(action.ID_ORDER_CLIENT, obj)
            router.push('/order/detail')
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ID_ORDER_CLIENT]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(`${payload.path}/${payload.id}`,
                { headers: {'Authorization': 'Bearer '+token }
                })
            commit(mutation.SET_ID_ENTERPRISE, data.data.client_enterprise_identerprise)
            commit(mutation.SET_ORDER_CLIENT_DETAIL, data.data)
            commit(mutation.SET_PATH, payload.path)
            dispatch(action.TEMPLATE_ID, data.data.task_template_task_template_id)
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ASSIGN_ORDER_CLIENT]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                idorder         : payloads.idorder,
                driver_userid   : payloads.driver_userid,
            })
            let { data } = await localAxios.post(typeS.order_assign ,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token}
                })
            commit(mutation.BUTTON_STATUS, false)
            router.push('/order/inprogress')
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EXPORT_ORDER_LIST]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get(`${payload.path}?month=${payload.month}&export=1`,
                {
                    headers: {'Authorization': 'Bearer ' + token}
                })
            let jsonfile = JSON.stringify(data.data).split(' ');
            let jsonT = jsonfile[1].split(':');
            let combJson = jsonT[1] +':'+ jsonT[2];
            let fileDownload = combJson.split('}')[0];
            commit(mutation.BUTTON_STATUS, false)
            return fileDownload
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DOWNLOAD_BULK_ORDER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get(typeS.bulk_order_template,
                {
                    headers: {'Authorization': 'Bearer ' + token}
                })
            let jsonfile = JSON.stringify(data.data).split(' ');
            let jsonT = jsonfile[1].split(':');
            let combJson = jsonT[1] +':'+ jsonT[2];
            let fileDownload = combJson.split('}')[0];
            commit(mutation.BUTTON_STATUS, false);
            return fileDownload
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPLOAD_BULK_ORDER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('file', payload);
            let { data } = await localAxios.post(typeS.import_bulk_order,
                formData,
                { headers: {'Authorization': 'Bearer '+token, 'Content-Type': 'multipart/form-data'}
                })
                commit(mutation.BUTTON_STATUS, false)
                swal('File has been successfully uploaded!','', 'success')
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CANCEL_ORDER]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_cancel            : payload.reason_cancelorder,
                idorder                  : payload.idorder
            });
            let { data } = await localAxios.post(`${typeS.order}cancelorder`,
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
            swal('Order Canceled','', 'success')
            commit(mutation.SET_LOADING, false);
            router.push('/order/inprogress')
        }
        catch (err) {
            commit(mutation.SET_LOADING, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ORDER_GRAPHIC_BAR]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let url;
            (payload.type === 'order') ? url = `${typeS.order}total-order-${payload.v}`: url  = `/employee/total-order-${payload.v}`
            console.log(url)
            let { data } = await localAxios.get(url,
                { headers: {'Authorization': 'Bearer '+token }
                });
            console.log(data.data)
            commit(mutation.SET_LOADING, false);
            commit(mutation.SET_ORDER_BAR_GRAPHIC, data.data);
        }
        catch (err) {
            commit(mutation.SET_LOADING, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
};
