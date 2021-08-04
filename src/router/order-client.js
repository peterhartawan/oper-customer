import DetailOrder from '../views/pages/order-client/detail-order'
import NewOrder from '../views/pages/order-client/new-order'
import EditOrder from '../views/pages/order-client/edit-order'
import ListOrder from '../views/pages/order-client/list-assign-order'
import DetailOrderP from '../views/pages/order-client/detail-order-page'
import TrackingOrder from '../views/pages/tracking/tracking'
import BulkOrder from '../views/pages/order-client/bulk-order'

import layouts from '../layout'

export default [
    {
        path: '/detail-order',
        name: 'detail-order',
        component: DetailOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail-Order',
            tags: ['Order']
        },
    },
    {
        path: '/order/create',
        name: 'order-create',
        component: NewOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Create-Order',
            tags: ['Order']
        },
    },
    {
        path: '/edit-order',
        name: 'edit-order',
        component: EditOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit-Order',
            tags: ['Order']
        },
    },
    {
        path: '/order/open',
        name: 'order-open',
        component: ListOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'List-Order',
            tags: ['Order']
        },
    },
    {
        path: '/order/bulk',
        name: 'order-bulk',
        component: BulkOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Bulk-Order',
            tags: ['Order']
        },
    },
    {
        path: '/order/detail',
        name: 'order-detail-P',
        component: DetailOrderP,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Order Detail',
            tags: ['Order']
        },
    },
    {
        path: '/order/tracking',
        name: 'order-tracking',
        component: TrackingOrder,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Order Tracking',
            tags: ['Order']
        },
    },
]