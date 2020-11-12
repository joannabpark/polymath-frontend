
const userview = (state={}, action) => {
    switch(action.type) {
         case "FETCH_USER_SUCCESS":
             return action.userview
         case "UPDATE_USERVIEW_POINTS":
           return {...state, points: state.points + 1}
          //  debugger
          case "UPDATE_USERVIEW_RECEIVER_POINTS":
            // debugger
              return {...state, points: state.points - 1}
        default:
            return state
    }
} 

export default userview