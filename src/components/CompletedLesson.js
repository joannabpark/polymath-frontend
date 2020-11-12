import React from 'react'
import { Container, Button, Popup, Card } from 'semantic-ui-react'
import moment from 'moment-timezone';
import {Link} from 'react-router-dom';

class CompletedLesson extends React.Component {

    render() {
        return ( 
          <Popup content="click to view provider profile" trigger={
                <Container style={{paddingBottom: "10px"}}>
                    <Card as={Link} to={`/viewprofile/${this.props.lesson.provider_id}`} style={{border: "1px solid pink", width:"90%"}} fluid centered>
                    {/* <img src={this.props.lesson.video_url} height={300}/> */}
                      <Card.Content>
                        <Card.Header style={{fontSize: "35px", color: "black"}}>{this.props.lesson.skill_name}  </Card.Header>
                        <Card.Meta style={{fontSize: "15px", color: "slategrey"}}>{moment.tz(`${this.props.lesson.date}`, 'Europe/Dublin').format('LLL')}</Card.Meta>
                        <Card.Description style={{fontSize: "18px", color: "slategrey"}}>
                        <h3 style={{fontStyle: "bold", color: "lightgrey", paddingBottom:"10px"}}>Skill description:</h3> {this.props.lesson.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                           {/* <div className="ui two buttons">
                            <Button fluid size='large' animated='fade' onClick={this.handleClick}>
                                <Button.Content visible style={{ color: 'deeppink'}}>add to calendar</Button.Content>
                                  <Button.Content hidden style={{ color: 'deeppink'}}><i className="google icon"></i></Button.Content>
                            </Button>
                            <br></br>
                              <Button color='pink' fluid size='large' animated='fade' onClick={() =>  this.handleUserPoints(this.props.user.id)} >
                                <Button.Content visible style={{ color: 'lightgrey'}}>done?</Button.Content>
                                <Button.Content hidden style={{ color: 'lightgrey'}}><i className="check icon"></i></Button.Content>
                            </Button>
                          </div> */}
                      </Card.Content>
                    </Card>
             </Container>
          }/>
        )
    }
}

export default CompletedLesson