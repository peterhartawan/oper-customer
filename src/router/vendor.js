
import DetailVendor from '../views/pages/vendor/detail-vendor.vue'
import NewVendor from '../views/pages/vendor/new-vendor.vue'
import IndexVendor from '../views/pages/vendor/list-vendor.vue'
import EditVendor from '../views/pages/vendor/edit-vendor.vue'
import EditAdminVendor from '../views/pages/vendor/edit-admin-vendor.vue'
import ListDispathcerV from '../views/pages/dispathcer/dispatcher'
import NewDispathcerV from '../views/pages/dispathcer/new-dispatcher'
import DetailDispathcerV from '../views/pages/dispathcer/detail-dispatcher'
import EditDispathcerV from '../views/pages/dispathcer/edit-dispatcher'
import ListEnterpriseV from '../views/pages/enterprise/list-enterprise'
import ListTemplate from '../views/pages/tasktemplate/template-list'
import NewAdminVendor from '../views/pages/vendor/new-admin-vendor'

import layouts from '../layout'

export default [
        {
            path: '/vendor',
            name: 'IndexVendor',
            component: IndexVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/vendor/create',
            name: 'NewVendor',
            component: NewVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'New Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/detail-vendor/:id',
            name: 'detail-vendor',
            component: DetailVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Detail Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/edit-vendor/:id',
            name: 'edit-vendor',
            component: EditVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Edit Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/edit-admin-vendor/:id',
            name: 'edit-admin-vendor',
            component: EditAdminVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Edit Admin Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/new-admin-vendor/:id',
            name: 'new-admin-vendor',
            component: NewAdminVendor,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'New Admin Vendor',
                tags: ['vendor']
            }
        },
        {
            path: '/dispatcher',
            name: 'dispatcher',
            component: ListDispathcerV,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'List Dispatcher',
                tags: ['Dispatcher']
            }
        },
        {
            path: '/new-dispatcher',
            name: 'new-dispatcher',
            component: NewDispathcerV,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'New Dispatcher',
                tags: ['Dispatcher']
            }
        },
        {
            path: '/detail-dispatcher',
            name: 'detail-dispatcher',
            component: DetailDispathcerV,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Detail Dispatcher',
                tags: ['Dispatcher']
            }
        },
        {
            path: '/edit-dispatcher',
            name: 'edit-dispatcher',
            component: EditDispathcerV,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Edit Dispatcher',
                tags: ['Dispatcher']
            }
        },
        {
            path: '/enterprise/list',
            name: 'enterprise-list-vendor',
            component: ListEnterpriseV,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'List Enterprise',
                tags: ['Enterprise']
            }
        },
        {
            path: '/task-template',
            name: 'task-template',
            component: ListTemplate,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Task-Template',
                tags: ['vendor']
            },
        },
]