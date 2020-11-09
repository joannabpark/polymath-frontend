import React from 'react'
// import { connect } from 'react-redux'
// import moment from 'moment';
import { Popup, Card } from 'semantic-ui-react'

class Skill extends React.Component {

  handleClick = () => {
    this.props.history.push(`/viewprofile/${this.props.skill.user.id}`)
  }

    render() {
        return ( 
                 <Popup content='click to view details or to signup' 
                   trigger={<Card style={{width: "600px", border:"1px groove pink"}} visible centered
                     onClick={this.handleClick}>
                        <Card.Content>
                           <Card.Header style={{fontSize: "20px", color: "black"}}>{this.props.skill.name}</Card.Header>
                           <Card.Meta style={{fontSize: "15px", color: "slategrey"}}>{this.props.skill.category}</Card.Meta>
                        </Card.Content>
                      </Card>
                      } 
                      />
               )
           }
  }
  
  export default Skill