
const messages = (state=[], action) => {
  
    switch(action.type) {
        // case "CURRENT_USER":
        //   // debugger
        //   const lessons = action.user.receiving_lessons
        //   return lessons
        case "NEW_MESSAGE_SUCCESS":
          // debugger
          return [...state, action.messages]
        case "FETCH_MESSAGES_SUCCESS":
          return [...action.messages]
        case "REPLIED_STATUS_UPDATE":
          return [...state, {replied: true}]
        // case "DELETE_LESSON_SUCCESS":
          // debugger
        //   const newLessons = state.filter(obj => obj.id !== action.id)
        //      return newLessons
          default:
            return state
    }
} 

export default messages