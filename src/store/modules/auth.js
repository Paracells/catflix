import {db} from "../../config";
import {database} from "../../utils";

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
        setError(state, payload) {
            state.error = {status: payload.status, text: payload.text}
        },
        setUserData(state, payload) {
            localStorage.setItem('user', JSON.stringify(payload))
            state.userData = payload
        },
        deleteUser(state) {
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
                commit('setUserData', {name: values.name, email: values.email})
                commit('setError', {status: false, text: ''})
            } else {
                commit('setError', {status: true, text: 'The provided email is already in use by an existing user.'})
            }
        },

        async loadUser({commit, dispatch}, payload) {
            const result = await dispatch("checkIfExists", payload.email)
            if (result.password === payload.password) {
                commit('setUserData', {name: result.name, email: payload.email})
                commit('setError', {status: false, text: ''})
            } else {
                commit('setError', {
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
                commit('setUserData', user)
                commit('setError', {status: false, text: ''})
            }
        },

        async checkIfExists({commit}, payload) {
            return await db.collection(database).doc(payload).get().then(doc => doc.exists ? doc.data() : false)

        },

        logout({commit}) {
            commit('deleteUser')
            commit('setError', {status: false, text: ''})
        },


    }
}
export default user
