import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import swal from 'sweetalert2'
import localAxios from '../../../services/http/client'

export default {
    
    async [action.DATA_ID_ATTENDANCE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let { data } = await localAxios.get( '/attendance/'+payload,
                { headers: {'Authorization': 'Bearer '+token }
                })

            commit(mutation.SET_ATTENDANCE_DETAIL, {
                forAttendance : data.data,
                
            })
            return data.data
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
        }
        catch (err) {
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_ATT_DRIVER]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/attendance/reporting/?type=driver&page='+payload, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
                total   : data.data.total,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_ATT, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.LIST_ATT_EMPLOYEE]({commit, dispatch}, payload) {
        try{
            let token = localStorage.getItem('token')
            let {data} = await localAxios.get('/attendance/reporting/?type=employee&page='+payload, {
                headers: {'Authorization': 'Bearer '+token}
            })
            let objList = {
                dataList : data.data.data,
                total   : data.data.total,
                nextC   : data.data.next_page_url,
                prevC   : data.data.prev_page_url,
                firstP  : data.data.first_page_url,
                fromPA  : data.data.from
            }
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
            commit(mutation.SET_LIST_ATT, objList )
        }catch (err) {
            commit(mutation.SET_LOADING, false);
            commit(mutation.BUTTON_STATUS, false);
            dispatch(action.DATA_ERROR, err)
        }
    },
    async [action.FILTER_EMPLOYEE]({commit, dispatch}, payload) {
        if(payload.radio == 1){
            try{  
                let token = localStorage.getItem('token')
                    let {data} = await localAxios.get('/attendance/reporting/?type=employee&userid='+payload.iduser+(payload.idmonth == 99 ?'&start_date='+payload.today : '&month='+payload.idmonth)+'&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                    }
                    commit(mutation.SET_LOADING, false);
                    commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.radio == null){
            try{  
                let token = localStorage.getItem('token')
            
                    let {data} = await localAxios.get('/attendance/reporting/?type=employee&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                        
                    }
                    commit(mutation.SET_LOADING, false);
                    commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.radio == 2){
            try{  
                let token = localStorage.getItem('token')
            
                    let {data} = await localAxios.get('/attendance/reporting/?type=employee&userid='+payload.iduser+'&start_date='+payload.startdate+'&end_date='+payload.duedate+'&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                        
                    }
                    commit(mutation.SET_LOADING, false);
                    commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }
    },
    async [action.FILTER_DRIVER]({commit, dispatch}, payload) {
        if(payload.radio == 1){
            try{  
                let token = localStorage.getItem('token')
                let {data} = await localAxios.get('/attendance/reporting/?type=driver&userid='+payload.iduser+(payload.idmonth == 99 ?'&start_date='+payload.today : '&month='+payload.idmonth)+'&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                    }
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.radio == null){
            try{  
                let token = localStorage.getItem('token')
            
                    let {data} = await localAxios.get('/attendance/reporting/?type=driver&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                        
                    }
                    commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.SET_LOADING, false);
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }else if(payload.radio == 2){
            try{  
                let token = localStorage.getItem('token')
            
                    let {data} = await localAxios.get('/attendance/reporting/?type=driver&userid='+payload.iduser+'&start_date='+payload.startdate+'&end_date='+payload.duedate+'&page='+payload.page, {
                        headers: {'Authorization': 'Bearer '+token}
                    })
                    let objList = {
                        filterAtt : data.data.data,
                        total   : data.data.total,
                        nextC   : data.data.next_page_url,
                        prevC   : data.data.prev_page_url,
                        firstP  : data.data.first_page_url,
                        fromPA  : data.data.from
                        
                    }
                    commit(mutation.SET_LOADING, false);
                    commit(mutation.BUTTON_STATUS, false);
                commit(mutation.SET_FILTER_ATT, objList )
                
            }catch (err) {
                commit(mutation.BUTTON_STATUS, false);
                dispatch(action.DATA_ERROR, err)
            }
        }
    },
    async [action.EXPORT_ATTENDANCE]({commit, dispatch}, payload) {
        try {
            let token = localStorage.getItem('token');
            let {data} = await localAxios.get('/attendance/reporting/?start_date='+payload.date.startdate+'&end_date='+payload.date.duedate+'&type='+payload.path+'&export=1'+(payload.userid ? '&userid='+payload.userid : ""),
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