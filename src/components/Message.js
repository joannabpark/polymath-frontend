import React from 'react'
import { connect } from 'react-redux'
import { newMessageSuccess } from '../actions/messages'
import { repliedStatusUpdate } from '../actions/messages'
import moment from 'moment-timezone';
import { Form, Button, Card, Image } from 'semantic-ui-react'
import Popup from 'reactjs-popup';
import toaster from "toasted-notes";
import "./styling.css";

class Message extends React.Component {

  state = {
    id: "",
    content: "",
    sender_id: this.props.user.id,
    recipient_id: this.props.message.sender_id,
    replied: false,
    error: null
}

componentDidMount() {
  const token = localStorage.getItem('app_token')

  if (!token){
  this.props.history.push('/login')
  }
}

  handleMessageChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

handleNewMessageSubmit = (e) => {
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
          toaster.notify("your message was sent!", {
            duration: 2000
          })
          this.handleReplied(this.props.message.id)
          this.props.history.push(`/viewprofile/${this.props.message.sender_id}`)
        }
      })
}

handleReplied = () => {
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
              <Card centered style={{width: "500px", border: "1px solid pink"}}>
                   <Card.Content>
                   <Image
                        size='mini'
                        src={`${this.props.message.sender.image_url}`}
                        style={{float: "right"}}
                      />                       <Card.Header style={{textAlign: "left", fontSize: "20px", color: "black"}}>from {this.props.message.sender.first_name}:</Card.Header>
                     <Card.Meta style={{textAlign: "left", fontSize: "15px", color: "slategrey"}}>sent on {moment.tz(`${this.props.message.created_at}`, 'Europe/Dublin').format('lll')}</Card.Meta>
                     <Card.Description style={{textAlign: "left", paddingTop: "5px", fontSize: "22px", color: "deepslategrey"}}>
                         {this.props.message.content}
                     </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                      <Popup trigger={<button className="button ui large" style={{width: "90%", color: "deeppink"}}><i aria-hidden="true" className="chat icon"></i>Reply</button>} position="right">
                                 <Form success onSubmit={this.handleNewMessageSubmit}>
                                 <input
                                        as={<Form.Input width='equal'/>}
                                            type="text" 
                                           name="content" 
                                           placeholder="new message"
                                              onChange={this.handleMessageChange}
                                         />
                                      <Button color='pink' fluid size='large' animated='fade'>
                                        <Button.Content visible>send</Button.Content>
                                        <Button.Content hidden style={{ color: 'hotpink'}}><i aria-hidden="true" className="send icon"></i></Button.Content>
                                    </Button>                                      </Form>
                                </Popup>
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