
const userview = (state={}, action) => {
    switch(action.type) {
         case "FETCH_USER_SUCCESS":
             return action.userview
        default:
            return state
    }
} 

export default userview