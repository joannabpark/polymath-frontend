import React from 'react';
import { connect } from 'react-redux';
import { addSkillSuccess } from '../actions/skills'
import { Container, Button, Grid, Form } from 'semantic-ui-react'



class NewSkill extends React.Component {

    state = {
        id: "",
        name: "",
        category: "",
        description: "",
        users: {
            id: this.props.user.id
        },
        error: null
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
              id: `${this.props.user.id}`
            },
            body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    category: this.state.category,
                    description: this.state.description,
                    users: {
                        id: this.props.user.id
                    }
            })
          }
          fetch('http://localhost:3000/skills', reqObj)
          .then(resp => resp.json())
          .then(data => {
              debugger
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.addSkillSuccess(data)
            //   this.props.history.push(`/home`)
            }
          })
    }


  render() {
    return (
      <div>
        <Container>
          <br></br>
        <Grid>
          <Grid.Row centered>
              <Grid.Column width={8}>
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
                  //  register={register({ required: true })}
                    // error={errors.title && 'Enter a title'}
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
                  //  register={register({ required: true })}
                    // error={errors.title && 'Enter a title'}
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
                  //  register={register({ required: true })}
                    // error={errors.content && 'must have content'}
                   />
                   </Form.Group>
                   <br></br>
                   <br></br><br></br>
                   <div style={{textAlign: "center"}}>
                   <Button animated='fade'>
                     <Button.Content visible><i aria-hidden="true" className="plus square outline icon"></i></Button.Content>
                      <Button.Content hidden style={{ color: 'hotpink'}}>create</Button.Content>
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