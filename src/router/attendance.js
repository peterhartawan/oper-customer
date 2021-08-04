
import AttendanceDriver from '../views/pages/attendance/list-attendance-driver.vue'
import AttendanceEmployee from '../views/pages/attendance/list-attendance-employee.vue'
import DetailDriver from '../views/pages/attendance/detail-attendance-driver.vue'
import DetailEmployee from '../views/pages/attendance/detail-attendance-employee.vue'
import TrackingAttendance from '../views/pages/tracking/tracking'

import layouts from '../layout'

export default [
    {
            path: '/attendance/driver',
            name: 'Attendance Driver',
            component: AttendanceDriver,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Attendance Driver',
                tags: ['attendance']
        },
    },
    {
        path: '/detail-attendance-driver/:id',
        name: 'detail-attendance-driver',
        component: DetailDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail Attendance Driver',
            tags: ['attendance']
        },
    },
    {
        path: '/detail-attendance-employee/:id',
        name: 'detail-attendance-employee',
        component: DetailEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail Attendance Employee',
            tags: ['attendance']
        },
    },
    {
        path: '/order/attendance',
        name: 'attendance-tracking',
        component: TrackingAttendance,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Attendance Tracking',
            tags: ['attendance']
        },
    },
    {
        path: '/attendance/employee',
        name: 'attendance-employee',
        component: AttendanceEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Attendance Employee',
            tags: ['attendance']
    },
},
]