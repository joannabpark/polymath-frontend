import React from 'react'
import { Button, Card } from 'semantic-ui-react'

class MySkills extends React.Component {

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
                    sign up
                  </Button>
                  <Button basic color='purple'>
                    message
                  </Button>
                </div>
              </Card.Content>
            </Card>
            </Card.Group>
              )
         }
  }
  
export default MySkills