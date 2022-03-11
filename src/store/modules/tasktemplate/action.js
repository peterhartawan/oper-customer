import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import localAxios from '../../../services/http/client'
import swal from 'sweetalert2'
import * as typeS from '../../../services/path_service'
import router from '../../../router'




export default {

    async [action.TEMPLATE_LIST]({commit, dispatch}, payload) {
        try{
            let User = JSON.parse(localStorage.getItem('user'));
            let Url = '';
            (User.idrole === 2) ? Url = `${typeS.tasktemplate_page}${payload.page}&idvendor=${User.vendor.idvendor}` : Url = `${typeS.tasktemplate_page}${payload.page}&identerprise=${payload.id}`;
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(Url, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE  : data.data.total
            }
            commit(mutation.SET_TEMPLATE_LIST, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DROPDOWN_TEMPLATE]({commit, dispatch}, payload) {
        try{
            let User = JSON.parse(localStorage.getItem('user'));
            let Url = '';
            if(User.idrole === 2) {
                Url = `${typeS.tasktemplate}?idvendor=${User.vendor.idvendor}&dropdown=1`
            } else {
                Url = `${typeS.tasktemplate}?identerprise=${payload.id}&dropdown=1`
            }
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(Url, {
                headers: {'Authorization': 'Bearer '+token}
            });
            let objList = {
                dataList : data.data.data,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from,
                totalPE  : data.data.total
            }
            commit(mutation.SET_TEMPLATE_LIST, objList )
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.CREATE_TEMPLATE_TASK]({commit, dispatch}, payloads) {
        try{
            let token = localStorage.getItem('token');
            let i, len = payloads.tasks, picolo = []
            for(i = 0; i < len.length; i++){
                picolo.push({
                    name                            : len[i].name,
                    description                     : len[i].task_description,
                    location_name                   : len[i].location_name,
                    latitude                        : len[i].lat.toString(),
                    longitude                       : len[i].long.toString(),
                    is_required                     : len[i].is_required,
                    is_need_photo                   : len[i].is_need_photo,
                    is_need_inspector_validation    : len[i].is_need_inspector_validation
                })
            }
            let  jsonData = '';
            let  idvendor = JSON.parse(localStorage.getItem('user'));
            if(idvendor.idrole === 2) {
                   jsonData = JSON.stringify({
                       template_name           : payloads.name,
                       template_description    : payloads.description,
                       vendor_idvendor         : idvendor.vendor.idvendor,
                       tasks                   : picolo
                   });
            }else {
                jsonData = JSON.stringify({
                    template_name           : payloads.name,
                    template_description    : payloads.description,
                    identerprise            : payloads.identerprise,
                    tasks                   : picolo
                });
            }
            let { data } = await localAxios.post(typeS.tasktemplate,
                jsonData, {
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            })
            commit(mutation.BUTTON_STATUS, false)
            router.push('/template-list')

        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.TEMPLATE_ID]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let { data } = await localAxios.get(typeS.tasktemplate +'/'+ payload, {
                headers: {'Authorization': 'Bearer '+token}
            })

            commit(mutation.SET_TEMPLATE_ID, data.data)
            return data.data
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.UPDATE_TEMPLATE]({commit, dispatch}, payloads) {
        try {

            let i, len = payloads.tasks, picolo = [], token = localStorage.getItem('token');
            for(i = 0; i < len.length; i++){
                picolo.push({
                    name                            : len[i].name,
                    description                     : len[i].task_description,
                    location_name                   : len[i].location_name,
                    latitude                        : len[i].lat.toString(),
                    longitude                       : len[i].long.toString(),
                    is_required                     : len[i].is_required,
                    is_need_photo                   : len[i].is_need_photo,
                    is_need_inspector_validation    : len[i].is_need_inspector_validation
                })
            }

            let  jsonData = '';
            let  idvendor = JSON.parse(localStorage.getItem('user'))
            if(idvendor.idrole === 2) {
                jsonData = JSON.stringify({
                    template_name           : payloads.name,
                    template_description    : payloads.description,
                    vendor_idvendor         : idvendor.vendor.idvendor,
                    tasks                   : picolo
                });
            }else {
                jsonData = JSON.stringify({
                    template_name           : payloads.name,
                    template_description    : payloads.description,
                    identerprise            : payloads.identerprise,
                    tasks                   : picolo
                });
            }

            let { data } = await localAxios.put(typeS.tasktemplate +'/'+payloads.idtemplate,
                jsonData, {
                headers: {
                    'Authorization'     : 'Bearer '+token
                }
            })
            commit(mutation.SET_ID_ENTERPRISE, payloads.identerprise);
            commit(mutation.BUTTON_STATUS, false);
            router.push('/template-list')
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false);
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.DELETE_TEMPLATE]({commit, dispatch}, payload) {
        try {

            let token = localStorage.getItem('token');
            let { data } = await localAxios.delete(typeS.tasktemplate +'/' + payload.idList,{
                    headers: {
                        'Authorization'     : 'Bearer '+token
                    }
                });
            let obj = {
                id : payload.id,
                page: payload.currPage
            };
            dispatch(action.TEMPLATE_LIST, obj)
        }catch (err) {
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.TEMPLATE_REPORTING]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                daterange           : payload.startdate +'-'+ payload.duedate,
                type_report          : payload.type,
            });
    
            let { data } = await localAxios.post('/template/template-report',
                jsonData,
                { headers: {'Authorization': 'Bearer '+token }
                })
                commit(mutation.SET_TEMPLATE_REPORT, data.data )
                commit(mutation.BUTTON_STATUS, false)
        }catch(err){
            commit(mutation.BUTTON_STATUS, false)
            swal(err.response.data.message,'', 'error')
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.EXPORT_ORDER_TEMPLATE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            const jsonData = JSON.stringify({
                daterange           : payload.startdate +'-'+ payload.duedate,
                idtemplate          : payload.idtemplate,
            });
            let {data} = await localAxios.post('/'+payload.type+'/reporting',
            jsonData,
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
};
