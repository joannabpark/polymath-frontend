const givelessons = (state=[], action) => {
  
    switch(action.type) {
        case "CURRENT_USER":
          const lessons = action.user.providing_lessons
          return lessons
        case "DELETE_LESSON_SUCCESS":
          const newLessons = state.filter(obj => obj.id !== action.givelessons)
             return newLessons
          default:
            return state
    }
} 

export default givelessons