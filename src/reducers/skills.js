
const initialState = []

const skills = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_SKILLS_SUCCESS":
            // debugger
            // const newArray = action.skills.map(obj => obj.users[0])
            // const newNewArray = newArray.filter(obj => obj !== undefined)
            const skills = [...action.skills].reverse()
            return skills
        case "ADD_SKILL_SUCCESS":
            // debugger
            // return {...action.skills, user_skills: }
        default:
            return state
    }
} 

export default skills