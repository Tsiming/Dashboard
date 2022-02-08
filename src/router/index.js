import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/Test.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/test',
        name: "Test",
        component: Test,
    },
     {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/project_manage",
                name: "project_manage",
                meta: {
                    title: '测试管理'
                },
                component: () => import (
                "../views/ProjectManage.vue")
            },
            {
                path: "/template_manage",
                name: "template_manage",
                meta: {
                    title: '模板管理'
                },
                component: () => import (
                "../views/TemplateManage.vue")
            },
            {
                path: "/testcase_manage",
                name: "testcase_manage",
                meta: {
                    title: '测试用例管理'
                },
                component: () => import (
                "../views/TemplateManage.vue")
            },
            {
                path: "/testcase_template_manage",
                name: "testcase_template_manage",
                meta: {
                    title: '测试用例模板'
                },
                component: () => import (
                "../views/TestcaseTemplateManage.vue")
            },
            {
                path: "/sys_project",
                name: "sys_project",
                meta: {
                    title: '系统管理-测试项目'
                },
                component: () => import (
                "../views/SysProject.vue")
            },
            {
                path: "/sys_template",
                name: "sys_template",
                meta: {
                    title: '系统管理-测试模板'
                },
                component: () => import (
                "../views/SysTemplate.vue")
            },
            {
                path: "/sys_testcase",
                name: "sys_testcase",
                meta: {
                    title: '系统管理-测试用例'
                },
                component: () => import (
                "../views/SysTestcase.vue")
            },
            {
                path: "/sys_testcase_template",
                name: "sys_testcase_template",
                meta: {
                    title: '系统管理-测试用例模板'
                },
                component: () => import (
                "../views/SysTestcaseTemplate.vue")
            },
            {
                path: "/sys_contorl_center",
                name: "sys_contorl_center",
                meta: {
                    title: '系统管理-管理中心'
                },
                component: () => import (
                "../views/SysContorlCenter.vue")
            },
            {
                path: "/device_manage",
                name: "device_manage",
                meta: {
                    title: '设备管理'
                },
                component: () => import (
                "../views/DeviceManage.vue")
            },
            {
                path: "/thirdparty_interface_manage",
                name: "thirdparty_interface_manage",
                meta: {
                    title: '第三方接口管理'
                },
                component: () => import (
                "../views/ThirdPartyInterface.vue")
            },
            {
                path: "/user_manage",
                name: "user_manage",
                meta: {
                    title: '用户管理'
                },
                component: () => import (
                "../views/UserManage.vue")
            },
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import (
                /* webpackChunkName: "dashboard" */
                "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import (
                /* webpackChunkName: "table" */
                "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import (
                /* webpackChunkName: "form" */
                "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import (
                /* webpackChunkName: "tabs" */
                "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import (
                /* webpackChunkName: "donate" */
                "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import (
                /* webpackChunkName: "permission" */
                "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import (
                /* webpackChunkName: "i18n" */
                "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import (
                /* webpackChunkName: "upload" */
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import (
                /* webpackChunkName: "icon" */
                "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */
                '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;