
export const loginSuccess = (user) => {
    return {
      type: 'LOGIN_SUCCESS',
      user: user
    }
  }
  
  export const logoutSuccess = () => {
    return {
      type: 'LOGOUT_SUCCESS',
    }
  }
  
  export const createUserSuccess = (user) => {
    return {
      type: "CREATE_USER_SUCCESS",
      user: user,
    };
  };
  
  export const currentUser = (user) => {
    return {
      type: "CURRENT_USER",
      user: user
    }
  }

  export const editUserSuccess = (user) => {
    return {
        type: 'EDIT_USER_SUCCESS',
        user: user
    }
  }
  export const deleteUser = (user) => {
    return {
        type: 'DELETE_USER',
        user: user
    }
  }