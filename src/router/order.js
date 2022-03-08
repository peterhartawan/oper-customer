import COrder from '../views/pages/order-client/order'
import ListOrder from '../views/pages/order-client/list-order'

import layouts from '../layout'

export default {
    path: '/order',
    name: 'order',
    component: COrder,
    meta: {
        auth: true,
        layout: layouts.navLeft
    },
    children: [
        {
            path: 'inprogress',
            name: 'inprogress',
            component: ListOrder,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Inprogress Order',
                tags: ['editor']
            }
        },
        {
            path: 'complete',
            name: 'complete',
            component: ListOrder,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Complete Order',
                tags: ['editor']
            }
        },
    ]
}

