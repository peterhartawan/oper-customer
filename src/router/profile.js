
import Profile from '../views/pages/profile/profile'
import EditProfile from '../views/pages/profile/edit-profile'

import layouts from '../layout'

export default [
    {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                title: 'Profile',
                tags: ['profile']
        },
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit Profile',
            tags: ['profile']
    },
}
]