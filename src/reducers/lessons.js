
const lessons = (state=[], action) => {
  
    switch(action.type) {
        case "CURRENT_USER":
          const lessons = action.user.receiving_lessons
          return lessons
        case "NEW_LESSON_SUCCESS":
          return [...state, action.lessons]
        case "DELETE_LESSON_SUCCESS":
          const newLessons = state.filter(obj => obj.id !== action.lessons)
             return newLessons
          default:
            return state
    }
} 

export default lessons