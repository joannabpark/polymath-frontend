import React from 'react'
// import { Popup, Button, Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import moment from 'moment';
import GiveLesson from './GiveLesson'

class GiveLessons extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('app_token')
    // console.log(token)
    if (!token){
      this.props.history.push('/login')
    }
  }

    renderProvidingLessons = () => {
        return this.props.givelessons.map((lesson, index) => {
            return <GiveLesson lesson={lesson} key={index} history={this.props.history} />
        })
    }

    render(){
     return ( 
      <div>
      <h2 style={{padding: "20px", textAlign: "center", color: "slategrey", fontFamily: "Trebuchet MS"}}>Incompleted Providing Lessons:</h2>
        {this.renderProvidingLessons()}
     </div>
       )
      }
}

const mapStateToProps = (state) => {
    return {
    user: state.user,
    skills: state.skills,
    givelessons: state.givelessons
    }
  }

export default connect(mapStateToProps, null)(GiveLessons);