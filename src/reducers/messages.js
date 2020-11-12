
const messages = (state=[], action) => {
  
    switch(action.type) {
        // case "CURRENT_USER":
        //   // debugger
        //   const lessons = action.user.receiving_lessons
        //   return lessons
        case "NEW_MESSAGE_SUCCESS":
          return [...state, action.messages]
        case "FETCH_MESSAGES_SUCCESS":
          return [...action.messages.reverse()]
        case "REPLIED_STATUS_UPDATE":
          return [...state, {replied: true}]
        // case "DELETE_LESSON_SUCCESS":
        //   const newLessons = state.filter(obj => obj.id !== action.id)
        //      return newLessons
        case "DELETE_MESSAGE_SUCCESS":
          const newMessages = state.filter(obj => obj.id !== action.messages)
          return newMessages 
          default:
            return state
    }
} 

export default messages