const user = {
    namespaced: true,
    state: {
        userData: ''
    },
    getters: {
        getUser: (state) => state.userData
    },
    actions: {
        saveUser({state}, payload) {
            
        }
    }
}
export default user
