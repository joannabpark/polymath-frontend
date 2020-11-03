export const deleteLessonSuccess = (givelessons) => {
  // debugger  
  return {
      type: 'DELETE_LESSON_SUCCESS',
      givelessons: givelessons
    }
  }