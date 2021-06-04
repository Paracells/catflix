import {appAuth} from "../../config";

const user = {
    namespaced: true,
    state: {
        userData: '',
        error: {}
    },
    getters: {
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
        saveUser({commit}, values) {
            appAuth.createUserWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    u.user.updateProfile({displayName: values.name})
                    commit('setUserData', u.user)
                    commit('setError', {status: false, text: ''})
                })
                .catch(err => {
                    commit('setError', {status: true, text: err.message})

                })
        },
        loadUser({commit}, values) {
            appAuth.signInWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    commit('setUserData', u.user)
                    commit('setError', {status: false, text: ''})

                })
                .catch(err => {
                    commit('setError', {status: true, text: err.message})
                })

        },
        logout() {
            appAuth.signOut().then(() => this.error = false).catch((err) => console.log(err.message))
        },
        

    }
}
export default user
