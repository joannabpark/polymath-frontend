import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone';
import { Container, Button, Popup, Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { updateUserProviderPoints } from '../actions/user'
import { updateUserviewReceiverPoints } from '../actions/userview'
import { deleteLessonSuccess } from '../actions/givelessons'
import toaster from "toasted-notes";
import { confirmAlert } from 'react-confirm-alert'; // Import
import "./styling.css";

const gapi = window.gapi
const CLIENT_ID = "961833843324-gqo5m10obsg5a7kb4klt5nl9pha80nuc.apps.googleusercontent.com"
const API_KEY = "AIzaSyAvvKKY5VGJuoVN7dghxc7WcMzsNzz8k6E"
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar"

class GiveLesson extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem('app_token')
    console.log(token)
    if (!token){
      this.props.history.push('/login')
    }
  }

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
      // this.props.history.push(`/myprofile/providinglessons`)
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
            // this.props.history.push(`/myprofile/providinglessons`)
        })
      }

      handleClick = () => {
        debugger
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
              'location': `${this.props.user.location}`,
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
                this.props.history.push('/myprofile/providinglessons');
              }
            },
            {
              label: 'No',
              onClick: () => {this.props.history.push("/myprofile/providinglessons")}
            }
          ]
        });
      };
      

    render() {
    return ( 
        <Container style={{paddingBottom: "15px"}}>
            <Card style={{border: "1px solid pink", width:"50%"}} fluid centered>
              <Card.Content>
              <Popup content="click to view provider profile" trigger={
                <Card.Header as={Link} to={`/viewprofile/${this.props.lesson.receiver_id}`} style={{fontSize: "35px", color: "black"}}>{this.props.lesson.skill_name}  </Card.Header>}
                position='top center'/>
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
                    <Button color='pink' fluid size='large' animated='fade' onClick={this.submit} >
                      <Button.Content visible style={{ color: 'lightgrey'}}>done?</Button.Content>
                      <Button.Content hidden style={{ color: 'lightgrey'}}><i className="check icon"></i></Button.Content>
                   </Button>
                   </div>
              </Card.Content>
            </Card>
        </Container>
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