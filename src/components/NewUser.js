import React from 'react';
import { Grid, Header, Button, Form, Segment } from "semantic-ui-react";
import { createUserSuccess } from "../actions/user";
import { connect } from "react-redux";
import "./styling.css";


class NewUser extends React.Component {
    state = {
      id: "",
      username: "",
      password: "",
      first_name: "",
      email: "",
      points: 1,
      location: "",
      image_url: "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
      errors: null
    };
  
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }

    fetch('http://localhost:3000/users', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        if (data.error) {
            this.setState({
              error: data.error
            })
          } else {
            // localStorage.setItem('app_token', data.token)
            this.props.createUserSuccess(data)
            // toaster.notify(`hello ${data.user.first_name}!`, {
            //   duration: 2000
            // })
            this.props.history.push(`/myprofile`)
          }
        })
    }

    render() {
        return(
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
             {/* <Image src='/logo.png' />  */}
                Create account
                 </Header>
                 <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>
                  { this.state.error && <h4 style={{ color: 'red'}}>{this.state.error}</h4> }
                     <Form.Input
                        icon='user'
                        iconPosition='left'
                          placeholder="username"
                          name="username"
                           onChange={this.handleChange}
                            value={this.state.username}
                           />
                       <Form.Input
                        icon='lock'
                        iconPosition='left'
                        placeholder="password"
                         name="password"
                         type="password"
                        onChange={this.handleChange}
                         value={this.state.password}
                        />
                           <Form.Input
                        icon='user secret'
                        iconPosition='left'
                        placeholder="your first name"
                         name="first_name"
                         type="first_name"
                        onChange={this.handleChange}
                         value={this.state.first_name}
                        />
                           <Form.Input
                        icon='at'
                        iconPosition='left'
                        placeholder="your email"
                         name="email"
                         type="email"
                        onChange={this.handleChange}
                         value={this.state.email}
                        />
                           <Form.Input
                        icon='crosshairs'
                        iconPosition='left'
                        placeholder="city"
                         name="location"
                         type="location"
                        onChange={this.handleChange}
                         value={this.state.location}
                        />
                          <Form.Input
                        icon='image'
                        iconPosition='left'
                        placeholder="profile pic url"
                         name="image_url"
                         type="image_url"
                        onChange={this.handleChange}
                         value={this.state.image_url}
                        />
                  <div style={{textAlign: "center"}}>
                  {/* <Button animated='fade'>
                         <Button.Content visible type="submit">Create Account</Button.Content>
                         <Button.Content hidden style={{ color: 'hotpink'}}><i aria-hidden="true" className="plus icon"></i></Button.Content>
                     </Button>   */}
                     <Button type="submit" color='pink' fluid size='large' animated='fade'>
                         <Button.Content visible style={{ color: 'lightgrey'}}>Continue</Button.Content>
                         <Button.Content hidden style={{ color: 'lightgrey'}}><i className="long arrow alternate right icon"></i></Button.Content>
                     </Button>   
                  </div>
                  </Segment>
               </Form>
           </Grid.Column>
        </Grid>
        )
    }

 }

 const mapDispatchToProps = {
   createUserSuccess,
  };
  
  export default connect(null, mapDispatchToProps)(NewUser);