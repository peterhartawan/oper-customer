//users/login
export const SET_LOGOUT_TIMER       = 'users/login/SET_LOGOUT_TIMER';
export const LOGIN                  = 'users/login/LOGIN';
export const AUTO_LOGIN             = 'users/login/AUTO_LOGIN';
export const LOGOUT                 = 'users/login/LOGOUT';

//users/forgot-password
export const SEND_EMAIL             = 'users/forgot-password/SEND_EMAIL';
export const CHANGE_PASSWORD        = 'users/forgot-password/CHANGE_PASSWORD';
export const CHANGES_PASSWORD       = 'users/forgot-password/CHANGES_PASSWORD';

//error/index
export const DATA_ERROR             = 'error/index/DATA_ERROR';
export const USER_ME_ERROR          = 'error/index/USER_ME_ERROR';

//attendance
export const LIST_ATT_DRIVER        = 'attendance/index/LIST_ATT_DRIVER';
export const LIST_ATT_EMPLOYEE      = 'attendance/index/LIST_ATT_EMPLOYEE';
export const FILTER_DRIVER          = 'attendance/index/FILTER_DRIVER';
export const FILTER_EMPLOYEE        = 'attendance/index/FILTER_EMPLOYEE';
export const DATA_ID_ATTENDANCE     = 'attendance/index/DATA_ID_ATTENDANCE';
export const EXPORT_ATTENDANCE          = 'attendance/index/EXPORT_ATTENDANCE';
export const CANCEL_TASK            = 'attendance/index/CANCEL_TASK';
export const TOTAL_ACCOUNT_DRIVER   = 'dispatcher/index/TOTAL_ACCOUNT_DRIVER';

//vendor
export const VENDOR_PROFILE         = 'vendor/index/VENDOR_PROFILE';
export const LIST_DATA_VEN          = 'vendor/index/LIST_DATA_VEN';
export const DATA_ID_VENDOR         = 'vendor/index/DATA_ID_VENDOR';
export const CREATE_DATA_VENDOR     = 'vendor/index/CREATE_DATA_VENDOR';
export const DROPDOWN_VENDOR        = 'vendor/index/DROPDOWN_VENDOR';
export const UPDATE_DATA_VENDOR     = 'vendor/index/UPDATE_DATA_VENDOR';
export const UPDATE_DATA_ADMIN      = 'vendor/index/UPDATE_DATA_ADMIN';
export const NEW_DATA_ADMIN         = 'vendor/index/NEW_DATA_ADMIN';
export const DELETE_VENDOR_ID       = 'vendor/index/DELETE_VENDOR_ID';
export const SUSPEND_ADMIN          = 'vendor/index/SUSPEND_ADMIN';
export const SUSPEND_VENDOR         = 'vendor/index/SUSPEND_VENDOR';
export const ACTIVATE_VENDOR        = 'vendor/index/ACTIVATE_VENDOR'
export const ACTIVATE_ADMIN_VENDOR  = 'vendor/index/ACTIVATE_ADMIN_VENDOR';
export const DELETE_ADMIN_VENDOR    = 'vendor/index/DELETE_ADMIN_VENDOR';

