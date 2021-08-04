import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home/index';
import login from './modules/users/login';
import error from './modules/error/index';
import forgotPassword from './modules/users/forgot-password';
import corporate from './modules/enterprise/index'
import vendor from './modules/vendor/index'
import attendance from './modules/attendance/index'
import driver from './modules/driver/index'
import location from './modules/location/index'
import pictask from './modules/inspector'
import tasktemplate from './modules/tasktemplate'
import dispatcher from './modules/dispatcher'
import orderclient from './modules/order-client'
import vehicle  from './modules/vehicle'
import profile from './modules/profile'
import helper from './modules/helper'
import dashboard from './modules/dashboard'
import tracking from './modules/tracking'
import employee from './modules/employee'
import faq from './modules/faq'
import notif from './modules/notif'
import linkActivation from './modules/linkactivation'

Vue.use(Vuex);

export default  new Vuex.Store({
    modules: {
        home,
        login,
        error,
        forgotPassword,
        vendor,
        attendance,
        corporate,
        driver,
        pictask,
        tasktemplate,
        dispatcher,
        orderclient,
        location,
        vehicle,
        profile,
        helper,
        dashboard,
        tracking,
        employee,
        faq,
        notif,
        linkActivation
    }
})