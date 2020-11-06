import React from 'react'
import { connect } from 'react-redux'
// import moment from 'moment';
import moment from 'moment-timezone';
import { Container, Button, Popup } from 'semantic-ui-react'
// import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';
import { deleteLessonSuccess } from '../actions/lessons'
import { updateUserPoints } from '../actions/user'
import { updateUserviewPoints } from '../actions/userview'
import toaster from "toasted-notes";
import "./styling.css";

class Lesson extends React.Component {

  handleUserPoints = () => {
    // debugger
    const reqObj = {
        method: 'PATCH', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            points: this.props.user.points - 1,
        }) 
      }

      fetch (`http://localhost:3000/users/${this.props.user.id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.updateUserPoints(data)
        this.handleUserViewPoints(this.props.lesson.provider_id)
        this.deleteLesson(this.props.lesson.id)
        this.props.history.push(`/myprofile/receivinglessons`)
    })
}

handleUserViewPoints = () => {
  // debugger
  const reqObj = {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          points: this.props.userview.points + 1,
      }) 
    }

    fetch (`http://localhost:3000/users/${this.props.userview.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.props.updateUserviewPoints(data)
      this.props.history.push(`/myprofile/receivinglessons`)
  })
}

deleteLesson = (id) => {
  const reqObj = {
      method: 'DELETE', 
    }
    
    fetch (`http://localhost:3000/lessons/${id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.deleteLessonSuccess(id)
      toaster.notify("lesson completed! 1 point has been deducted.", {
        duration: 2000
      })
      this.props.history.push(`/myprofile/receivinglessons`)
    // debugger
  })
}

    render() {
    return ( 
      <Popup content="click to view provider profile" trigger={<Container as={Link} to={`/viewprofile/${this.props.lesson.provider_id}`}>
      <br></br>
       <div className="ui centered card"> 
        <div className="content">
         <div className="header">{this.props.lesson.skill_name}    
        </div>
          <div className="meta">{moment.tz(`${this.props.lesson.date}`, 'Europe/Dublin').format('LLL')}</div>
         <div className="description">{this.props.lesson.description}</div>
        </div>
        <div className="ui animated button" >
        {/* onClick={() => this.deleteLesson(this.props.lesson.id)}  */}
                   <Button animated='fade' onClick={() =>  this.handleUserPoints(this.props.user.id)} >
              <Button.Content visible><i className="check icon"></i></Button.Content>
             <Button.Content hidden style={{ color: 'hotpink'}}>done?</Button.Content>
           </Button>
          {/* <Button animated='fade'>
              <Button.Content visible><i className="cancel icon" ></i></Button.Content>
              <Button.Content hidden style={{ color: 'hotpink'}}>cancel</Button.Content>
         </Button> */}
       </div>
    </div>
 </Container>} position='top center'/>
        
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      lessons: state.lessons,
      user: state.user,
      userview: state.userview
    }
  }
  
  const mapDispatchToProps = {
    deleteLessonSuccess,
    updateUserPoints,
    updateUserviewPoints
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Lesson)