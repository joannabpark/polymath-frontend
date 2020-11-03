import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import SkillContainer from '../components/SkillContainer';
import MyProfile from '../components/MyProfile';
import ViewProfile from '../components/ViewProfile';
import NewSkill from '../components/NewSkill';
import EditSkill from '../components/EditSkill';
import NewUser from '../components/NewUser';
import MyLessons from '../components/MyLessons';

class App extends React.Component {

  render() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          {/* <Route exact path="/home/:id/form" component={Form} /> */}
          <Route exact path="/feed" component={SkillContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/viewprofile/:id" component={ViewProfile} />
          <Route exact path="/myprofile/newskill" component={NewSkill} />
          <Route exact path="/myprofile/editskill" component={EditSkill} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/myprofile/mylessons" component={MyLessons} />
          {/* <Route exact path="/thankyou" component={ThankYou} /> */}
          <Route exact path="/" component={Login} />
          {/* <Route path="*" component={ErrorPage} /> */}
        </Switch>
      </div>     
      </BrowserRouter>
  )}
}


export default App
