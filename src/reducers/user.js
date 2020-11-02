
const user = (state={}, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return action.user
        case "CREATE_USER_SUCCESS":
            return action.user
        case 'LOGOUT_SUCCESS':
            return {}
        case 'EDIT_USER_SUCCESS':
             return action.user
        case "DELETE_USER":
            return {}
        default:
            return state
    }
} 

export default user