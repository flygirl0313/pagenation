import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import { getStore, setStore } from './../util/util'

Vue.use(Vuex)

const state = {
    menuData: null,
    checkReq: {
        109999: "未知错误",
        109001: "参数签名校验错误",
        109002: "参数错误",
        100404: "查询资源不存在",
        100001: "treeId不存在",
        100002: "指定节点是分组，没有值列表",
        100003: "指定的父节点不存在",
        100004: "指定的节点是父节点是指标／标签，不允许创建分组",
        100005: "重复的key",
        100002: "指定节点是分组，没有值列表",
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})