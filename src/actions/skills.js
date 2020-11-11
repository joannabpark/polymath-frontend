
export const fetchSkillsSuccess = (skills) => {
    return {
        type: 'FETCH_SKILLS_SUCCESS',
        skills: skills
    }
  }

  export const editSkillSuccess = (skills) => {
    return {
        type: 'EDIT_SKILL_SUCCESS',
        skills: skills
    }
  }
