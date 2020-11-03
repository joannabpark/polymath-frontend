import React from 'react'
import { Popup, Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment';
import GiveLesson from './GiveLesson'

class GiveLessons extends React.Component {

    renderProvidingLessons = () => {
    
        return this.props.givelessons.map((lesson, index) => {
            return <GiveLesson lesson={lesson} key={index} history={this.props.history} />
        })
    }

    render(){
     return ( 
         <div>
           <h4>Incompleted Providing Lessons:</h4>
                {this.renderProvidingLessons()}
         </div>
       )
      }
}

const mapStateToProps = (state) => {
    return {
    user: state.user,
    skills: state.skills,
    givelessons: state.givelessons
    }
  }

export default connect(mapStateToProps, null)(GiveLessons);