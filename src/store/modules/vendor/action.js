import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
    async [action.DROPDOWN_VENDOR]({ commit, dispatch }) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/vendor/?dropwdown=1&limit=999', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            let objList = {
                dataList: data.data.data,
            }
            // console.log('masuk k dropdown vendor', objList)
            commit(mutation.SET_DROPDOWN_VENDOR, objList)
        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DATA_ID_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get('/vendor/' + payload,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_VENDOR_DETAIL, {
                forVendor: data.data,

            })
            return data.data
        }
        catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_DATA_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name: payload.name,
                email: payload.email,
                office_phone_number: payload.office_phone_number,
                office_address: payload.office_address,
                pic_name: payload.pic_name,
                pic_mobile_number: payload.pic_mobile_number,
                pic_email: payload.pic_email,
                admin_name: payload.admin_name,
                admin_mobile_number: payload.admin_mobile_number,
                admin_email: payload.admin_email,
            });

            let { data } = await localAxios.post(typeS.vendor,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_VENDOR_RES, {
                vendordata: data.data,

            })
            commit(mutation.BUTTON_STATUS, false)
            router.replace({ path: '/vendor' })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_DATA_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name: payload.name,
                email: payload.email,
                office_phone_number: payload.office_phone_number,
                office_address: payload.office_address,
                pic_name: payload.pic_name,
                pic_mobile_number: payload.pic_mobile_number,
                pic_email: payload.pic_email,
            });

            let { data } = await localAxios.put('/vendor/' + payload.idvendor,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })

            commit(mutation.SET_VENDOR_RES, {
                vendordata: data.data,

            })
            dispatch(action.DATA_ID_VENDOR, payload.idvendor)
            router.replace({ path: '/detail-vendor/' + payload.idvendor })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_DATA_ADMIN]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                name: payload.admin_name,
                email: payload.admin_email,
                phonenumber: payload.admin_phonenumber,
            });

            let { data } = await localAxios.put('/user/' + payload.idadmin,
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                swal.fire(
                    data.message,
                    '',
                    'success')
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.DATA_ID_VENDOR, payload.idvendor)
                router.replace({ path: '/detail-vendor/' + payload.idvendor })
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.NEW_DATA_ADMIN]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                idvendor: payload.idvendor,
                admin_name: payload.admin_name,
                admin_email: payload.admin_email,
                admin_mobile_number: payload.admin_phonenumber,
            });

            let { data } = await localAxios.post('/vendor/admin',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            dispatch(action.DATA_ID_VENDOR, payload.idvendor)
            router.replace({ path: '/detail-vendor/' + payload.idvendor })
            commit(mutation.SET_LOADING, false);
        } catch (err) {
            commit(mutation.SET_LOADING, false);
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_DATA_VEN]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get(
                '/vendor?q=' + payload.vendor_name + '&page=' + payload.page + '&status=' + payload.status, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let objList = {
                dataList: data.data.data,
                totalVendor: data.data.total,
                nextC: data.data.next_page_url,
                prevC: data.data.prev_page_url,
                firstP: data.data.first_page_url,
                fromPA: data.data.from
            };
            commit(mutation.SET_LIST_VEN, objList)
            commit(mutation.SET_LOADING, false)
        } catch (err) {
            commit(mutation.SET_LOADING, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_VENDOR_ID]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('vendor/' + payload, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            commit(mutation.BUTTON_STATUS, false)
            router.replace('/vendor')
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.VENDOR_PROFILE]({ commit, dispatch }) {
        try {
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get('/user/me', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            let objList = {
                idVendor: data.data.vendor_idvendor,
            }
            let entID = {
                idEnterprise: data.data.enterprise.identerprise,
            }
            commit(mutation.SET_PROFILE_VENDOR, objList)
            commit(mutation.SET_ENTERPRISE_ID, entID)
        } catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                idvendor: payload,
            });

            let { data } = await localAxios.put('/vendor/activate/',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            dispatch(action.LIST_DATA_VEN)
            router.replace({ path: '/vendor' })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                reason_suspend: payload.reason_suspend,
                idvendor: payload.idvendor,
            });

            let { data } = await localAxios.post('/vendor/suspend',
                jsonData,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            dispatch(action.LIST_DATA_VEN)
            router.replace({ path: '/vendor' })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.SUSPEND_ADMIN]({ commit, dispatch }, payload) {
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
            dispatch(action.DATA_ID_VENDOR, payload.idvendor)
            router.replace({ path: '/detail-vendor/' + payload.idvendor })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.ACTIVATE_ADMIN_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                idvendor: payload,
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
            dispatch(action.DATA_ID_VENDOR, payload.idvendor)
            router.replace({ path: '/detail-vendor/' + payload.idvendor })
            commit(mutation.BUTTON_STATUS, false)
        } catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message, '', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_ADMIN_VENDOR]({ commit, dispatch }, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('/user/delete/' + payload.idadmin,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                commit(mutation.BUTTON_STATUS, false)
                dispatch(action.DATA_ID_VENDOR, payload.idvendor)
                router.replace({ path: '/detail-vendor/' + payload.idvendor })
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