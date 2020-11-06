import React from 'react';
import { Grid, Container, Button, Form } from "semantic-ui-react";
import { createUserSuccess } from "../actions/user";
import { connect } from "react-redux";
// import toaster from "toasted-notes";
// import "./styling.css";


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
      error: null
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
            <Container text>
              <br></br>
            <Grid>
              <Grid.Row centered>
                 <Grid.Column width={8}>
                   <Form onSubmit={this.handleSubmit}>
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
                        placeholder="first name"
                         name="first_name"
                         type="first_name"
                        onChange={this.handleChange}
                         value={this.state.first_name}
                        />
                           <Form.Input
                        icon='at'
                        iconPosition='left'
                        placeholder="email"
                         name="email"
                         type="email"
                        onChange={this.handleChange}
                         value={this.state.email}
                        />
                           <Form.Input
                        icon='crosshairs'
                        iconPosition='left'
                        placeholder="zipcode"
                         name="location"
                         type="location"
                        onChange={this.handleChange}
                         value={this.state.location}
                        />
                          <Form.Input
                        icon='image'
                        iconPosition='left'
                        placeholder="image url"
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
                  <Button type="submit">Create Account</Button>
                  </div>
               </Form>
           </Grid.Column>
      </Grid.Row>
  </Grid>
</Container>
        )
    }

 }

 const mapDispatchToProps = {
   createUserSuccess,
  };
  
  export default connect(null, mapDispatchToProps)(NewUser);