//driver
export const CREATE_DATA_DRIVER     = 'driver/index/CREATE_DATA_DRIVER';
export const UPDATE_DATA_DRIVER     = 'driver/index/UPDATE_DATA_DRIVER';
export const DELETE_DRIVER          = 'driver/index/DELETE_DRIVER';
export const ACTIVATE_DRIVER        = 'driver/index/ACTIVATE_DRIVER';
export const LIST_DATA_DRIVER       = 'driver/index/LIST_DATA_DRIVER';
export const DROPDOWN_DRIVER        = 'driver/index/DROPDOWN_DRIVER';
export const DROPDOWN_D_ASSIGNEE    = 'driver/index/DROPDOWN_D_ASSIGNEE';
export const DROPDOWN_D_AVAILABLE   = 'driver/index/DROPDOWN_D_AVAILABLE';
export const DRIVER_TYPE            = 'driver/index/DRIVER_TYPE';
export const DATA_ID_DRIVER         = 'driver/index/DATA_ID_DRIVER';
export const EDIT_DRIVER_ENTERPRISE = 'driver/index/EDIT_DRIVER_ENTERPRISE';
export const EDIT_DRIVER            = 'driver/index/EDIT_DRIVER';
export const LIST_DRIVER_ASSIGNEE   = 'driver/index/LIST_DRIVER_ASSIGNEE';
export const LIST_DRIVER_ENTERPRISE = 'driver/index/LIST_DRIVER_ENTERPRISE';
export const ASSIGN_DRIVER          = 'driver/index/ASSIGN_DRIVER';
export const SUSPEND_DRIVER         = 'driver/index/SUSPEND_DRIVER';
export const RESEND_PIN             = 'driver/index/RESEND_PIN';
export const LIST_REQ_DRIVER        = 'driver/index/LIST_REQ_DRIVER';
export const CREATE_REQ_DRIVER      = 'driver/index/CREATE_REQ_DRIVER';

//enterprise/index
export const LIST_DATA_COR          = 'enterprise/index/LIST_DATA_COR';
export const CREATE_DATA_CORP       = 'enterprise/index/CREATE_DATA_CORP';
export const DATA_ID_CORP           = 'enterprise/index/DATA_ID_CORP';
export const UPDATE_CORP            = 'enterprise/index/UPDATE_CORP';
export const DELETE_CORP_ID         = 'enterprise/index/DELETE_CORP_ID';
export const UPDATE_ADMIN_CLIENT    = 'enterprise/index/UPDATE_ADMIN_CLIENT';
export const ACTIVATE_ENTERPRISE    = 'enterprise/index/ACTIVATE_ENTERPRISE'
export const SUSPEND_ENTERPRISE     = 'enterprise/index/SUSPEND_ENTERPRISE'
export const NEW_ADMIN_ENTERPRISE  = 'enterprise/index/NEW_ADMIN_ENTERPRISE'
export const ACTIVATE_ADMIN_ENTERPRISE = 'enterprise/index/ACTIVATE_ADMIN_ENTERPRISE'
export const DELETE_ADMIN_ENTERPRISE = 'enterprise/index/DELETE_ADMIN_ENTERPRISE'
export const SUSPEND_ADMIN_ENTERPRISE = 'enterprise/index/SUSPEND_ADMIN_ENTERPRISE'


//inspector/index
export const PICTASK_LIST           = 'inspector/index/PICTASK_LIST';
export const CREATE_PIC_TASK        = 'inspector/index/CREATE_PIC_TASK';
export const DELETE_INSPECTOR       = 'inspector/index/DELETE_INSPECTOR';
export const UPDATE_INSPECTOR       = 'inspector/index/UPDATE_INSPECTOR';
export const ID_INSPECTOR           = 'inspector/index/ID_INSPECTOR';

//tasktemplate/index
export const TEMPLATE_LIST          = 'tasktemplate/index/TEMPLATE_LIST';
export const CREATE_TEMPLATE_TASK   = 'tasktemplate/index/CREATE_TEMPLATE_TASK';
export const TEMPLATE_ID            = 'tasktemplate/index/TEMPLATE_ID';
export const UPDATE_TEMPLATE        = 'tasktemplate/index/UPDATE_TEMPLATE';
export const DELETE_TEMPLATE        = 'tasktemplate/index/DELETE_TEMPLATE';
export const DROPDOWN_TEMPLATE      = 'tasktemplate/index/DROPDOWN_TEMPLATE';
export const EXPORT_ORDER_TEMPLATE  = 'tasktemplate/index/EXPORT_ORDER_TEMPLATE';
export const TEMPLATE_REPORTING     = 'tasktemplate/index/TEMPLATE_REPORTING';

