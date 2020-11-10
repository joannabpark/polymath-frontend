import React from 'react'
import { Button, Card, Form, Container } from 'semantic-ui-react'
import Popup from 'reactjs-popup';
import { newLessonSuccess } from '../actions/lessons'
import { connect } from 'react-redux'
import toaster from "toasted-notes";
import "./styling.css";

class ViewSkills extends React.Component {

  state = {
    id: "",
    date: "",
    skill_name: this.props.skill.name,
    description: this.props.skill.description,
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
                    provider_id: this.state.provider_id,
                    receiver_id: this.state.receiver_id,
                    skill_id: this.state.skill_id,
                    skill_name: this.props.skill.name,
            })
          }
          fetch('http://localhost:3000/lessons', reqObj)
          .then(resp => resp.json())
          .then(data => {
              if (this.props.user.points <= 0) {
                toaster.notify("you don't have points!", {
                  duration: 2000
                })
              } else{
              this.props.newLessonSuccess(data)
              toaster.notify("thank you for signing up!", {
                duration: 2000
              })
              this.props.history.push(`/myprofile/receivinglessons`)
            }
          })
  }

    render() {
        return ( 
          <Container style={{paddingBottom: "15px"}}>
            <Card style={{border: "1px solid pink"}} fluid centered>
             <img src={this.props.skill.video_url} height={300}/>
              <Card.Content>
                 <Card.Header style={{fontSize: "35px", color: "black"}}>{this.props.skill.name}</Card.Header>
                <Card.Meta style={{fontSize: "15px", color: "slategrey"}}>{this.props.skill.category}</Card.Meta>
                <Card.Description style={{fontSize: "18px", color: "slategrey"}}>
                 <h3 style={{fontStyle: "bold", color: "lightgrey", paddingBottom:"10px"}}>Skill description:</h3> {this.props.skill.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Popup trigger={<button className='ui button large' style={{width: "90%", color: "deeppink"}}>sign up</button>} position="bottom right">
                        <Form onSubmit={this.handleSubmit}>
                        <h4 style={{backgroundColor: "pink", color: "deepslategrey"}}>Enter date and time:</h4>
                             <Form.Group widths='equal'>
                                    <input
                                     as={<Form.Input />}
                                    type="datetime-local" 
                                      name="date" 
                                      placeholder="date"
                                      onChange={this.handleChange}
                                      />
                                      <div style={{textAlign: "center"}}>
                                      <Button color='pink' fluid size='large' animated='fade'>
                                        <Button.Content visible>save</Button.Content>
                                        <Button.Content hidden style={{ color: 'hotpink'}}><i aria-hidden="true" className="save icon"></i></Button.Content>
                                    </Button> 
                                      </div>
                             </Form.Group>
                         </Form>
                   </Popup>
              </Card.Content>
            </Card>
     </Container>
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