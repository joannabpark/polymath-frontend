// import React from 'react';
// import { connect } from 'react-redux';
// import { newMessageSuccess } from '../actions/messages'
// // import { Container, Button, Grid, Form } from 'semantic-ui-react'
// import ViewProfile from './ViewProfile'

// class NewMessage extends React.Component {

//     state = {
//         id: "",
//         content: "",
//         sender_id: this.props.user.id,
//         // recipient_id: ,
//         error: null
//       }
    
//       handleMessageChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//       }

//     handleNewSkillSubmit = (e) => {
//         e.preventDefault()
//         const reqObj = {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               // id: `${this.props.user.id}`
//             },
//             body: JSON.stringify({
//                     id: this.state.id,
//                     content: this.state.content,
//                     sender_id: this.state.sender_id,
//                     recipient_id: this.state.recipient_id
//             })
//           }
//           fetch('http://localhost:3000/messages', reqObj)
//           .then(resp => resp.json())
//           .then(data => {
//               // debugger
//             if (data.error) {
//               this.setState({
//                 error: data.error
//               })
//             } else {
//               this.props.newMessageSuccess(data)
//               this.props.history.push(`/myprofile`)
//             }
//           })
//     }


//   render() {
//     return (
//         <ViewProfile 
//         onChange={this.handleMessageChange} 
//         onSubmit={this.handleNewSkillSubmit}/>
//     );
//   }

// }

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//       messages: state.messages,
//       userview: state.userview
//     }
//   }
  
//   const mapDispatchToProps = {
//     newMessageSuccess
//   }
  
//   export default connect(mapStateToProps, mapDispatchToProps)(NewMessage)