import localAxios from '../../../services/http/client'
// import googleAxios from '../../../services/google/firebase'
// import logins from '../../../assets/data/login_status'
import router from '../../../router'
import * as action from '../../action-types'
import * as mutation from '../../mutation-types'
import { setLStorage } from '../../../utils/manageLocalStorage'
import * as typeS from '../../../services/path_service'

const state = {
    idToken: null,
};

const getters = {

};

const actions = {
    [action.SET_LOGOUT_TIMER]({commit}, expirationTime){
            setTimeout(()=> {
                commit('setLogout');
                router.push('login')
            }, expirationTime)    
    },
    async [action.LOGIN]({ commit, dispatch }, authData) {
        try {
            let   domainLocal = (window.location.hostname === 'localhost') ? process.env.VUE_APP_DOMAIN : `${window.location.protocol}//${window.location.hostname}`
            const jsonData = JSON.stringify({
                grant_type : "password",
                client_id : process.env.VUE_APP_ID,
                client_secret : process.env.VUE_APP_SECRET,
                username: authData.email,
                password: authData.password,
                scope: "*",
                domain : domainLocal
            });
            let { data } = await localAxios.post(typeS.login, jsonData);
            let token =  data.data.access_token;
            commit(mutation.AUTH_USER, {
                token
            });
            let role = await localAxios.get(typeS.role_access,{
                headers: {'Authorization': 'Bearer '+token}
            })
            let userProfile = await localAxios.get(typeS.user_profile,{
                headers: {'Authorization': 'Bearer '+token}
            })
            const now = new Date();
            const expirationDate = new Date(now.getTime() + data.data.expires_in);
            localStorage.setItem('expirationDate', expirationDate)
            // localStorage.setItem('token', token);
            localStorage.setItem('email', authData.email);
            localStorage.setItem('token', token)
            localStorage.setItem('rules', JSON.stringify(role.data.data));
            localStorage.setItem('user', JSON.stringify(userProfile.data.data));
            commit('setLogin', data.status);
            commit(mutation.BUTTON_STATUS, false)
            if (data.status){
                router.push('dashboard')
            }
            dispatch(action.SET_LOGOUT_TIMER, data.data.expires_in)
        }
        catch (err) {
            commit(mutation.BUTTON_STATUS, false)
            dispatch(action.DATA_ERROR, err)
        }
    },
    [action.AUTO_LOGIN]({commit}) {
        const token = localStorage.getItem('token');
        let tokenCon =  token != null
        if(!token){
            return
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if(now >= expirationDate){
            return
        }
        let firstPath = router.currentRoute.path;
        let fPath = firstPath.split("/")[1];
        if(fPath === 'activation-email') {
            return
        }
        if(fPath === 'reset-password') {
            return
        }
        if(fPath === 'create-password') {
            return
        }
        commit(mutation.AUTH_USER, {token : token });
        commit('setLogin', tokenCon);
        router.push('dashboard')
    },
    async [action.LOGOUT]({commit, dispatch}){
        try {
            const token = localStorage.getItem('token');
            const AuthStr = 'Bearer ' + token.trim();
            let logoutUser = await localAxios.get(typeS.logout, { headers: { Authorization: AuthStr}});
            commit(mutation.CLEAR_AUTH_DATA);
            commit(mutation.CLEAR_NOTIF);
            commit(mutation.SET_CLEAR_GRAFIK);
            localStorage.clear();
        }
        catch(err){
            dispatch(action.DATA_ERROR, err)
        }
    }
};

const mutations = {
    [mutation.AUTH_USER](state, userData) {
        state.idToken = userData.token
    },
    [mutation.CLEAR_AUTH_DATA](state) {
        state.idToken = null
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}