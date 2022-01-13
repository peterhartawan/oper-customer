import ListDriver from '../views/pages/driver/list-driver.vue'
import EditDriver from '../views/pages/driver/edit-driver.vue'
import NewDriver from '../views/pages/driver/new-driver.vue'
import RequestList from '../views/pages/driver/request-list.vue'
import RequestDriver from '../views/pages/driver/request-driver.vue'
import DetailDriver from '../views/pages/driver/detail-driver.vue'
import ReportingDriver from '../views/pages/driver/reporting-driver.vue'


import layouts from '../layout'

export default [
    {
        path: '/driver',
        name: 'Driver',
        component: ListDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Driver',
            tags: ['driver']
        },
    },
    {
        path: '/driver/new-driver',
        name: 'NewDriver',
        component: NewDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New Driver',
            tags: ['driver']
        },
    },
    {
        path: '/driver/request-list',
        name: 'RequestList',
        component: RequestList,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Request Driver List',
            tags: ['driver']
        }
    },
    {
        path: '/driver/request-driver',
        name: 'RequestDriver',
        component: RequestDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Request Driver',
            tags: ['driver']
        }
    },
    {
        path: '/detail-driver/:id',
        name: 'DetailDriver',
        component: DetailDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Detail Driver',
            tags: ['driver']
        },
    },
    {
        path: '/edit-driver/:id',
        name: 'EditDriver',
        component: EditDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Driver',
            tags: ['driver']
        },
    },
    {
        path: '/order/reporting',
        name: 'ReportingDriver',
        component: ReportingDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Reporting Driver',
            tags: ['driver']
        },
    },
    


]