import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone';
import { Container, Button, Popup, Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { deleteLessonSuccess } from '../actions/lessons'
import { updateUserPoints } from '../actions/user'
import { updateUserviewPoints } from '../actions/userview'
import toaster from "toasted-notes";
import { confirmAlert } from 'react-confirm-alert'; // Import
import "./styling.css";

const gapi = window.gapi
const CLIENT_ID = "961833843324-gqo5m10obsg5a7kb4klt5nl9pha80nuc.apps.googleusercontent.com"
const API_KEY = "AIzaSyAvvKKY5VGJuoVN7dghxc7WcMzsNzz8k6E"
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar"

class Lesson extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem('app_token')
    console.log(token)
    if (!token){
      this.props.history.push('/login')
    }
  }

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
      // debugger
      // this.props.history.push(`/myprofile/receivinglessons`)
  })
}

// handleLesson = () => {
//   const reqObj = {
//     method: 'PATCH', 
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         is_completed: true
//     }) 
//   }

//   fetch (`http://localhost:3000/lessons/${this.props.lesson.id}`, reqObj)
//   .then(resp => resp.json())
//   .then(data => {
//     console.log(data)
//     this.props.lessonCompleted(data)
//     debugger
//     // this.props.history.push(`/myprofile/receivinglessons`)
// })
// }

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
      // this.props.history.push(`/myprofile/receivinglessons`)
    // debugger
  })
}

handleClick = () => {
  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })

    gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    gapi.auth2.getAuthInstance().signIn()

    .then(() => {
      let event = {
        'summary': `${this.props.lesson.skill_name}`,
        'location': `${this.props.userview.location}`,
        'description': `${this.props.lesson.description}`,
        'start': {
          'dateTime': `${this.props.lesson.date.slice(0, 23)}`,
          'timeZone': 'America/Chicago'
        },
        'end': {
          'dateTime': `${this.props.lesson.date.slice(0, 23)}`,
          'timeZone': 'America/Chicago'
        },
        'attendees': [
          {'email': `${this.props.user.email}`},
          {'email': `${this.props.userview.email}`}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      }

      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
      })

      request.execute(event => {
        console.log(event)
        window.open(event.htmlLink)
      })
      
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(response => {
        const events = response.result.items
        console.log('EVENTS: ', events)
      })
    })
  })
}

submit = () => {
  confirmAlert({
    title: 'Confirm to complete',
    message: 'Are you done with this lesson?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          this.handleUserPoints();
          this.props.history.push('/myprofile/receivinglessons');
        }
      },
      {
        label: 'No',
        onClick: () => {this.props.history.push("/myprofile/receivinglessons")}
      }
    ]
  });
};

    render() {
    return ( 
            <Container style={{paddingBottom: "10px"}}>
                <Card style={{border: "1px solid pink", width:"50%"}} fluid centered>
                {/* <img src={this.props.lesson.video_url} height={300}/> */}
                  <Card.Content>
                  <Popup content="click to view provider profile" trigger={
                    <Card.Header as={Link} to={`/viewprofile/${this.props.lesson.provider_id}`} style={{fontSize: "35px", color: "black"}}>{this.props.lesson.skill_name}  </Card.Header>} position='top center'/>
                    <Card.Meta style={{fontSize: "15px", color: "slategrey"}}>{moment.tz(`${this.props.lesson.date}`, 'Europe/Dublin').format('LLL')}</Card.Meta>
                    <Card.Description style={{fontSize: "18px", color: "slategrey"}}>
                    <h3 style={{fontStyle: "bold", color: "lightgrey", paddingBottom:"10px"}}>Skill description:</h3> {this.props.lesson.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                       <div className="ui two buttons">
                        <Button fluid size='large' animated='fade' onClick={this.handleClick}>
                            <Button.Content visible style={{ color: 'deeppink'}}>add to calendar</Button.Content>
                              <Button.Content hidden style={{ color: 'deeppink'}}><i className="google icon"></i></Button.Content>
                        </Button>
                        <br></br>
                          <Button color='pink' fluid size='large' animated='fade' onClick={this.submit}>
                            <Button.Content visible style={{ color: 'lightgrey'}}>done?</Button.Content>
                            <Button.Content hidden style={{ color: 'lightgrey'}}><i className="check icon"></i></Button.Content>
                        </Button>
                      </div>
                  </Card.Content>
                </Card>
         </Container>
//       <Container as={Link} to={`/viewprofile/${this.props.lesson.provider_id}`}>
//       <br></br>
//        <div className="ui centered card"> 
//         <div className="content">
//          <div className="header">{this.props.lesson.skill_name}    
//         </div>
//           <div className="meta">{moment.tz(`${this.props.lesson.date}`, 'Europe/Dublin').format('LLL')}</div>
//          <div className="description">{this.props.lesson.description}</div>
//         </div>
//         <div className="ui animated button" >
//         {/* onClick={() => this.deleteLesson(this.props.lesson.id)}  */}
//                    <Button animated='fade' onClick={() =>  this.handleUserPoints(this.props.user.id)} >
//               <Button.Content visible><i className="check icon"></i></Button.Content>
//              <Button.Content hidden style={{ color: 'hotpink'}}>done?</Button.Content>
//            </Button>
//        </div>
//     </div>
//  </Container>
        
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      lessons: state.lessons,
      user: state.user,
      userview: state.userview,
    }
  }
  
  const mapDispatchToProps = {
    updateUserPoints,
    updateUserviewPoints,
    deleteLessonSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Lesson)