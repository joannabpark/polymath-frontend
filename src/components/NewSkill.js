import React from 'react';
import { connect } from 'react-redux';
import { addSkillSuccess } from '../actions/indSkill'
import { Container, Button, Grid, Form } from 'semantic-ui-react'
import toaster from "toasted-notes";

class NewSkill extends React.Component {

    state = {
        id: "",
        name: "",
        category: "",
        video_url: "",
        description: "",
        user_id: "",
        error: null
      }

      componentDidMount() {
        const token = localStorage.getItem('app_token')
        console.log(token)
        if (!token){
          this.props.history.push('/login')
        }
      }
    
      handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }

    handleNewSkillSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // id: `${this.props.user.id}`
            },
            body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    category: this.state.category,
                    video_url: this.state.video_url,
                    description: this.state.description,
                    user_id: this.props.user.id
            })
          }
          fetch('http://localhost:3000/skills', reqObj)
          .then(resp => resp.json())
          .then(data => {
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.addSkillSuccess(data)
              toaster.notify("skill has been added", {
                duration: 2000
              })
              this.props.history.push(`/myprofile`)
            }
          })
    }


  render() {
    return (
      <div>
        <Container style={{marginBottom: 30, marginTop: 30, border: "1px solid pink", backgroundColor: "whitesmoke", width: 600, height: 570}}>
          <br></br>
        <Grid>
          <Grid.Row centered>
              <Grid.Column width={10}>
                <h2 style={{textAlign: "center", color: "hotpink", fontFamily: "Trebuchet MS"}}>new skill:</h2>
          <Form onSubmit={this.handleNewSkillSubmit}>
          <Form.Group></Form.Group>
              <Form.Group widths='equal'>
              <input
                      as={<Form.Input />}
                   type="text" 
                   name="name" 
                   onChange={this.handleInputChange}
                   value={this.state.name}
                   placeholder="name"
                    />
                    </Form.Group>
                    <br></br>
                    <Form.Group widths='equal'>
                    <input
                      as={<Form.Input />}
                   type="text" 
                   name="category" 
                   onChange={this.handleInputChange}
                   value={this.state.category}
                   placeholder="category"
                    />
                    </Form.Group>
                    <br></br>
                    <Form.Group widths='equal'>
                    <input
                      as={<Form.Input />}
                   type="text" 
                   name="video_url" 
                   onChange={this.handleInputChange}
                   value={this.state.video_url}
                   placeholder="image url that represents your skill"
                    />
                    </Form.Group>
                    <br></br>
                      <Form.Group widths='equal'>
                    <textarea
                      as={<Form.Input />}
                   type="area" 
                   name="description" 
                   onChange={this.handleInputChange}
                   value={this.state.description}
                   placeholder="skill description"
                   />
                   </Form.Group>
                   <br></br>
                   <div style={{textAlign: "center"}}>
                   <Button animated='fade' fluid size="large" style={{backgroundColor: "deeppink"}}>
                     <Button.Content visible style={{color: "lightgrey"}}>add to list of skills</Button.Content>
                      <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="plus icon"></i></Button.Content>
                </Button>
                  </div>
             </Form>
             </Grid.Column>
          </Grid.Row>
      </Grid>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      skills: state.skills
    }
  }
  
  const mapDispatchToProps = {
    addSkillSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NewSkill)