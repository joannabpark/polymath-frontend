import React from 'react'
import { connect } from 'react-redux'
import { newMessageSuccess } from '../actions/messages'
import { repliedStatusUpdate } from '../actions/messages'
import moment from 'moment-timezone';
import { Form, Button, Card, Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup';

class Message extends React.Component {

  state = {
    id: "",
    content: "",
    sender_id: this.props.user.id,
    recipient_id: this.props.message.sender_id,
    replied: false,
    error: null
}

  handleMessageChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

handleNewMessageSubmit = (e) => {
    // debugger
    e.preventDefault()
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // id: `${this.props.user.id}`
        },
        body: JSON.stringify({
            id: this.state.id,
            content: this.state.content,
            sender_id: this.props.user.id,
            recipient_id: this.props.message.sender_id,
            replied: false
        })
      }
      fetch('http://localhost:3000/messages', reqObj)
      .then(resp => resp.json())
      .then(data => {
          console.log(data)
        if (data.error) {
          this.setState({
            error: data.error
          })
        } else {
          this.props.newMessageSuccess(data)
          // debugger
          this.handleReplied(this.props.message.id)
          this.props.history.push(`/viewprofile/${this.props.message.sender_id}`)
        }
      })
}

  successMessage = () => {
    alert("your message was sent!")
}

handleReplied = () => {
  // debugger
  const reqObj = {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          replied: true
      }) 
    }

    fetch (`http://localhost:3000/messages/${this.props.message.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.props.repliedStatusUpdate(data)
      this.props.history.push(`/inbox`)
  })
}

    render() {
        return ( 
            <Card centered>
                    <Card.Content visible centered
                          header={`from ${this.props.message.sender.first_name}:`}
                          meta={`sent on ${moment.tz(`${this.props.message.created_at}`, 'Europe/Dublin').format('lll')}`}
                          description={this.props.message.content}
                      />
                      <div style={{textAlign: "center"}}>
                      <Popup trigger={<button className="button ui">Reply</button>} position="right">
                                <Form success onSubmit={this.handleNewMessageSubmit}>
                                 <input
                                        as={<Form.Input width='equal'/>}
                                            type="text" 
                                            name="content" 
                                            placeholder="new message"
                                             onChange={this.handleMessageChange}
                                        />
                                          <Button onClick={() => this.successMessage()}>Send</Button>
                                    </Form>
                                </Popup>
                          {/*  */}
                      </div><br></br>
                      <Card.Content extra>
                       <p>Replied? {this.props.message.replied ? <Icon name='check' /> : null }
</p> 
                      </Card.Content>
               </Card>
               )
           }
  }
  
  const mapStateToProps = (state) => {
    return {
    user: state.user,
    messages: state.messages,
    userview: state.userview
    }
}

const mapDispatchToProps = {
    newMessageSuccess,
    repliedStatusUpdate
  }  

export default connect(mapStateToProps, mapDispatchToProps)(Message);