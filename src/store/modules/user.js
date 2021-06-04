import {appAuth} from "../../config";

const user = {
    namespaced: true,
    state: {
        userData: '',
        error: '',
        errorText: ''
    },
    getters: {
        getUser: (state) => state.userData,
        getError: (state) => state.error,
        getErrorText: (state) => state.errorText,
        getUserName: (state) => state.userData.dispalyName

    },
    actions: {
        async saveUser({commit}, values) {
            await appAuth.createUserWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    u.user.updateProfile({displayName: values.name})
                    this.error = false
                    this.errorText = ''
                })
                .catch(err => {
                    this.error = true
                    this.errorText = err.message
                })
        },
        async loadUser({commit}, values) {
            await appAuth.signInWithEmailAndPassword(values.email, values.password)
                .then((u) => {
                    this.userData = u.user
                    console.log("u.user", u.user)
                    this.error = false
                    this.errorText = ''
                })
                .catch(err => {
                    this.error = true
                    this.errorText = err.message
                })

        },
        async logout() {
            await appAuth.signOut().then(() => this.error = false).catch((err) => console.log(err.message))
        },
        navBarLoad() {
            const vm = this
            appAuth.onAuthStateChanged(function (user) {
                if (user) {
                    console.log("navBarLoad", user)
                    this.userData = user
                    this.error = false
                } else {
                    this.error = "true"
                    this.errorText = "Unknown error"
                }
            })
        }

    }
}
export default user
