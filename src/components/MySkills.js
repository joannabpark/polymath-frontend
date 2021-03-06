import React from 'react'
import { Button, Card, Form, Container } from 'semantic-ui-react'
import { deleteSkillSuccess } from '../actions/indSkill'
import { connect } from 'react-redux'
import './styling.css'
import {Link} from 'react-router-dom'
import toaster from "toasted-notes";
import { confirmAlert } from 'react-confirm-alert'; // Import
import "./styling.css";

class MySkills extends React.Component {

  state = {
    id: "",
    name: "",
    category: "",
    description: "",
    video_url: ""
  }

componentDidMount() {
  const token = localStorage.getItem('app_token')
    if (!token){
      this.props.history.push('/login')
    } else {
    fetch(`http://localhost:3000/skills/${this.props.skill.id}`)
    .then(resp => resp.json())
    .then(data => {
        this.setState({ 
          id: data.id, 
          name: data.name, 
          category: data.category, 
          description: data.description,
          video_url: data.video_url
         })
     })
    }
  }

//   handleChange = (e) => {
//     this.setState({
//         [e.target.name]: e.target.value
//     })
// }

// handleSubmit = (e) => {
//     e.preventDefault()
//     const reqObj = {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             id: this.state.id,
//             name: this.state.name,
//             category: this.state.category,
//             description: this.state.description,
//             video_url: this.state.video_url
//         })
//     }
//     fetch(`http://localhost:3000/skills/${this.state.id}`, reqObj)
//     .then(resp => resp.json())
//     .then(data => {
//       console.log(data)
//         this.props.editSkillSuccess(data)
//         this.props.history.push(`/myprofile`)
//     })
// }

  removeSkill = (id) => {
    const reqObj = {
        method: 'DELETE', 
      }
      
      fetch (`http://localhost:3000/skills/${id}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.deleteSkillSuccess(id)
        toaster.notify("skill has been deleted", {
          duration: 2000
        })
        // this.props.history.push(`/myprofile`)
    })
}

submit = () => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you wish to delete this skill?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          this.removeSkill(this.props.skill.id);
          this.props.history.push('/myprofile');
        }
      },
      {
        label: 'No',
        onClick: () => {this.props.history.push("/myprofile")}
      }
    ]
  });
};

    render() {
        return ( 
          <Container style={{paddingBottom: "15px"}}>
            <Card style={{border: "1px solid pink", height: 560}} fluid centered>
             <img src={this.props.skill.video_url} height={300}/>
              <Card.Content>
              <Card.Header style={{fontSize: "35px", color: "black"}}>
              {this.props.skill.name}
                 </Card.Header>
                <Card.Meta style={{fontSize: "15px", color: "slategrey"}}>
                <a ><i aria-hidden="true" class="tag icon"></i>{this.props.skill.category}</a>
                </Card.Meta>
                <Card.Description style={{fontSize: "18px", color: "slategrey"}}>
                 <h3 style={{fontStyle: "bold", color: "lightgrey", paddingBottom:"10px"}}>Skill description:</h3> {this.props.skill.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                <Button as={Link} to={`/myprofile/editskill/${this.props.skill.id}`} style={{ border:"1px solid pink", backgroundColor: 'lightgrey'}} fluid size='large' animated='fade'>
                     <Button.Content visible style={{  color: 'deeppink'}}>edit skill</Button.Content>
                      <Button.Content hidden style={{ color: 'deeppink'}}><i aria-hidden="true" className="edit icon"></i></Button.Content>
                 </Button>  
                 <Button onClick={this.submit} style={{ border:"1px solid pink", backgroundColor: 'lightgrey'}} fluid size='large' animated='fade'>
                     <Button.Content visible style={{ color: 'deeppink'}}>remove skill</Button.Content>
                      <Button.Content hidden style={{ color: 'deeppink'}}><i aria-hidden="true" className="trash icon"></i></Button.Content>
                 </Button> 
                </div>
              </Card.Content>
            </Card>
            </Container>
              )
         }
  }


const mapStateToProps = (state) => {
  return {
  skills: state.skills,
  indSkill: state.indSkill
  }
}

  const mapDispatchToProps = {
    deleteSkillSuccess,
    // editSkillSuccess
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MySkills);