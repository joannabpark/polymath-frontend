import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { removeSkill } from '../actions/skills'
import { connect } from 'react-redux'

class MySkills extends React.Component {

  removeSkill = (id) => {
    let deleteId = (this.props.user_skills.filter(arr => arr.skill_id === id))[0].id
    const reqObj = {
        method: 'DELETE', 
      }

    fetch (`http://localhost:3000/user_skills/${deleteId}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
        this.props.removeSkill(deleteId)
        // this.props.history.push('/myprofile')
    })
}

    render() {
        return ( 
            <Card.Group>
            <Card>
              <Card.Content>
                 <Card.Header>{this.props.skill.name}</Card.Header>
                <Card.Meta>{this.props.skill.category}</Card.Meta>
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
            </Card.Group>
              )
         }
  }

  const mapDispatchToProps = {
    removeSkill
  }
  
  export default connect(null, mapDispatchToProps)(MySkills);