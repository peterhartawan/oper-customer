import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'

export default {
async [action.LIST_LOCATION]({commit, dispatch}, payload) {
    try{
        let token = localStorage.getItem('token')
        let {data} = await localAxios.get('/places/?identerprise='+payload.identerprise+'&page='+payload.page+(payload.q ? '&q='+payload.q : ''), {
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
        commit(mutation.SET_LOCATION_LIST , objList )
    
    }catch (err) {
        dispatch(action.DATA_ERROR, err)
    }
},
async [action.DROPDOWN_LOCATION]({commit, dispatch}, payload) {
    try{
        let token           = localStorage.getItem('token')
        let userProfile     = JSON.parse(localStorage.getItem('user')).client_enterprise_identerprise
        let {data} = await localAxios.get('/places/?identerprise='+userProfile+'&dropdown=1', {
            headers: {'Authorization': 'Bearer '+token}
        })
        return data.data.data
    }catch (err) {
            dispatch(action.DATA_ERROR, err)
     }
    },
async [action.CREATE_DATA_LOCATION]({commit, dispatch}, payload) {
    try{
        let token = localStorage.getItem('token');
        const jsonData = JSON.stringify({
            name                : payload.name,
            address             : payload.address,
            latitude            : payload.latitude,
            longitude           : payload.longitude,
            identerprise        : payload.identerprise,
        });

        let { data } = await localAxios.post('/places',
            jsonData,
            { headers: {'Authorization': 'Bearer '+token }
            })
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_LOCATION, payload)
        router.push({ path: '/location-enterprise/' +payload.identerprise})
    }catch(err){
        commit(mutation.BUTTON_STATUS, false)
        swal(err.response.data.message,'', 'error')
        dispatch(action.DATA_ERROR, err)
    }
},
async [action.DETAIL_LOCATION]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/places/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_LOCATION_DETAIL, {
                data : data,
                
            })
            commit(mutation.BUTTON_STATUS, false)
            router.push({ path: '/edit-location-enterprise/'+payload})
            return data
            
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
async [action.UPDATE_DATA_LOCATION]({commit, dispatch}, payload) {
    try{
        let token = localStorage.getItem('token');
        const jsonData = JSON.stringify({
            name                : payload.name,
            address             : payload.address,
            latitude            : payload.latitude,
            longitude           : payload.longitude,
            identerprise        : payload.identerprise,
        });

        let { data } = await localAxios.put('/places/'+payload.idplaces,
            jsonData,
            { headers: {'Authorization': 'Bearer '+token }
            })
        dispatch(action.LIST_LOCATION, payload)
        commit(mutation.BUTTON_STATUS, false)
        router.push({ path: '/location-enterprise/'+payload})
    }catch(err){
        commit(mutation.BUTTON_STATUS, false)
        swal(err.response.data.message,'', 'error')
        dispatch(action.DATA_ERROR, err)
    }
},
    async [action.DELETE_LOCATION]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete('places/'+payload.idplaces,{
                    headers: {
                        'Authorization'     : 'Bearer '+token
                    }
                })
                commit(mutation.BUTTON_STATUS, false)
            dispatch(action.LIST_LOCATION, payload)
            router.push('/location-enterprise/'+payload.identerprise)
        }catch (err) {
        commit(mutation.BUTTON_STATUS, false)
        swal(err.response.data.message,'', 'error')
        dispatch(action.DATA_ERROR, err)

        }
    },

};