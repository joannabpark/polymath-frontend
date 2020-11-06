  
  export const fetchUserSuccess = (userview) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        userview: userview
    }
  }

  export const updateUserviewPoints = (userview) => {
    return {
        type: 'UPDATE_USERVIEW_POINTS',
        userview: userview
    }
  }


  