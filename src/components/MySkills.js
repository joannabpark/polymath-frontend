import React from 'react'
import { Button, Card, Form } from 'semantic-ui-react'
import { deleteSkillSuccess } from '../actions/indSkill'
import { connect } from 'react-redux'
import { editSkillSuccess } from "../actions/indSkill";
import Popup from 'reactjs-popup';

class MySkills extends React.Component {

  state = {
    id: "",
    name: "",
    category: "",
    description: ""
  }

componentDidMount() {
    fetch(`http://localhost:3000/skills/${this.props.skill.id}`)
    .then(resp => resp.json())
    .then(data => {
        this.setState({ 
          id: data.id, 
          name: data.name, 
          category: data.category, 
          description: data.description
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
            description: this.state.description
        })
    }
    fetch(`http://localhost:3000/skills/${this.state.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        this.props.editSkillSuccess(data)
        // debugger
        this.props.history.push(`/myprofile`)
    })
}

  removeSkill = (id) => {
    const reqObj = {
        method: 'DELETE', 
      }
      
      fetch (`http://localhost:3000/skills/${id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.deleteSkillSuccess(id)
        // this.props.history.push(`/myprofile`)
      // debugger
    })
}

    render() {
        return ( 
            // <Card.Group>
            <Card>
              <Card.Content>
                 <Card.Header>
                 <Popup trigger={<a>{this.props.skill.name}</a>} position="right center">
                     <Form onSubmit={this.handleSubmit}>
                          <Form.Group widths='equal'>
                               <input
                               as={<Form.Input />}
                               type="text" 
                                name="name" 
                                placeholder="name"
                                value={this.state.name}
                                 onChange={this.handleChange}
                                  />
                               <div style={{textAlign: "center"}}>
                                 <Button>Save</Button>
                                </div>
                           </Form.Group>
                       </Form>
                   </Popup>
                 </Card.Header>
                <Card.Meta>
                <Popup trigger={<a>{this.props.skill.category}</a>} position="right center">
                     <Form onSubmit={this.handleSubmit}>
                          <Form.Group widths='equal'>
                                 <input
                                 as={<Form.Input />}
                                  type="text" 
                                  name="category" 
                                  placeholder="category"
                                  value={this.state.category}
                                   onChange={this.handleChange}
                                   />
                                   <div style={{textAlign: "center"}}>
                                  <Button>Save</Button>
                                  </div>
                        </Form.Group>
                       </Form>
                   </Popup>
                </Card.Meta>
                <Card.Description>
                    {this.props.skill.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='blue'>
                    edit
                  </Button>
                  <Button basic color='purple' onClick={() => this.removeSkill(this.props.skill.id)}>
                    delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
            // </Card.Group>
              )
         }
  }


const mapStateToProps = (state) => {
  return {
  skills: state.skills,
  indSkill: state.indSkill
  }
}

  const mapDispatchToProps = {
    deleteSkillSuccess,
    editSkillSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MySkills);