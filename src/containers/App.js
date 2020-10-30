import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import SkillContainer from '../components/SkillContainer';
import MyProfile from '../components/MyProfile';
import ViewProfile from '../components/ViewProfile';

class App extends React.Component {

  render() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          {/* <Route exact path="/home/:id/form" component={Form} /> */}
          <Route exact path="/feed" component={SkillContainer} />
          {/* <Route exact path="/home/edit/:id" component={EditNote} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/viewprofile/:id" component={ViewProfile} />
          {/* <Route exact path="/newuser" component={NewUser} /> */}
          {/* <Route exact path="/thankyou" component={ThankYou} /> */}
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route path="*" component={ErrorPage} /> */}
        </Switch>
      </div>     
      </BrowserRouter>
  )}
}


export default App
