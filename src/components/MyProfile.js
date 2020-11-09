import React from 'react';
import { connect } from 'react-redux'
// import { Link } from "react-router-dom";
import { deleteUser } from '../actions/user'
import moment from 'moment';
import { Grid, Card, Image, Form, Button, Container } from 'semantic-ui-react'
import MySkills from './MySkills'
import { editUserSuccess } from "../actions/user";
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom'

class MyProfile extends React.Component {

    state = {
        id: "",
        first_name: "",
        email: "",
        location: "",
        image_url: "",
    }

    componentDidMount() {
     const token = localStorage.getItem('app_token')
    if (!token){
      this.props.history.push('/login')
    } else {
        fetch(`http://localhost:3000/users/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ id: data.id, first_name: data.first_name, email: data.email, location: data.location, image_url: data.image_url })
        })
      }
    }

      handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.state.id,
                first_name: this.state.first_name,
                email: this.state.email,
                location: this.state.location,
                image_url: this.state.image_url
            })
        }
        fetch(`http://localhost:3000/users/${this.state.id}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.editUserSuccess(data)
            this.props.history.push(`/myprofile`)
        })
    }

deleteUser = (id) => {
    const reqObj = {
        method: 'DELETE', 
      }

    fetch (`http://localhost:3000/users/${id}`, reqObj)
    .then(resp => resp.json())
    .then(data => {
        this.props.deleteUser(id)
        this.props.history.push('/login')
    })
}

renderMySkills = () => {
    return this.props.indSkill.map((skill, index) => {
     return <MySkills skill={skill} key={index} history={this.props.history} />
    })
 }

//  handleClick = () => {
//      this.props.renderMyLessons()
//  }

  render() { 
 
    return (
      <div className='App'>
      <div style={{height: "150px", backgroundColor: 'slategrey'}}>
         <h1 style={{paddingTop: "50px", fontFamily: "system-ui", color: "white"}}>What skill do you want to learn next?</h1>
        </div>
      <div style={{height: "50px", backgroundColor: 'hotpink'}}>  
      </div>
      <Container>
            <Grid divided="vertically">
                <Grid.Row>
                    <Grid.Column width={5}>
                            <Card fluid style={{marginTop:"40px", textAlign: "center", border:"1px solid pink"}}>
                              <Image src={this.props.user.image_url} wrapped ui={false} />
                                <Popup trigger={<button className="button ui" style={{color: "hotpink"}}>upload new profile pic</button>} position="top">
                                <Form success onSubmit={this.handleSubmit} >
                                    <Form.Group>
                                        <input
                                        as={<Form.Input width='equal'/>}
                                            type="url" 
                                            name="image_url" 
                                            placeholder="new image url"
                                            value={this.state.image_url}
                                             onChange={this.handleChange}
                                        />
                                        <br></br>
                                        <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                {/* <Image src={this.props.user.image_url} wrapped ui={false} /> */}
                                <Card.Content>
                                <Card.Header>
                                <Popup trigger={<a style={{fontSize: "35px", color: "black"}}>{this.props.user.first_name}</a>} position="right center">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="first_name" 
                                            placeholder="name"
                                            value={this.state.first_name}
                                             onChange={this.handleChange}
                                        />
                                        <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                </Card.Header>
                                <Card.Meta>
                                    <span className='date' style={{fontSize: "15px", color: "slategrey"}}>Member since: {moment(this.props.user.created_at).format('MM/DD/YYYY')}</span>
                                </Card.Meta>
                                <Card.Description>
                                <Popup trigger={<a style={{fontSize: "15px", color: "slategrey"}}><i aria-hidden="true" class="at icon"></i>{this.props.user.email}</a>} position="right center">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="email" 
                                            placeholder="email"
                                            value={this.state.email}
                                             onChange={this.handleChange}
                                        />
                                        <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                     <br></br>
                                <Popup trigger={<a style={{fontSize: "15px", color: "slategrey"}}><i aria-hidden="true" class="location arrow icon"></i>location: {this.props.user.location}</a>} position="right center">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="location" 
                                            placeholder="location"
                                            value={this.state.location}
                                             onChange={this.handleChange}
                                        />
                                        <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                     <br></br><br></br><br></br>
                                     <a style={{fontSize: "20px", color: "slategrey"}}>points: {this.props.user.points}</a>
                                </Card.Description>
                                
                                </Card.Content>
                                <Card.Content extra>
                                     <div style={{textAlign: "center"}}>
                                     <Button color='pink' fluid size='large' animated='fade' as={Link} to='/myprofile/newskill'>
                                        <Button.Content visible>add new skill</Button.Content>
                                        <Button.Content hidden style={{ color: 'hotpink'}}><i aria-hidden="true" className="plus icon"></i></Button.Content>
                                    </Button>  
                                    <br></br>
                                    <Button color='pink' fluid size='large' animated='fade' onClick={() => this.deleteUser(this.props.user.id)}>
                                        <Button.Content visible>delete account</Button.Content>
                                        <Button.Content hidden style={{ color: 'hotpink'}}><i aria-hidden="true" className="delete icon"></i></Button.Content>
                                    </Button>  
                                      </div>
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
                <Grid.Column style={{paddingTop: "35px"}} width={11}>
                       {this.renderMySkills()} 
                 </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        </div>
       )
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user,
    skills: state.skills,
    indSkill: state.indSkill,
    }
}

const mapDispatchToProps = {
    deleteUser,
    editUserSuccess
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);