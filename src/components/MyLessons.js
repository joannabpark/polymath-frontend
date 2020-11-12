import React from 'react'
import { connect } from 'react-redux'
import Lesson from './Lesson';
// import CompletedLesson from './CompletedLesson';
// import { Grid, Container } from 'semantic-ui-react';

class MyLessons extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('app_token')
    // console.log(token)
    if (!token){
      this.props.history.push('/login')
    } 
  }
    
    renderIncompletedLessons = () => {
      const incompletedLessons = this.props.lessons.filter(lesson => lesson.is_completed === false)
        return incompletedLessons.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} history={this.props.history} />
            ))
          }
    
    // renderCompletedLessons = () => {
    //   const completedLessons = this.props.lessons.filter(lesson => lesson.is_completed === true)
    //   return completedLessons.map((lesson, index) => (
    //     <CompletedLesson key={index} lesson={lesson} history={this.props.history} />
    //       ))
    // }

    render(){
     return ( 
       <div>
         {/* <Grid>
           <Grid.Column width={8} style={{height: 560, marginTop: 20, border: "1px solid pink", overflow: "scroll"}}> */}
           <h2 style={{padding: "20px", textAlign: "center", color: "slategrey", fontFamily: "Trebuchet MS"}}>Incompleted Receiving Lessons:</h2>
             {this.renderIncompletedLessons()}
             {/* </Grid.Column>
             <Grid.Column width={8} style={{height: 560, marginTop: 20, border: "1px solid pink", overflow: "scroll"}}>
             <h2 style={{padding: "20px", color: "slategrey", fontFamily: "Trebuchet MS"}}>Completed Receiving Lessons:</h2>
               {this.renderCompletedLessons()}
             </Grid.Column>
         </Grid> */}
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