//dispatcher/index
export const LIST_DISPATCHER        = 'dispatcher/index/LIST_DISPATCHER';
export const LIST_DISPATCHER_ROLE   = 'dispatcher/index/LIST_DISPATCHER_ROLE';
export const CREATE_DISPATCHER      = 'dispatcher/index/CREATE_DISPATCHER';
export const DATA_ID_DISPATCHER     = 'dispatcher/index/DATA_ID_DISPATCHER';
export const DELETE_DISPATCHER      = 'dispatcher/index/DELETE_DISPATCHER';
export const UPDATE_DISPATCHER      = 'dispatcher/index/UPDATE_DISPATCHER';
export const SEARCH_DISPATCHER      = 'dispatcher/index/SEARCH_DISPATCHER';
export const ASSIGN_TO_ENTERPRISE   = 'enterprise/index/ASSIGN_TO_ENTERPRISE';
export const MULTI_TO_ENTERPRISE   = 'enterprise/index/MULTI_TO_ENTERPRISE';
export const ACTIVATE_DISPATCHER    = 'dispatcher/index/ACTIVATE_DISPATCHER';
export const SUSPEND_DISPATCHER     = 'dispatcher/index/SUSPEND_DISPATCHER';
export const TOTAL_ACCOUNT_DISPATCHER= 'dispatcher/index/TOTAL_ACCOUNT_DISPATCHER';
export const DISPATCHER_AVAILABLE   = 'dispatcher/index/DISPATCHER_AVAILABLE';
export const MULTI_DISPATCHER_AVAILABLE   = 'dispatcher/index/MULTI_DISPATCHER_AVAILABLE';

//order-client/index
export const LIST_ORDER_CLIENT      = 'order-client/index/LIST_ORDER_CLIENT'
export const ID_ORDER_CLIENT        = 'order-client/index/ID_ORDER_CLIENT'
export const CREATE_ORDER_CLIENT    = 'order-client/index/CREATE_ORDER_CLIENT'
export const ASSIGN_ORDER_CLIENT    = 'order-client/index/ASSIGN_ORDER_CLIENT'
export const UPDATE_ORDER_CLIENT    = 'order-client/index/UPDATE_ADMIN_CLIENT'
export const EXPORT_ORDER_LIST      = 'order-client/index/EXPORT_ORDER_LIST'
export const DOWNLOAD_BULK_ORDER    = 'order-client/index/DOWNLOAD_BULK_ORDER';
export const UPLOAD_BULK_ORDER      = 'order-client/index/UPLOAD_BULK_ORDER';
export const CANCEL_ORDER           = 'order-client/index/CANCEL_ORDER';
export const TOTAL_ORDER_LIST       = 'order-client/index/TOTAL_ORDER_LIST';
export const ORDER_GRAPHIC_BAR      = 'order-client/index/ORDER_GRAPHIC_BAR';

//location CREATE_DATA_LOCATION
export const LIST_LOCATION          = 'location/index/LIST_LOCATION';
export const CREATE_DATA_LOCATION   = 'location/index/CREATE_DATA_LOCATION';''
export const DETAIL_LOCATION        = 'location/index/DETAIL_LOCATION';
export const UPDATE_DATA_LOCATION   = 'location/index/UPDATE_DATA_LOCATION';
export const DELETE_LOCATION        = 'location/index/DELETE_LOCATION';
export const DROPDOWN_LOCATION      = 'location/index/DROPDOWN_LOCATION';
export const ASSIGNEE_LOCATION      = 'location/index/ASSIGNEE_LOCATION';

//vehicle/index
export const VEHICLE_BRAND          = 'location/index/VEHICLE_BRAND';
export const VEHICLE_TYPE           = 'location/index/VEHICLE_TYPE';

