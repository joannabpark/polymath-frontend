
export const fetchSkillsSuccess = (skills) => {
    return {
        type: 'FETCH_SKILLS_SUCCESS',
        skills: skills
    }
  }

  export const addSkillSuccess = (skills) => {
    return {
        type: 'ADD_SKILL_SUCCESS',
        skill: skills
    }
  }