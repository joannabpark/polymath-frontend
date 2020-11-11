
const initialState = []

const skills = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_SKILLS_SUCCESS":
            // const newArray = action.skills.map(obj => obj.users[0])
            // const newNewArray = newArray.filter(obj => obj !== undefined)
            const skills = [...action.skills]
            return skills
        // case "ADD_SKILL_SUCCESS":
        //     return [...state, action.skill]
        // case "EDIT_SKILL_SUCCESS":

        default:
            return state
    }
} 

export default skills