//profile
export const DATA_PROFILE           = 'profile/index/DATA_PROFILE'
export const EDIT_PROFILE_ADMIN     = 'profile/index/EDIT_PROFILE_ADMIN'
export const UPDATE_PROFILE_ADMIN   = 'profile/index/UPDATE_PROFILE_ADMIN'

//helper
export const DATA_TOC               = 'helper/index/DATA_TOC'
export const DATA_PRIVACY           = 'helper/index/DATA_PRIVACY'
export const LIST_PAGES             = 'helper/index/LIST_PAGES'
export const DETAIL_PAGES           = 'helper/index/DETAIL_PAGES'
export const UPDATE_PAGES           = 'helper/index/UPDATE_PAGES'
export const DATA_CUSTOMER          = 'helper/index/DATA_CUSTOMER'
export const DATA_CONTENT           = 'helper/index/DATA_CONTENT'

//dashboard
export const LIST_DASHBOARD         = 'dashboard/index/LIST_DASHBOARD'
export const GRAFIK_DASHBOARD       = 'dashboard/index/GRAFIK_DASHBOARD'
//tracking
export const TRACKING               = 'order-client/index/TRACKING'
export const TRACKING_ATTENDANCE    = 'tracking/index/TRACKING_ATTENDANCE'

//employee
export const LIST_EMPLOYEE          = 'employee/index/LIST_EMPLOYEE'
export const LIST_EMPLOYEE_TASK     = 'employee/index/LIST_EMPLOYEE_TASK'
export const EMPLOYEE_TASK_ID       = 'employee/index/EMPLOYEE_TASK_ID'
export const CREATE_DATA_EMPLOYEE   = 'employee/index/CREATE_DATA_EMPLOYEE'
export const LIST_POSITION          = 'employee/index/LIST_POSITION'
export const CREATE_POSITION        = 'employee/index/CREATE_POSITION'
export const DETAIL_EMPLOYEE        = 'employee/index/DETAIL_EMPLOYEE'
export const UPDATE_EMPLOYEE        = 'employee/index/UPDATE_EMPLOYEE'
export const DROPDOWN_POSITION      = 'employee/index/DROPDOWN_POSITION'
export const DROPDOWN_EMPLOYEE      = 'employee/index/DROPDOWN_EMPLOYEE'
export const DETAIL_POSITION        = 'employee/index/DETAIL_POSITION'
export const UPDATE_POSITION        = 'employee/index/UPDATE_POSITION'
export const DELETE_POSITION        = 'employee/index/DELETE_POSITION'
export const ASSIGN_EMPLOYEE_TASK   = 'employee/index/ASSIGN_EMPLOYEE_TASK'
export const SET_DROPDOWN_EMPLOYEE  = 'employee/index/SET_DROPDOWN_EMPLOYEE'
export const SUSPEND_EMPLOYEE       = 'employee/index/SUSPEND_EMPLOYEE'
export const DELETE_EMPLOYEE        = 'employee/index/DELETE_EMPLOYEE'
export const ACTIVATE_EMPLOYEE      = 'employee/index/ACTIVATE_EMPLOYEE'
export const ACCOUNT_EMPLOYEE       = 'employee/index/ACCOUNT_EMPLOYEE' 

//faq
export const LIST_FAQ               = 'faq/index/LIST_FAQ'
export const CREATE_FAQ             = 'faq/index/CREATE_FAQ'
export const DETAIL_FAQ             = 'faq/index/DETAIL_FAQ'
export const UPDATE_FAQ             = 'faq/index/UPDATE_FAQ'
export const DELETE_FAQ             = 'faq/index/DELETE_FAQ'

//notif
export const NOTIFICATION           = 'notif/index/NOTIFICATION';
export const MARK_AS_READ           = 'notif/index/MARK_AS_READ';

//linkactivation
export const RESEND_LINK_ACTIVATION = 'linkactivation/index/RESEND_LINK_ACTIVATION'