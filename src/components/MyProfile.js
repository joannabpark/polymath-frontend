import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../actions/user'
import moment from 'moment';
import { Grid, Card, Image, Form, Button, Container } from 'semantic-ui-react'
import MySkills from './MySkills'
import { editUserSuccess } from "../actions/user";
import Popup from 'reactjs-popup';
import {Link} from 'react-router-dom'
import toaster from "toasted-notes";
import { confirmAlert } from 'react-confirm-alert'; // Import
import './styling.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class MyProfile extends React.Component {

    state = {
        id: "",
        first_name: "",
        email: "",
        location: "",
        image_url: "",
        autoPlay: true
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
            toaster.notify("your profile has been updated", {
              duration: 2000
            })
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

 submit = () => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you wish to delete your account?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          this.deleteUser(this.props.user.id);
          this.props.history.push('/login');
        }
      },
      {
        label: 'No',
        onClick: () => {this.props.history.push("/myprofile")}
      }
    ]
  });
};

  render() { 
    return (
      <div className='App'>
      <div style={{height: "150px", backgroundColor: 'slategrey'}}>
         <h1 style={{paddingTop: "50px", fontFamily: "system-ui", color: "white"}}>Receive a point when you provide a skill</h1>
        </div>
        <div className="stack-top">
         </div>
      <Container>
            <Grid divided="vertically">
                    <Grid.Column width={5}>
                            <Card fluid style={{height: 580, overflow: "hidden", marginTop:"35px", textAlign: "center", border:"1px solid pink"}}>
                              <img height={270} src={this.props.user.image_url} wrapped ui={false} />
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
                                        <Button color='pink' fluid size='large' animated='fade'>
                                          <Button.Content visible style={{ color: 'lightgrey'}}>save</Button.Content>
                                          <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="save icon"></i></Button.Content>
                                       </Button> 
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
                                        <Button color='pink' fluid size='large' animated='fade'>
                                           <Button.Content visible style={{ color: 'lightgrey'}}>save</Button.Content>
                                          <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="save icon"></i></Button.Content>
                                        </Button> 
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                </Card.Header>
                                <Card.Meta>
                                    <span className='date' style={{fontSize: "15px", color: "slategrey"}}>Member since: {moment(this.props.user.created_at).format('MM/DD/YYYY')}</span>
                                </Card.Meta>
                                <Card.Description>
                                <a style={{fontSize: "15px", color: "slategrey"}}><i aria-hidden="true" class="user icon"></i>username: {this.props.user.username}</a>
                                 <br></br>
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
                                     <Button color='pink' fluid size='large' animated='fade'>
                                         <Button.Content visible style={{ color: 'lightgrey'}}>save</Button.Content>
                                        <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="save icon"></i></Button.Content>
                                      </Button> 
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
                                        <Button color='pink' fluid size='large' animated='fade'>
                                          <Button.Content visible style={{ color: 'lightgrey'}}>save</Button.Content>
                                          <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="save icon"></i></Button.Content>
                                       </Button> 
                                      </div>
                                        </Form.Group>
                                   </Form>
                                     </Popup>
                                     <br></br><br></br>
                                     <a style={{fontSize: "25px", color: "slategrey"}}>points: {this.props.user.points}</a>
                                </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                     <Button style={{marginBottom: "5px"}} color='pink' fluid size='medium' animated='fade' as={Link} to='/myprofile/newskill'>
                                        <Button.Content visible style={{ color: 'lightgrey'}}>add new skill</Button.Content>
                                        <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="plus icon"></i></Button.Content>
                                    </Button>  
                                    <Button style={{marginBottom: 20}} color='pink' fluid size='medium' animated='fade' onClick={this.submit}>
                                        <Button.Content visible style={{ color: 'lightgrey'}}>delete account</Button.Content>
                                        <Button.Content hidden style={{ color: 'lightgrey'}}><i aria-hidden="true" className="delete icon"></i></Button.Content>
                                    </Button>  
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column style={{paddingTop: "35px"}} width={11}>
                         <Carousel>
                          {this.props.user.skills.length > 0 ? this.renderMySkills() : <h2>Add skills to get started!</h2>}
                         </Carousel>
                        </Grid.Column>
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