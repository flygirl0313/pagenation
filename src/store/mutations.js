import {
    SLIDERMENU,
} from './mutation_types.js'

export default {
    // 更新导航信息
    [SLIDERMENU](state, payload) {
        state.menuData = payload.menuData;
    },
}