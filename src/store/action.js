import axios from 'axios'
import {
    SLIDERMENU,
} from './mutation_types.js'
export default {
    update_sildermenu({ commit, state }, payload) {
        commit(SLIDERMENU, payload)
    },
}