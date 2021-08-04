import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'




export default {
    async [action.LIST_DATA_COR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(
                `${typeS.enterprise_page}${payload.page}&status=
                ${payload.status}&typeenterprise=${payload.typeenterprise}&q=${payload.enterprise_name}`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                });
            let objList = {
                dataList: data.data.data,
                nextC: data.data.next_page_url,
                prevC: data.data.prev_page_url,
                firstP: data.data.first_page_url,
                fromPA: data.data.from,
                totalPE: data.data.total
            }
            commit(mutation.SET_LIST_COR, objList);
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_DATA_CORP]({ commit, dispatch }, payloads) {
        try {
            let token = localStorage.getItem('token');
            let i, len = payloads.inspectors, picolo = []
            for (i = 0; i < len.length; i++) {
                picolo.push({
                    name: len[i].name,
                    phone: len[i].phone
                })
            }
            const formData = new FormData()
            formData.append('name', payloads.name)
            formData.append('image_logo', payloads.photo)
            formData.append('site_url', payloads.site_url)
            formData.append('description', payloads.description)
            formData.append('email', payloads.email)
            formData.append('identerprise_type', payloads.id_enterprise_type)
            formData.append('idvendor', payloads.id_vendor)
            formData.append('office_phone', payloads.office_phone)
            formData.append('office_address', payloads.office_address)
            formData.append('pic_name', payloads.pic_name)
            formData.append('pic_phone', payloads.pic_phone)
            formData.append('pic_email', payloads.pic_email)
            formData.append('admin_name', payloads.admin_name)
            formData.append('admin_phone', payloads.admin_phone)
            formData.append('admin_email', payloads.admin_email)
            for (i = 0; i < picolo.length; i++) {
                formData.append('inspectors[' + i + '][name]', picolo[i].name)
                formData.append('inspectors[' + i + '][phone]', picolo[i].phone)
            }
            
            let { data } = await localAxios.post(typeS.enterprise,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.SET_ENTERPRISE_RES, {
                enterpriseC: data.data,
                adminEnter: data.data.admins
            })
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/detail-enterprise/' + data.data.identerprise })

        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)

        }
    },
    async [action.DATA_ID_CORP]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(typeS.enterprise + '/' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_ENTERPRISE_RES, {
                enterpriseC: data.data,
                adminEnter: data.data.admins
            });
            commit(mutation.BUTTON_STATUS, false)
            return data.data
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_CORP]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('name', payload.name)
            if(payload.photo){
                formData.append('image_logo', payload.photo)
            }
            formData.append('site_url', payload.site_url)
            formData.append('description', payload.description)
            formData.append('email', payload.email)
            formData.append('identerprise_type', payload.id_enterprise_type)
            formData.append('idvendor', payload.id_vendor)
            formData.append('office_phone', payload.office_phone)
            formData.append('office_address', payload.office_address)
            formData.append('pic_name', payload.pic_name)
            formData.append('pic_phone', payload.pic_phone)
            formData.append('pic_email', payload.pic_email)
            formData.append('_method', 'put')

            let { data } = await localAxios.post(typeS.enterprise + '/' + payload.id,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token }
            })
            commit(mutation.SET_ENTERPRISE_RES, {
                enterpriseC: data.data,
                adminEnter: data.data.admins
            })
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/detail-enterprise/' + data.data.identerprise })
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_CORP_ID]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete(typeS.enterprise + '/' + payload, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            router.replace('/enterprise')
        } catch (err) {

        }
    },
    async [action.NEW_ADMIN_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                identerprise: payload.identerprise,
                admin_name: payload.admin_name,
                admin_email: payload.admin_email,
                admin_mobile_number: payload.admin_phonenumber,
            });

            let { data } = await localAxios.post('/enterprise/admin',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            router.replace({ path: '/detail-enterprise/' + payload.identerprise })
            commit(mutation.SET_LOADING, false);
            swal.fire(
                'Successfully created new admin!',
                '',
                'success')
        } catch (err) {
            commit(mutation.SET_LOADING, false);
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_ADMIN_CLIENT]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let jsonData = JSON.stringify({
                name: payload.name,
                email: payload.email,
                phonenumber: payload.phone.toString()
            })
            let { data } = await localAxios.put(typeS.user + payload.idAdmin,
                jsonData, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
            dispatch(action.DATA_ID_CORP, payload.identer)
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/detail-enterprise/' + payload.identer })
            swal.fire(
                data.message,
                '',
                'success')
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend: payload.reason_suspend,
                identerprise: payload.identerprise
            });

            let { data } = await localAxios.post('/enterprise/suspend',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_DATA_COR)
            router.replace({ path: '/enterprise' })

        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                identerprise: payload.identerprise,
            });

            let { data } = await localAxios.post('/enterprise/activate',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            dispatch(action.LIST_DATA_COR)
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/enterprise' })

        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_ADMIN_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend: payload.reason_suspend,
            });
            let { data } = await localAxios.put('/user/suspend/' + payload.idadmin,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            swal.fire(
                'Success!',
                '',
                'success')
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            router.replace({ path: '/detail-enterprise/' + payload.identerprise })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_ADMIN_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                foo: null,
            });

            let { data } = await localAxios.put('/user/activate/' + payload.idadmin,
            jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            swal.fire(
                'Success!',
                '',
                'success')
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            router.replace({ path: '/detail-enterprise/' + payload.identerprise })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_ADMIN_ENTERPRISE]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('/user/delete/' + payload.idadmin,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ID_CORP, payload.identerprise)
            router.replace({ path: '/detail-enterprise/' + payload.identerprise })
            swal.fire(
                'Success!',
                '',
                'success')
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
};
