import React from 'react';
import { connect } from 'react-redux'
// import { Link } from "react-router-dom";
// import { deleteNote } from '../actions/notes'
import moment from 'moment';
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react'
import MySkills from './MySkills'

class MyProfile extends React.Component {

    // handleClick = () => {

    // }


// deleteNote = (id) => {
//     const reqObj = {
//         method: 'DELETE', 
//       }

//     fetch (`http://localhost:3000/notes/${id}`, reqObj)
//     .then(resp => resp.json())
//     .then(data => {
//         this.props.deleteNote(id)
//         this.props.history.push('/home')
//     })
// }

renderMySkills = () => {
    return this.props.user.skills.map(skill => (
      <MySkills skill={skill} />
    ))
 }

  render() { 
    return (
            <Grid divided="vertically">
                <Grid.Row>
                    <Grid.Column width={8}>
                            <Card centered>
                                <Image src={this.props.user.image_url} wrapped ui={false} />
                                <Card.Content>
                                <Card.Header>{this.props.user.full_name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in {moment(this.props.user.created_at).format('YYYY')}</span>
                                </Card.Meta>
                                <Card.Description>
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    22 Friends
                                </a>
                                </Card.Content>
                            </Card>
                            {/* <div className="ui animated button" > */}
                                {/* <Button animated='fade' as={Link} to={`/home/${this.state.note.id}/form`}>
                                    <Button.Content visible><i className="mail icon"></i></Button.Content>
                                <Button.Content hidden style={{ color: 'hotpink'}}>email</Button.Content>
                                </Button>
                                <Button animated='fade' as={Link} to={`/home/edit/${this.state.note.id}`}>
                                    <Button.Content visible><i className="edit icon" ></i></Button.Content>
                                    <Button.Content hidden style={{ color: 'hotpink'}}>edit</Button.Content>
                                </Button>
                                <Button animated='fade' onClick={() => this.deleteNote(this.state.note.id)}>
                                    <Button.Content visible><i className="trash icon" ></i></Button.Content>
                                    <Button.Content hidden style={{ color: 'hotpink'}}>delete</Button.Content>
                            </Button> */}
                            {/* </div>
                        </div> */}
                </Grid.Column>
                <Grid.Column width={8}>
                     {this.renderMySkills()}
                </Grid.Column>
            </Grid.Row>
        </Grid>
     )
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user
    }
}

const mapDispatchToProps = {
    // deleteNote
  }
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);