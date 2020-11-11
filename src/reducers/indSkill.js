const initialState = []

const indSkill = (state=initialState, action) => {
    switch(action.type) {
        case "EDIT_SKILL_SUCCESS":
            console.log(action)
            const editedSkill = state.map(a => {
                if (a.id === action.skills.id) {
                    return {
                        ...a,
                        name: action.skills.name,
                        category: action.skills.category,
                        description: action.skills.description,
                        video_url: action.skills.video_url
                    }
                } else {
                    return a
                }
            })
            console.log(editedSkill)
              return editedSkill
         case "DELETE_SKILL_SUCCESS":
             const newSkills = state.filter(obj => obj.id !== action.id)
             return newSkills
          case "ADD_SKILL_SUCCESS":
             return [...state, action.skill]
        case "CURRENT_USER":
            return action.user.skills
        default:
            return state
    }
} 

export default indSkill