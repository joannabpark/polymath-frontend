
import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { loginSuccess } from '../actions/user';
import { connect } from 'react-redux';
import toaster from "toasted-notes";
import "./styling.css";
// import { GoogleLogin } from 'react-google-login';

// const clientId = "408666813901-269vm5keg00f78n3gma3iul944lsgm4b.apps.googleusercontent.com"

class Login extends React.Component {

  state={
    username: '',
    password: '',
    error: null
  }

//   onSuccess = (res) => {
//     const reqObj = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(this.state)
//     }
//     fetch('http://localhost:3000/users/login', reqObj)
//     .then(resp => resp.json())
//     .then(data => {
//       //   console.log(data)
//       if (data.error) {
//         this.setState({
//         error: data.error
//       })
//       } else {
//     console.log('[Login Success] currentUser:', res.profileObj)
//     this.setState({
//       first_name: res.profileObj.givenName,
//       image_url: res.profileObj.imageUrl,
//       email: res.profileObj.email
//      })
//      localStorage.setItem('app_token', data.token)
//      this.props.loginSuccess(data.user)
//      toaster.notify(`welcome ${data.user.first_name}!`, {
//        duration: 2000
//      })
//      this.props.history.push('/feed')
//     }
//   })
// }

//   onFailure = (res) => {
//     console.log('[Login failed] res:', res)
//   }

  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }
      
      fetch('http://localhost:3000/users/login', reqObj)
      .then(resp => resp.json())
      .then(data => {
        //   console.log(data)
        if (data.error) {
          this.setState({
          error: data.error
        })
        } else {
          localStorage.setItem('app_token', data.token)
          this.props.loginSuccess(data.user)
          toaster.notify(`welcome ${data.user.first_name}!`, {
            duration: 2000
          })
          this.props.history.push('/feed')
      }
    })
  }

  render() {

  return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
               {/* <Image src='/logo.png' />  */}
               Log-in to your account
             </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
              { this.state.error && <h4 style={{ color: 'red'}}>{this.state.error}</h4> }
                  <Form.Input fluid
                      icon='user'
                      iconPosition='left'
                       type="text" 
                      placeholder="username"
                       name={'username'} onChange={this.handleInputChange} value={this.state.username} 
                  />
                  <Form.Input fluid
                       icon='lock'
                       iconPosition='left'
                      type="password" 
                       name={'password'} onChange={this.handleInputChange} value={this.state.password} 
                       placeholder="password" 
                 />
                      <Button color='pink' fluid size='large' animated='fade'>
                         <Button.Content visible style={{ color: 'lightgrey'}}><i aria-hidden="true" className="sign in icon"></i></Button.Content>
                         <Button.Content hidden style={{ color: 'lightgrey'}}>login</Button.Content>
                     </Button>         
                   </Segment>
                 </Form>
                 {/* <GoogleLogin
                  clientId={clientId}
                  buttonText="Login"
                  onSuccess={this.onSuccess}
                  onFailure={this.onFailure}
                  cookiePolicy={'single_host_origin'}
                  inSignedIn={true}
                  /> */}
                 <Message> New to us? <a href='/newuser'>Sign Up</a>
                     {/* <Button color='pink' fluid size='large' animated='fade'>
                         <Button.Content visible>sign up</Button.Content>
                         <Button.Content hidden as={Link} to={'/newuser'} style={{ color: 'hotpink'}}>sign up</Button.Content>
                     </Button>          */}
                   </Message>
               </Grid.Column>
        </Grid>
   );
  }
}


const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)
