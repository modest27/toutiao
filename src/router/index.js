import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Question from '@/views/Question'
import Video from '@/views/Video'
import My from '@/views/My'
import Search from '@/views/Search'
import Article from '@/views/Article'
import UserProfile from '@/views/user-profile'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/',
        // name: 'layout', //拥有默认子路由的父级的name没有意义
        component: Layout,
        children: [{
            path: '',
            name: 'home',
            component: Home
        }, {
            path: '/question',
            name: 'question',
            component: Question
        }, {
            path: '/video',
            name: 'video',
            component: Video
        }, {
            path: '/my',
            name: 'my',
            component: My
        }, ]
    }, {
        path: '/search',
        name: 'search',
        component: Search
    }, {
        path: '/article/:articleId',
        name: 'article',
        component: Article,
        props: true //开起路由传参,把路由参数映射到组件的props中
    },
    {
        path: '/user/profile',
        name: 'UserProfile',
        component: UserProfile,
    }
]

const router = new VueRouter({
    routes
})

export default router