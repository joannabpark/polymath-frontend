import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { fetchMessagesSuccess } from '../actions/messages'
import { Container } from 'semantic-ui-react'

class Inbox extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('app_token')
    // console.log(token)
    if (!token){
      this.props.history.push('/login')
    } else {
    fetch(`http://localhost:3000/messages`)
        .then(resp => resp.json())
        .then(messages => {
         this.props.fetchMessagesSuccess(messages)
      })
    }
  }

    renderMessages = () => {
        let newMessages = this.props.messages.filter(message => message.recipient_id === this.props.user.id)
      return newMessages.map((message, index) => (
        <Message key={index} message={message} history={this.props.history} />
          ))
        }

    render () {
        return (
          <Container>
            <div className='App'>
                   <h2 style={{padding: "20px", textAlign: "center", color: "slategrey", fontFamily: "Trebuchet MS"}}>My Messages:</h2>
                   {this.renderMessages()}
                 <br></br>
             </div>
           </Container>
        )
      }
  }

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages
  }
}

const mapDispatchToProps = {
    fetchMessagesSuccess
  }
  


export default connect(mapStateToProps, mapDispatchToProps)(Inbox)