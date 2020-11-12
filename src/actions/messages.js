
export const newMessageSuccess = (messages) => {
    return {
      type: 'NEW_MESSAGE_SUCCESS',
      messages: messages
    }
  }

  export const fetchMessagesSuccess = (messages) => {
    return {
      type: 'FETCH_MESSAGES_SUCCESS',
      messages: messages
    }
  }

  export const repliedStatusUpdate = (messages) => {
    return {
      type: 'REPLIED_STATUS_UPDATE',
      messages: messages
    }
  }

  export const deleteMessageSuccess = (messages) => {
    return {
      type: 'DELETE_MESSAGE_SUCCESS',
      messages: messages
    }
  }
  

  
