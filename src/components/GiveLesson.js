import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { Container, Button, Popup } from 'semantic-ui-react'
// import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom';
import { deleteLessonSuccess } from '../actions/givelessons'

class GiveLesson extends React.Component {

    deleteLesson = (id) => {
        const reqObj = {
            method: 'DELETE', 
          }
          
          fetch (`http://localhost:3000/lessons/${id}`, reqObj)
          .then(resp => resp.json())
          .then(data => {
            //   debugger
            this.props.deleteLessonSuccess(id)
            this.props.history.push(`/myprofile/providinglessons`)
          // debugger
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
            <div className="meta">{moment(this.props.lesson.date).format('LLL')}</div>
           <div className="description">{this.props.lesson.description}</div>
          </div>
          <div className="ui animated button" >
             <Button animated='fade' onClick={() => this.deleteLesson(this.props.lesson.id)}>
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

  const mapDispatchToProps = {
    deleteLessonSuccess
  }
  
  export default connect(null, mapDispatchToProps)(GiveLesson)