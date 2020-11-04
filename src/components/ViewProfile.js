import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import { fetchUserSuccess } from '../actions/userview';
import { newMessageSuccess } from '../actions/messages'
import { Grid, Card, Image, Button, Form, Message } from 'semantic-ui-react'
import ViewSkills from './ViewSkills'
import Popup from 'reactjs-popup';

class ViewProfile extends React.Component {

    state = {
        id: "",
        content: "",
        sender_id: this.props.user.id,
        recipient_id: this.props.userview.id,
        error: null,
        fetched: false
    }
    
    componentDidMount() {
        // const token = localStorage.getItem('app_token')

        // if (!token){
        // this.props.history.push('/login')
        // } else {
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

    handleMessageChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }

    handleNewSkillSubmit = (e) => {
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
                sender_id: this.state.sender_id,
                recipient_id: this.state.recipient_id,
            })
          }
          fetch('http://localhost:3000/messages', reqObj)
          .then(resp => resp.json())
          .then(data => {
              // debugger
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.newMessageSuccess(data)
              this.props.history.push(`/viewprofile/${this.state.recipient_id}`)
            }
          })
    }

    successMessage = () => {
        alert("your message was sent!")
    }
    
    renderSkills = () => {
        // debugger
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
        <Grid divided="vertically">
        <Grid.Row>
            <Grid.Column width={8}>
              <div style={{marginTop: "40px"}}>
                    <Card centered>
                        <Image src={this.props.userview.image_url} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{this.props.userview.first_name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in {moment(this.props.userview.created_at).format('YYYY')}</span>
                        </Card.Meta>
                        <Card.Description>
                             <a>{this.props.userview.email}</a>
                            <br></br>
                            <a>location: {this.props.userview.location}</a>
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                          <Popup trigger={<button className="ui button">message {this.props.userview.first_name}</button>} position="right">
                                <Form success onSubmit={this.handleNewSkillSubmit}>
                                 <input
                                        as={<Form.Input width='equal'/>}
                                            type="text" 
                                            name="content" 
                                            placeholder="new message"
                                            value={this.state.image_url}
                                             onChange={this.handleMessageChange}
                                        />
                                          <Button onClick={() => this.successMessage}>Submit</Button>
                                    </Form>
                                </Popup>
                        </Card.Content>
                    </Card>
                    
                    {/* <div className="ui animated button" > */}
                        {/* <Button animated='fade' as={Link} to={`/home/${this.state.note.id}/form`}>
                            <Button.Content visible><i className="mail icon"></i></Button.Content>
                        <Button.Content hidden style={{ color: 'hotpink'}}>email</Button.Content>
                        </Button>
                        <Button animated='fade' as={Link} to={`/home/edit/${this.state.note.id}`}>
                            <Button.Content visible><i className="edit icon" ></i></Button.Content>
                            <Button.Content hidden style={{ color: 'hotpink'}}>edit</Button.Content>
                        </Button>
                        <Button animated='fade' onClick={() => this.deleteNote(this.state.note.id)}>
                            <Button.Content visible><i className="trash icon" ></i></Button.Content>
                            <Button.Content hidden style={{ color: 'hotpink'}}>delete</Button.Content>
                    </Button> */}
                    {/* </div>
                </div> */}
              </div>
        </Grid.Column>
        <Grid.Column width={8}>
            {/* {this.renderSkills()} */}
             {this.state.fetched ? this.renderSkills() : null}
        </Grid.Column>
    </Grid.Row>
</Grid>
    )
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user,
    lessons: state.lessons,
    userview: state.userview
    }
}

const mapDispatchToProps = {
    fetchUserSuccess,
    newMessageSuccess
  }  

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);