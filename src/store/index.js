import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        //一个对象，用来存储用户登录的信息（包括Token等数据）
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getItem(TOKEN_KEY)
    },
    mutations: {
        setUser(state, data) {
            state.user = data
                //为了防止数据刷新丢失，需要把数据备份到本地存储
                // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})