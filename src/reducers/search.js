
const search = (state="", action) => {
  
    switch(action.type) {
        case "SEARCH_SKILLS":
            return action.search.target.value
        case "RESET_SKILLS":
           return state=""
          default:
            return state
    }
} 

export default search