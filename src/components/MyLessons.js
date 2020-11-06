import React from 'react'
import { connect } from 'react-redux'
import Lesson from './Lesson';

class MyLessons extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('app_token')
    // console.log(token)
    if (!token){
      this.props.history.push('/login')
    } 
  }
    
    renderLessons = () => {
        return this.props.lessons.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} history={this.props.history} />
            ))
          }

    render(){
     return ( 
         <div>
           <h4>Incompleted Receiving Lessons:</h4>
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