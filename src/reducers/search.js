
const search = (state="", action) => {
  
    switch(action.type) {
        case "SEARCH_SKILLS":
            return action.search.target.value
          default:
            return state
    }
} 

export default search