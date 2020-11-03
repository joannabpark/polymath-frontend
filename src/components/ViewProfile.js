import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import moment from 'moment';
import { fetchUserSuccess } from '../actions/userview';
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react'
import ViewSkills from './ViewSkills'

class ViewProfile extends React.Component {

    state = {
        fetched: false
    }
    
    componentDidMount() {
        // const token = localStorage.getItem('app_token')

        // if (!token){
        // this.props.history.push('/login')
        // } else {
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/users/${userId}`)
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchUserSuccess(data)
            this.setState({
                fetched: true
            })
         })
    }
    
    renderSkills = () => {
        debugger
        return this.props.userview.skills.map((skill, index) => {
          return <ViewSkills skill={skill} key={index} history={this.props.history}/>
        })
     }

  render() { 
    return (
        <Grid divided="vertically">
        <Grid.Row>
            <Grid.Column width={8}>
                    <Card centered>
                        <Image src={this.props.userview.image_url} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{this.props.userview.first_name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in {moment(this.props.userview.created_at).format('YYYY')}</span>
                        </Card.Meta>
                        <Card.Description>
                             <a>{this.props.userview.email}</a>
                            <br></br>
                            <a>location: {this.props.userview.location}</a>
                        </Card.Description>
                        </Card.Content>
                        {/* <Card.Content extra>
                        <a>
                        
                        </a>
                        </Card.Content> */}
                    </Card>
                    {/* <div className="ui animated button" > */}
                        {/* <Button animated='fade' as={Link} to={`/home/${this.state.note.id}/form`}>
                            <Button.Content visible><i className="mail icon"></i></Button.Content>
                        <Button.Content hidden style={{ color: 'hotpink'}}>email</Button.Content>
                        </Button>
                        <Button animated='fade' as={Link} to={`/home/edit/${this.state.note.id}`}>
                            <Button.Content visible><i className="edit icon" ></i></Button.Content>
                            <Button.Content hidden style={{ color: 'hotpink'}}>edit</Button.Content>
                        </Button>
                        <Button animated='fade' onClick={() => this.deleteNote(this.state.note.id)}>
                            <Button.Content visible><i className="trash icon" ></i></Button.Content>
                            <Button.Content hidden style={{ color: 'hotpink'}}>delete</Button.Content>
                    </Button> */}
                    {/* </div>
                </div> */}
        </Grid.Column>
        <Grid.Column width={8}>
             {this.state.fetched ? this.renderSkills() : null}
        </Grid.Column>
    </Grid.Row>
</Grid>
    )
  }
};

const mapStateToProps = (state) => {
    return {
    user: state.user,
    userview: state.userview
    }
}

const mapDispatchToProps = {
    fetchUserSuccess
  }  

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);