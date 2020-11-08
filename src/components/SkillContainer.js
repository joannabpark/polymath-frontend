import React from 'react';
import { connect } from 'react-redux'
import { Menu, Input } from 'semantic-ui-react';
import { fetchSkillsSuccess } from '../actions/skills';
import { currentUser } from '../actions/user'
import Skill from './Skill'
import { searchSkills } from '../actions/search'

class SkillContainer extends React.Component {

componentDidMount(){
    const token = localStorage.getItem('app_token')
    // console.log(token)
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
            // let newSkills = skills.filter(skill => skill.user_id === data.user.id)
            this.props.fetchSkillsSuccess(skills)
          })
        }
      })
    }
  }

  handleChange = (e) => {
    e.persist()
    this.props.searchSkills(e)
  }

    renderSkills = () => {
      let skillsList = this.props.skills.filter(skills => skills.name.toLowerCase().includes(this.props.search.toLowerCase()) || skills.category.toLowerCase().includes(this.props.search.toLowerCase()) || skills.description.toLowerCase().includes(this.props.search.toLowerCase()))
      let newSkillsList = skillsList.filter(skill => skill.user.id !== this.props.user.id)
      let newNewSkillsList = newSkillsList.filter(obj => obj.lessons[0] === undefined)
      return newNewSkillsList.map((skill, index) => (
        <Skill key={index} skill={skill} history={this.props.history} />
          ))
        }

    render () {
        return (
            <div className='App'>
              <div style={{height: "150px", backgroundColor: 'slategrey'}}>
                  <h1 style={{paddingTop: "50px", fontFamily: "system-ui", color: "white"}}>What skill do you want to learn next?</h1>
              </div>
              <div style={{height: "50px", backgroundColor: 'hotpink'}}>
                <div style={{paddingTop: "6px"}}>
                 <Menu.Item><a style={{fontSize: "18px", fontFamily: "system-ui", color: "white"}}>Enter a skill you want to learn: </a>
                     <Input onChange={this.handleChange} icon='search' placeholder='Search...' />
                   </Menu.Item>
                  </div>
              </div>
                 <br></br>
                   {this.renderSkills()}
                 <br></br>
            </div>
        )
      }
  }



const mapStateToProps = (state) => {
  return {
    user: state.user,
    skills: state.skills,
    search: state.search
  }
}

const mapDispatchToProps = {
  fetchSkillsSuccess,
  currentUser,
  searchSkills
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer)