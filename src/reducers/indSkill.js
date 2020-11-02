const initialState = []

const indSkill = (state=initialState, action) => {
    switch(action.type) {
        case "EDIT_SKILL_SUCCESS":
            // debugger
        const editedSkill = state.map(a => {
            // debugger
                if (a.id === action.indSkill.id) {
                      a = {
                        // ...state, 
                        name: action.indSkill.name,
                        category: action.indSkill.category,
                        description: action.indSkill.description
                    }
                    return a
                } else {
                    return a
                }
            })
            return editedSkill
         case "DELETE_SKILL_SUCCESS":
             const newSkills = state.filter(obj => obj.id !== action.id)
             return newSkills
        case "CURRENT_USER":
            return action.user.skills
        default:
            return state
    }
} 

export default indSkill