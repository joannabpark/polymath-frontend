import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { Container, Button, Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup';


class Lesson extends React.Component {

//   handleClick = () => {
//     this.props.history.push(`/home/${this.props.note.id}`)
//   }

    render() {
    return ( 
        <Container>
        <br></br>
         <div className="ui centered card"> 
          <div className="content">
           <div className="header">{this.props.lesson.skill_name}    
          </div>
            <div className="meta">{moment(this.props.lesson.date).format('LLL')}</div>
           <div className="description">{this.props.lesson.description}</div>
          </div>
          <div className="ui animated button" >
             <Button animated='fade'>
                <Button.Content visible><i className="check icon"></i></Button.Content>
               <Button.Content hidden style={{ color: 'hotpink'}}>done?</Button.Content>
             </Button>
            <Button animated='fade'>
                <Button.Content visible><i className="cancel icon" ></i></Button.Content>
                <Button.Content hidden style={{ color: 'hotpink'}}>cancel</Button.Content>
           </Button>
         </div>
      </div>
   </Container>
    //   <Popup content='view note' trigger={<Card visible centered
    //     // onClick={this.handleClick}
    //     header={this.props.lesson.date}
    //     meta={moment(this.props.lesson.created_at).fromNow()}
    //     description={this.props.lesson.description.slice(0,25)}
    //     />} />
      )
    }
  }
  
  const mapDispatchToProps = {
    // deleteNote
  }
  
  export default connect(null, mapDispatchToProps)(Lesson)