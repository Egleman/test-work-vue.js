const users = {
    state: {
        users: {},
    },
    getters: {
        getUsers(state){
            return state.users;
        },
    },
    mutations: {
        setUsers(state, data){
            state.users = data;
        },
    },
    actions: {
        setUsers({commit}, data) {
            commit("setUsers", data);
        },
    }

}
export default users;