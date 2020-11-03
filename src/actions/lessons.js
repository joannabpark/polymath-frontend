
export const newLessonSuccess = (lessons) => {
    return {
      type: 'NEW_LESSON_SUCCESS',
      lessons: lessons
    }
  }

  export const deleteLessonSuccess = (lessons) => {
    return {
      type: 'DELETE_LESSON_SUCCESS',
      lessons: lessons
    }
  }