
const initialState = []

const skills = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_SKILLS_SUCCESS":
            const skills = [...action.skills.reverse()]
            return skills
        // case "ADD_SKILL_SUCCESS":
        //     return [...state, action.skill]
        // case "EDIT_SKILL_SUCCESS":

        default:
            return state
    }
} 

export default skills