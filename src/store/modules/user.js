import {appAuth} from "../../config";

const user = {
    namespaced: true,
    state: {
        userData: '',
        error: {}
    },
    getters: {
        getUser: (state) => state.userData,
        getError: (state) => state.error,
        getUserName: (state) => state.userData.displayName

    },
    mutations: {
        setError(state, payload) {
            state.error = {status: payload.status, text: payload.text}
        },
        setUserData(state, payload) {
            state.userData = payload
        }
    },
    actions: {
        async saveUser({commit}, values) {
            await appAuth.createUserWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    u.user.updateProfile({displayName: values.name})
                    commit('setError', {status: false, text: ''})
                })
                .catch(err => {
                    commit('setError', {status: true, text: err.message})

                })
        },
        async loadUser({commit}, values) {
            await appAuth.signInWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    commit('setUserData', u.user)
                    commit('setError', {status: false, text: ''})

                })
                .catch(err => {
                    commit('setError', {status: true, text: err.message})
                })

        },
        async logout() {
            await appAuth.signOut().then(() => this.error = false).catch((err) => console.log(err.message))
        },
        async navBarLoad({commit}) {
            await appAuth.onAuthStateChanged((user) => {
                if (user) {
                    commit('setUserData', user)
                    commit('setError', {status: false, text: ''})
                }
            })
        }

    }
}
export default user
