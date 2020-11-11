
// const URL = 'http://localhost:3000/skills'

 export const deleteSkillSuccess = (id) => {
      return {
        type: 'DELETE_SKILL_SUCCESS',
        id: id
      }
    }
    
    export const addSkillSuccess = (skills) => {
      return {
          type: 'ADD_SKILL_SUCCESS',
          skill: skills
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