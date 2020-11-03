import React from 'react'
import { Popup, Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment';
// import Popup from 'reactjs-popup';
// import {Link} from 'react-router-dom';
import Lesson from './Lesson';

class MyLessons extends React.Component {
    
    renderLessons = () => {
        // debugger
        return this.props.lessons.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} history={this.props.history} />
            ))
          }


    render(){
     return ( 
         <div>
           <h4>Incompleted Lessons:</h4>
             {this.renderLessons()}
         </div>
       )
      }
}

const mapStateToProps = (state) => {
    return {
    user: state.user,
    skills: state.skills,
    lessons: state.lessons
    }
  }
  
    // const mapDispatchToProps = {
    // }
    
    export default connect(mapStateToProps, null)(MyLessons);