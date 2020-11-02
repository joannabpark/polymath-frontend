import React from 'react';
import { connect } from 'react-redux'
// import { Link } from "react-router-dom";
import { deleteUser } from '../actions/user'
import moment from 'moment';
import { Grid, Card, Image, Form, Button } from 'semantic-ui-react'
import MySkills from './MySkills'
import { editUserSuccess } from "../actions/user";
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom'
// import 'reactjs-popup/dist/index.css';

class MyProfile extends React.Component {

    state = {
        id: "",
        first_name: "",
        email: "",
        location: "",
        image_url: "",
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.user.id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({ id: data.id, first_name: data.first_name, email: data.email, location: data.location, image_url: data.image_url })
        })
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
        debugger
        this.props.history.push('/login')
    })
}

renderMySkills = () => {
    // debugger
    return this.props.indSkill.map((skill, index) => {
     return <MySkills skill={skill} key={index} user_skills={this.props.user.user_skills} history={this.props.history} />
    })
 }

  render() { 
    const token = localStorage.getItem('app_token')
    if (!token) {
      this.props.history.push('/login')
    } else {
    return (
            <Grid divided="vertically">
                <Grid.Row>
                    <Grid.Column width={8}>
                            <Card centered>
                                <Popup trigger={<Image src={this.props.user.image_url} wrapped ui={false} />} position="bottom right">
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <input
                                        as={<Form.Input />}
                                            type="url" 
                                            name="image_url" 
                                            placeholder="new image url"
                                            value={this.state.image_url}
                                             onChange={this.handleChange}
                                        />
                                        <div style={{textAlign: "center"}}>
                                          <Button>Save</Button>
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                {/* <Image src={this.props.user.image_url} wrapped ui={false} /> */}
                                <Card.Content>
                                <Card.Header>
                                <Popup trigger={<a>{this.props.user.first_name}</a>} position="right center">
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
                                    <span className='date'>Joined in {moment(this.props.user.created_at).format('YYYY')}</span>
                                </Card.Meta>
                                <Card.Description>
                                <Popup trigger={<a>{this.props.user.email}</a>} position="right center">
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
                                <Popup trigger={<a>location: {this.props.user.location}</a>} position="right center">
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
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                     <div style={{textAlign: "center"}}>
                                         <Button>my lessons</Button>
                                     <Button onClick={() => this.deleteUser(this.props.user.id)}>delete account</Button>
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
                <Grid.Column width={8}>
                    <Button as={Link} to='/myprofile/newskill'>new skill</Button>
                {/* <Popup trigger={<a>+ new skill</a>} position="right center">
                         <Form onSubmit={this.handleNewSkillSubmit}>
                                    <Form.Group widths='equal'>
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="name" 
                                            placeholder="name"
                                             onChange={this.handleNewSkillChange}
                                        />
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="category" 
                                            placeholder="category"
                                             onChange={this.handleNewSkillChange}
                                        />
                                        <input
                                        as={<Form.Input />}
                                        type="text" 
                                            name="description" 
                                            placeholder="description"
                                             onChange={this.handleNewSkillChange}
                                        />
                                        <div style={{textAlign: "center"}}>
                                          <Button>add skill</Button>
                                       </div>
                                   </Form.Group>
                              </Form>
                         </Popup> */}
                       {this.renderMySkills()} 
                 </Grid.Column>
            </Grid.Row>
        </Grid>
       )
    }
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user,
    skills: state.skills,
    indSkill: state.indSkill
    }
}

const mapDispatchToProps = {
    deleteUser,
    editUserSuccess
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);