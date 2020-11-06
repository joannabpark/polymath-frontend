import React from 'react'
import { Button, Card, Form } from 'semantic-ui-react'
import Popup from 'reactjs-popup';
import { newLessonSuccess } from '../actions/lessons'
import { connect } from 'react-redux'

class ViewSkills extends React.Component {

  state = {
    id: "",
    date: "",
    skill_name: this.props.skill.name,
    description: this.props.skill.description,
    is_completed: false,
    provider_id: this.props.skill.user_id,
    receiver_id: this.props.user.id,
    skill_id: this.props.skill.id,
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }; 

  handleSubmit = (e) => {
    e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // id: `${this.props.user.id}`
            },
            body: JSON.stringify({
                    id: this.state.id,
                    date: this.state.date,
                    description: this.state.description,
                    is_completed: this.state.is_completed,
                    provider_id: this.state.provider_id,
                    receiver_id: this.state.receiver_id,
                    skill_id: this.state.skill_id,
                    skill_name: this.props.skill.name,
            })
          }
          fetch('http://localhost:3000/lessons', reqObj)
          .then(resp => resp.json())
          .then(data => {
              // debugger
              if (this.props.user.points <= 0) {
                alert("you don't have points!")
              } else{
              this.props.newLessonSuccess(data)
              this.props.history.push(`/myprofile/receivinglessons`)
            }
          })
  }

    render() {
      // debugger
        return ( 
            <Card.Group>
            <Card>
              <Card.Content>
                 <Card.Header>{this.props.skill.name}</Card.Header>
                {/* {(this.props.lessons.map(lesson => lesson.receiver_id)).includes(this.props.user.id) ? <Icon name='star outline' /> : null } */}
                <Card.Meta>{this.props.skill.category}</Card.Meta>
                <Card.Description>
                    {this.props.skill.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {/* <div className='ui two buttons'> */}
                <Popup trigger={<button className='ui button'>sign up</button>} position="bottom right">
                        <Form onSubmit={this.handleSubmit}>
                        <h4 style={{backgroundColor: "pink"}}>Enter date and time:</h4>
                             <Form.Group widths='equal'>
                                    <input
                                     as={<Form.Input />}
                                    type="datetime-local" 
                                      name="date" 
                                      placeholder="date"
                                      onChange={this.handleChange}
                                      />
                                      <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                             </Form.Group>
                         </Form>
                   </Popup>
                {/* </div> */}
              </Card.Content>
            </Card>
            </Card.Group>
              )
         }
  }
  
  const mapStateToProps = (state) => {
    return {
    user: state.user,
    userview: state.userview,
    skills: state.skills,
    lessons: state.lessons
    }
}

const mapDispatchToProps = {
    newLessonSuccess
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewSkills);