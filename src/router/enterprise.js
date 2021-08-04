import List from '../views/pages/enterprise/list-enterprise'
import New from '../views/pages/enterprise/new-enterprise'
import EditC from '../views/pages/enterprise/edit-enterprise'
import EditP from '../views/pages/inspector/edit-inspector'
import EditAd from '../views/pages/enterprise/edit-admin'
import DetailC from '../views/pages/enterprise/detail-enterprise'
import DetailAd from '../views/pages/enterprise/detail-admin'
import PicTaskL from '../views/pages/inspector/pic-task-list-page'
import TemplateL from '../views/pages/tasktemplate/template-list'
import ProfileTemplateList from '../views/pages/tasktemplate/profile-template-list'
import NewTemplate from '../views/pages/tasktemplate/new-template-task'
import EditTamplate from '../views/pages/tasktemplate/edit-template-tasks'
import NewPic from '../views/pages/inspector/new-inspector'
import ListDriverEnterprise from '../views/pages/enterprise/list-driver-enterprise'
import ProfileListDriverEnterprise from '../views/pages/enterprise/profile-list-driver-enterprise'
import AssigneeDriver from '../views/pages/enterprise/assignee-driver'
import Location from '../views/pages/enterprise/location-enterprise'
import ProfileLocation from '../views/pages/enterprise/profile-location-enterprise'
import NewLocation from '../views/pages/enterprise/new-location'
import EditLocation from '../views/pages/enterprise/edit-location-enterprise'
import NewAdminEnterprise  from '../views/pages/enterprise/new-admin-enterprise'
import EditDriverEnterprise from '../views/pages/enterprise/edit-driver-enterprise'

import layouts from '../layout'

export default [
    {
        path: '/enterprise',
        name: 'enterprise',
        component: List,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/new-enterprise',
        name: 'new-enterprise',
        component: New,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New-Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/edit-enterprise/:id',
        name: 'edit-enterprise',
        component: EditC,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit-Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/edit-driver-enterprise/:id',
        name: 'edit-driver-enterprise',
        component: EditDriverEnterprise,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit Driver Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/edit-inspector',
        name: 'edit-inspector',
        component: EditP,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit-Inspector',
            tags: ['inspector']
        },
    },
    {
        path: '/edit-admin',
        name: 'edit-admin',
        component: EditAd,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit-Admin',
            tags: ['enterprise']
        },
    },
    {
        path: '/new-admin-enterprise/:id',
        name: 'new-admin-enterprise',
        component: NewAdminEnterprise,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New-Admin-Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/detail-enterprise/:id',
        name: 'detail-enterprise',
        component: DetailC,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail-Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/detail-admin',
        name: 'detail-admin',
        component: DetailAd,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail-Admin',
            tags: ['enterprise']
        },
    },
    {
        path: '/pic-task-list',
        name: 'pic-task-list',
        component: PicTaskL,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Pic-Task-List',
            tags: ['enterprise']
        },
    },
    {
        path: '/template-list',
        name: 'template-list',
        component: TemplateL,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Template-List',
            tags: ['enterprise']
        },
    },
    {
        path: '/profile-template-list/:id',
        name: 'profile-template-list',
        component: ProfileTemplateList,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Profile Template-List',
            tags: ['enterprise']
        },
    },
    {
        path: '/new-template-task',
        name: 'new-template-task',
        component: NewTemplate,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New-Template-Task',
            tags: ['enterprise']
        },
    },
    {
        path: '/edit-template-task',
        name: 'edit-template-task',
        component: EditTamplate,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit-Template-Task',
            tags: ['enterprise']
        },
    },
    {
        path: '/new-pic',
        name: 'new-pic',
        component: NewPic,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New-Pic',
            tags: ['enterprise']
        },
    },
    {
        path: '/list-driver-enterprise/:id',
        name: 'list-driver-enterprise',
        component: ListDriverEnterprise,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'List Driver Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/profile-list-driver-enterprise/:id',
        name: 'profile-list-driver-enterprise',
        component: ProfileListDriverEnterprise,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Profile List Driver Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/assignee-driver/:id',
        name: 'assignee-driver',
        component: AssigneeDriver,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Assignee Driver Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/location-enterprise/:id',
        name: 'location',
        component: Location,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Location Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/profile-location-enterprise/:id',
        name: 'profile-location',
        component: ProfileLocation,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Profile Location Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/new-location-enterprise',
        name: 'NewLocation',
        component: NewLocation,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'New Location Enterprise',
            tags: ['enterprise']
        },
    },
    {
        path: '/edit-location-enterprise/:id',
        name: 'EditLocation',
        component: EditLocation,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Location Enterprise',
            tags: ['enterprise']
        },
    },
]

