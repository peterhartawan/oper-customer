import ListEmployee from '../views/pages/employee/list-employee.vue'
// import EditEmployee from '../views/pages/employee/edit-employee.vue'
import NewEmployee from '../views/pages/employee/new-employee.vue'
import EditEmployee from '../views/pages/employee/edit-employee.vue'
import ListPosition from '../views/pages/employee/list-position.vue'
import NewPosition from '../views/pages/employee/new-position.vue'
import EditPosition from '../views/pages/employee/edit-position.vue'
import AssignTask from '../views/pages/employee/assigntask-employee'
import DetailEmployee from '../views/pages/employee/detail-employee'
import ListInprogress from '../views/pages/employee/listemployee/list-inprogress'
import ListComplete from '../views/pages/employee/listemployee/list-complete'
import DetailList from '../views/pages/employee/listemployee/detail-list'
import ReportingEmployee from '../views/pages/employee/reporting-employee.vue'

import layouts from '../layout'

export default [
    {
        path: '/employee',
        name: 'Employee',
        component: ListEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Employee',
            tags: ['employee']
        },
    },
    {
        path: '/employee/new-employee',
        name: 'NewEmployee',
        component: NewEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New Employee',
            tags: ['employee']
        },
    },
    {
        path: '/employee/list-position',
        name: 'ListPosition',
        component: ListPosition,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Position',
            tags: ['employee']
        },
    },
    {
        path: '/employee/list-position/:id',
        name: 'EditPosition',
        component: EditPosition,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Edit Position',
            tags: ['employee']
        },
    },
    {
        path: '/employee/inprogress',
        name: 'EmployeeInprogress',
        component: ListInprogress,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Employee Inprogress',
            tags: ['employee']
        },
    },
    {
        path: '/employee/complete',
        name: 'EmployeeComplete',
        component: ListComplete,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Employee Complete',
            tags: ['employee']
        },
    },
    {
        path: '/employee/assign-task',
        name: 'AssignTask',
        component: AssignTask,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Assign Task Employee',
            tags: ['employee']
        },
    },
    {
        path: '/employee/list-position/new-position',
        name: 'NewPosition',
        component: NewPosition,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'New Position',
            tags: ['employee']
        },
    },
    {
        path: '/edit-employee/:id',
        name: 'Edit Employee',
        component: EditEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Edit Employee',
            tags: ['employee']
        },
    },
    {
        path: '/detail-employee',
        name: 'DetailEmployee',
        component: DetailEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail-Employee',
            tags: ['employee']
        },
    },
    {
        path: '/detail-task-employee',
        name: 'DetailTaskEmployee',
        component: DetailList,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: true,
            title: 'Detail-Task-Employee',
            tags: ['employee']
        },
    },
    {
        path: '/employee/reporting',
        name: 'Reporting Employee',
        component: ReportingEmployee,
        meta: {
            auth: true,
            layout: layouts.navLeft,
            searchable: false,
            title: 'Reporting Employee',
            tags: ['employee']
        },
    },
    // {
    //     path: '/edit-employee/:id',
    //     name: 'Editemployee',
    //     component: Editemployee,
    //     meta: {
    //         auth: true,
    //         layout: layouts.navLeft,
    //         searchable: false,
    //         title: 'Edit employee',
    //         tags: ['employee']
    //     },
    // },
]