export const searchSkills = (search) => {
    return {
      type: 'SEARCH_SKILLS',
      search: search
    }
  }

  export const resetSkills = () => {
    return {
      type: 'RESET_SKILLS'
    }
  }