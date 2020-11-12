import React from 'react';
import { connect } from 'react-redux';
import { editSkillSuccess } from '../actions/skills'
import { Container, Button, Grid, Form } from 'semantic-ui-react'
import toaster from "toasted-notes";

class EditSkill extends React.Component {

    state = {
        id: "",
        name: "",
        category: "",
        description: "",
        video_url: ""
      }

    componentDidMount() {
        const path = this.props.location.pathname.split("/")
        const id = parseInt(path[path.length - 1])
        fetch(`http://localhost:3000/skills/${id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                id: data.id,
                name: data.name,
                category: data.category,
                description: data.description,
                video_url: data.video_url
            })
        })
    }

      handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                category: this.state.category,
                description: this.state.description,
                video_url: this.state.video_url
            })
        }
        fetch(`http://localhost:3000/skills/${this.state.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
            this.props.editSkillSuccess(data)
            toaster.notify("skill has been updated", {
                duration: 2000
              })
            this.props.history.push(`/myprofile`)
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
                <h2 style={{textAlign: "center", color: "hotpink", fontFamily: "Trebuchet MS"}}>edit skill:</h2>
          <Form onSubmit={this.handleSubmit}>
          <Form.Group></Form.Group>
              <Form.Group widths='equal'>
              <input
                      as={<Form.Input />}
                   type="text" 
                   name="name" 
                   onChange={this.handleChange}
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
                   onChange={this.handleChange}
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
                   onChange={this.handleChange}
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
                   onChange={this.handleChange}
                   value={this.state.description}
                   placeholder="skill description"
                   />
                   </Form.Group>
                   <br></br>
                   <div style={{textAlign: "center"}}>
                   <Button animated='fade' fluid size="large" style={{backgroundColor: "deeppink"}}>
                      <Button.Content visible style={{color: "lightgrey"}}>update skill</Button.Content>
                      <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="sync icon"></i></Button.Content>
                </Button>
                  </div>
             </Form>
             </Grid.Column>
          </Grid.Row>
      </Grid>
        </Container>
      </div>

     )
    }


}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  
  const mapDispatchToProps = {
    editSkillSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditSkill)