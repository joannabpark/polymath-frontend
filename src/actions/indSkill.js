
// const URL = 'http://localhost:3000/skills'

export const editSkillSuccess = (indSkill) => {
    // debugger
    return {
        type: 'EDIT_SKILL_SUCCESS',
        indSkill: indSkill
    }
  }

 export const deleteSkillSuccess = (id) => {
    // debugger
      return {
        type: 'DELETE_SKILL_SUCCESS',
        id: id
      }
    }

    // export const thunkDeleteSkill = (id) => { 
    //   return function(dispatch) {
    //     fetch(`${URL}/${id}`, { method: 'DELETE' })
    //     .then(resp => resp.json())
    //     .then(data => {
    //       dispatch(deleteSkillSuccess(id))
    //     })
    //   };
    // }