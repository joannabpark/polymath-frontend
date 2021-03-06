import React from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Grid, Container } from 'semantic-ui-react';
import { fetchSkillsSuccess } from '../actions/skills';
import { currentUser } from '../actions/user';
import Skill from './Skill';
import RandomSkill from './RandomSkill'
import { searchSkills, resetSkills } from '../actions/search';
import './styling.css'

// import GoogleMapReact from 'google-map-react';
// import Geocode from "react-geocode";
// Geocode.setApiKey("API_KEY")
// Geocode.fromAddress("60642").then(
//   response => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   error => {
//     console.error(error);
//   }
// );

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SkillContainer extends React.Component {

  // static defaultProps = {
  //   center: {
  //     lat: 41.89,
  //     lng: -87.67
  //   },
  //   zoom: 12
  // };

  state = {
    fetched: false,
    ranSkill: null
  }

componentDidMount(){
    const token = localStorage.getItem('app_token')
    console.log(token)
    if (!token){
      this.props.history.push('/login')
    } else {
      const reqObj = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
      fetch('http://localhost:3000/current_session', reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.user) {
          this.props.currentUser(data.user)
          fetch('http://localhost:3000/skills')
          .then(resp => resp.json())
          .then(skills => {
            this.props.resetSkills()
            this.props.fetchSkillsSuccess(skills)
            const ranSkill = skills[Math.round(Math.random()*this.props.skills.length)]
            // let newSkills = skills.filter(skill => skill.user_id === data.user.id)
            this.setState({
              fetched: true,
              ranSkill: ranSkill
          })
          })
        }
      })
    }
  }

  handleClick = () => {
    console.log("hi")
  }

  handleChange = (e) => {
    e.persist()
    this.props.searchSkills(e)
  }

    renderSkills = () => {
      let skillsList = this.props.skills.filter(skills => skills.name.toLowerCase().includes(this.props.search.toLowerCase()) || skills.category.toLowerCase().includes(this.props.search.toLowerCase()) || skills.description.toLowerCase().includes(this.props.search.toLowerCase()))
      let newSkillsList = skillsList.filter(skill => skill.user_id !== this.props.user.id)
      // let newNewSkillsList = newSkillsList.filter(obj => obj.lessons[0] === undefined)
      return newSkillsList.map((skill, index) => (
        <Skill key={index} skill={skill} history={this.props.history} />
          ))
        }

      renderRandomSkill = () => {
        return <RandomSkill ranSkill={this.state.ranSkill} />
      }
        
        render () {

        return (
            <div className='App'>
              <div style={{height: "150px", backgroundColor: 'slategrey'}}>
                  <h1 style={{paddingTop: "50px", fontFamily: "system-ui", color: "white"}}>What skill do you want to learn next?</h1>
              </div>
              <div className="stack-top">
                <div style={{paddingTop: "6px"}}>
                 <Menu.Item><a style={{fontSize: "18px", fontFamily: "system-ui", color: "lightgrey"}}>Enter a skill you wish to learn: </a>
                     <Input onChange={this.handleChange} icon='search' placeholder='Search...' />
                   </Menu.Item>
                  </div>
              </div>
              <Grid divided="vertically">
                <Grid.Row>
                    <Grid.Column width={10}>
                 <br></br>
                  <Container centered 
                  style={{paddingTop: "30px", border: "1px solid pink", height: 450, width: 700, overflow: "scroll"}}>
                   {this.renderSkills()}
                   </Container>
                 <br></br>
                 </Grid.Column>
                 <Grid.Column width={6} style={{paddingTop: "10px"}}>
                 <Container>
                   {this.state.fetched ?
                   this.renderRandomSkill()
                   :
                   null}
                   </Container>
                   </Grid.Column>
             </Grid.Row>
           </Grid>
        </div>            
        )
      }
  }

                   {/* <div style={{ height: '70vh', width: '50%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: 'API_KEY' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                  >
                    <AnyReactComponent
                       onClick={() => {this.handleClick()}}
                      lat={41.8861166}
                      lng={-87.6679668}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div> */}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    skills: state.skills,
    search: state.search,
    ranSkill: state.ranSkill
  }
}

const mapDispatchToProps = {
  fetchSkillsSuccess,
  currentUser,
  searchSkills,
  resetSkills
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer)