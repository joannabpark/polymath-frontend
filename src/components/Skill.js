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
                 <Popup content='click to view provider profile' trigger={<Card visible centered
                     onClick={this.handleClick}
                      header={this.props.skill.name}
                      meta={this.props.skill.category}
                       description={this.props.skill.description}
                  />} />
               )
           }
  }
  
  export default Skill