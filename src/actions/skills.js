
export const fetchSkillsSuccess = (skills) => {
    return {
        type: 'FETCH_SKILLS_SUCCESS',
        skills: skills
    }
  }

// export const postNoteSuccess = (notes) => {
//   return {
//       type: 'POST_NOTE_SUCCESS',
//       notes: notes
//   }
// }

// export const editNoteSuccess = (notes) => {
//   return {
//       type: 'EDIT_NOTE_SUCCESS',
//       notes: notes
//   }
// }

export const removeSkill = (id) => {
    return {
      type: 'REMOVE_SKILL',
      id: id
    }
  }