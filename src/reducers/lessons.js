
const lessons = (state=[], action) => {
  
    switch(action.type) {
        case "CURRENT_USER":
          // debugger
          const lessons = action.user.receiving_lessons
          return lessons
        case "NEW_LESSON_SUCCESS":
          // debugger
          return [...state, action.lessons]
        case "DELETE_LESSON_SUCCESS":
          // debugger
          const newLessons = state.filter(obj => obj.id !== action.id)
             return newLessons
          default:
            return state
    }
} 

export default lessons