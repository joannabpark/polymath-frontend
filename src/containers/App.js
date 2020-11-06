import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import SkillContainer from '../components/SkillContainer';
import MyProfile from '../components/MyProfile';
import ViewProfile from '../components/ViewProfile';
import NewSkill from '../components/NewSkill';
import NewUser from '../components/NewUser';
import MyLessons from '../components/MyLessons';
import GiveLessons from '../components/GiveLessons';
import ErrorPage from '../components/ErrorPage';
import Inbox from '../components/Inbox';

class App extends React.Component {

//   componentDidMount() {
//   const token = localStorage.getItem('app_token')
//   // console.log(token)
//   if (!token){
//     this.props.history.push('/login')
//   }
// }

  render() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Switch>
          <Route exact path="/inbox" component={Inbox} />
          <Route exact path="/feed" component={SkillContainer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/myprofile" component={MyProfile} />
          <Route exact path="/viewprofile/:id" component={ViewProfile} />
          <Route exact path="/myprofile/newskill" component={NewSkill} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/myprofile/receivinglessons" component={MyLessons} />
          <Route exact path="/myprofile/providinglessons" component={GiveLessons} />
          {/* <Route exact path="/thankyou" component={ThankYou} /> */}
          <Route exact path="/" component={Login} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>     
      </BrowserRouter>
  )}
}


export default App
