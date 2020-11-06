import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone';
import { Container, Button, Popup } from 'semantic-ui-react'
// import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';
import { updateUserProviderPoints } from '../actions/user'
import { updateUserviewReceiverPoints } from '../actions/userview'
import { deleteLessonSuccess } from '../actions/givelessons'
import toaster from "toasted-notes";
import "./styling.css";

class GiveLesson extends React.Component {

  handleUserPoints = () => {
    const reqObj = {
        method: 'PATCH', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            points: this.props.user.points + 1,
        }) 
      }

      fetch (`http://localhost:3000/users/${this.props.user.id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.updateUserProviderPoints(data)
        this.handleUserViewPoints(this.props.lesson.receiver_id)
        this.deleteLesson(this.props.lesson.id)
        this.props.history.push(`/myprofile/providinglessons`)
    })
}

handleUserViewPoints = () => {
  const reqObj = {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          points: this.props.userview.points - 1,
      }) 
    }

    fetch (`http://localhost:3000/users/${this.props.userview.id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      this.props.updateUserviewReceiverPoints(data)
      this.props.history.push(`/myprofile/providinglessons`)
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
            toaster.notify("lesson completed! You gained 1 point.", {
              duration: 2000
            })
            this.props.history.push(`/myprofile/providinglessons`)
        })
      }

    render() {
    return ( 
        <Popup content="click to view receiver profile" trigger={<Container as={Link} to={`/viewprofile/${this.props.lesson.receiver_id}`}>
        <br></br>
         <div className="ui centered card"> 
          <div className="content">
           <div className="header">{this.props.lesson.skill_name}    
          </div>
            <div className="meta">{moment.tz(`${this.props.lesson.date}`, 'Europe/Dublin').format('LLL')}</div>
           <div className="description">{this.props.lesson.description}</div>
          </div>
          <div className="ui animated button" >
             <Button animated='fade' onClick={() =>  this.handleUserPoints(this.props.user.id)}>
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
    updateUserProviderPoints,
    updateUserviewReceiverPoints,
    deleteLessonSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiveLesson)