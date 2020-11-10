import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import { fetchUserSuccess } from '../actions/userview';
import { newMessageSuccess } from '../actions/messages'
import { Grid, Card, Image, Button, Form, Container } from 'semantic-ui-react'
import ViewSkills from './ViewSkills'
import Popup from 'reactjs-popup';
import toaster from "toasted-notes";
import "./styling.css";

class ViewProfile extends React.Component {

    state = {
        id: "",
        content: "",
        sender_id: this.props.user.id,
        recipient_id: this.props.userview.id,
        replied: false,
        error: null,
        fetched: false,
    }
    
    componentDidMount() {
        const token = localStorage.getItem('app_token')

        if (!token){
        this.props.history.push('/login')
        } else {
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/users/${userId}`)
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchUserSuccess(data)
            this.setState({
                fetched: true
            })
         })
      }
    }

    handleMessageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }

    handleNewMessageSubmit = (e) => {
      debugger
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
                sender_id: this.state.sender_id,
                recipient_id: this.props.userview.id,
                replied: false
            })
          }
          fetch('http://localhost:3000/messages', reqObj)
          .then(resp => resp.json())
          .then(data => {
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.newMessageSuccess(data)
              toaster.notify("your message was sent!", {
                duration: 2000
              })
              this.props.history.push(`/viewprofile/${this.state.recipient_id}`)
            }
          })
    }

    // successMessage = () => {
    //     toaster.notify("your message was sent!", {
    //       duration: 2000
    //     })
    // }
    
    renderSkills = () => {
        // filtering of only viewing not signed up skills doesn't work
        // let newArray = this.props.userview.providing_lessons.filter(obj => obj.provider_id === this.props.userview.id)       
        // let id = parseInt(newArray.map(obj => obj.skill_id))
        // let newNewArray = this.props.userview.skills.filter(skill => skill.id !== id)
         return this.props.userview.skills.map((skill, index) => {
          return <ViewSkills skill={skill} key={index} history={this.props.history}/>
        })
     }

  render() { 
    return (
      <div className='App'>
       <div style={{height: "150px", backgroundColor: 'slategrey'}}>
           <h1 style={{paddingTop: "50px", fontFamily: "system-ui", color: "white"}}>Use your points to learn skills</h1>
          </div>
          <div className="stack-top">
             <div style={{paddingTop: "13px"}}>
               <a style={{fontSize: "18px", fontFamily: "system-ui", color: "white"}}>Click the sign up button to schedule your next lesson</a>
            </div>
           </div>
       <Container>
          <Grid divided="vertically">
             <Grid.Row>
                <Grid.Column width={5}>
                    <Card fluid style={{borderRadius:"5px", marginTop:"40px", textAlign: "center", border:"1px solid pink"}}>
                        <Image src={this.props.userview.image_url} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header style={{fontSize: "35px", color: "black"}}>{this.props.userview.first_name}</Card.Header>
                        <Card.Meta>
                            <span className='date' style={{fontSize: "15px", color: "slategrey"}}>Member since: {moment(this.props.userview.created_at).format('MM/DD/YYYY')}</span>
                        </Card.Meta>
                        <Card.Description>
                             <a style={{fontSize: "15px", color: "slategrey"}}><i aria-hidden="true" class="at icon"></i>{this.props.userview.email}</a>
                            <br></br>
                            <a style={{fontSize: "15px", color: "slategrey"}}><i aria-hidden="true" class="location arrow icon"></i>location: {this.props.userview.location}</a>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Popup trigger={<button className="ui button large" style={{width: "90%", color: "deeppink"}}><i aria-hidden="true" className="chat icon"></i>send me a message</button>} position="right">
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
                                    </Button>  
                                    </Form>
                                </Popup>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column style={{paddingTop: "35px"}} width={11}>
                  {this.state.fetched ? this.renderSkills() : null}
               </Grid.Column>
            </Grid.Row>
         </Grid>
        </Container>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user,
    // lessons: state.lessons,
    userview: state.userview
    }
}

const mapDispatchToProps = {
    fetchUserSuccess,
    newMessageSuccess
  }  

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);