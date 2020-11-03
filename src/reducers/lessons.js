
const lessons = (state=[], action) => {
  
    switch(action.type) {
        case "CURRENT_USER":
          const lessons = action.user.receiving_lessons
          return lessons
        case "NEW_LESSON_SUCCESS":
          // debugger
          return [...state, action.lessons]
          default:
            return state
    }
} 

export default lessons