import React from 'react';
import { connect } from 'react-redux'
import { fetchSkillsSuccess } from '../actions/skills';
import { currentUser } from '../actions/user'
import Skill from './Skill'
// import toaster from "toasted-notes";
// import "./styling.css";

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
               {/* <div>
                 <select >
                    <option value="" disabled selected>Sort by</option>
                     <option >Newest</option>
                     <option >Oldest</option>
                    </select>
                 </div> */}
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
  currentUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillContainer)