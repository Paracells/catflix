import {db} from "../../config";
import {database} from "../../utils";
import mutations from '../../utils/mutation-types'

const {SET_ERROR, SET_USERDATA, DELETE_USER} = mutations

const user = {
    namespaced: true,
    state: {
        userData: '',
        error: {},
        logged: ''
    },
    getters: {
        getError: (state) => state.error,
        getUserName: (state) => state.userData.name,
        getUser: () => JSON.parse(localStorage.getItem('user'))

    },
    mutations: {
        [SET_ERROR](state, payload) {
            state.error = {status: payload.status, text: payload.text}
        },
        [SET_USERDATA](state, payload) {
            localStorage.setItem('user', JSON.stringify(payload))
            state.userData = payload
        },
        [DELETE_USER](state) {
            state.userData = {}
            localStorage.removeItem('user')
        }
    },
    actions: {
        async saveUser({commit, dispatch}, values) {
            if (!(await dispatch("checkIfExists", values.email))) {
                await db.collection(database).doc(values.email)
                    .set({
                        name: values.name,
                        password: values.password,
                        favorites: []
                    })
                commit('SET_USERDATA', {name: values.name, email: values.email})
                commit('SET_ERROR', {status: false, text: ''})
            } else {
                commit('SET_ERROR', {status: true, text: 'The provided email is already in use by an existing user.'})
            }
        },

        async loadUser({commit, dispatch}, payload) {
            const result = await dispatch("checkIfExists", payload.email)
            if (result.password === payload.password) {
                commit(SET_USERDATA, {name: result.name, email: payload.email})
                commit(SET_ERROR, {status: false, text: ''})
            } else {
                commit(SET_ERROR, {
                    status: true,
                    text: 'There is no existing user record corresponding to the provided identifier.'
                })
            }
        },
        async navBarLoad({commit, dispatch}) {
            const data = localStorage.getItem('user')
            const user = data ? JSON.parse(data) : false
            const dbQuery = await dispatch('checkIfExists', user.email)
            if (dbQuery) {
                commit(SET_USERDATA, user)
                commit(SET_ERROR, {status: false, text: ''})
            }
        },

        async checkIfExists({commit}, payload) {
            return await db.collection(database).doc(payload).get().then(doc => doc.exists ? doc.data() : false)

        },

        logout({commit}) {
            commit(DELETE_USER)
            commit(SET_ERROR, {status: false, text: ''})
        },


    }
}
export default user
