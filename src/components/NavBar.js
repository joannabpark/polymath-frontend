import React from 'react'
import { Image, Menu, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import { logoutSuccess } from '../actions/user'
import {connect} from 'react-redux' 

class NavBar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = () => {
    this.props.logoutSuccess()
    localStorage.removeItem('app_token')
  }


  render() {
    const { activeItem } = this.state
  return (
    <Menu>
       <Menu.Item
                 name='home'
                 onClick={this.handleItemClick}
                 as={Link} 
                 to='/feed'>
          <Image src="/logo.png" style={{width:"90px", height:"30px"}}></Image>
      </Menu.Item>
      {this.props.user.id
      ?
        <Menu.Item
          position="right"
           name='inbox'
           active={activeItem === 'inbox'}
           onClick={this.handleItemClick}
           as={Link}
           to={'/inbox'}
            > <i aria-hidden="true" className="mail icon"></i>messages
        </Menu.Item>
        : null}
        {this.props.user.id
         ?
        <Dropdown item 
         style={{paddingRight:"5%"}}
          text={<Image
          size='mini'
           src={`${this.props.user.image_url}`}
            style={{borderRadius:"50%"}}
         />} >
          <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/myprofile">my profile</Dropdown.Item>
               <Dropdown.Item as={Link} to="/myprofile/providinglessons">providing lessons</Dropdown.Item>
                <Dropdown.Item as={Link} to="/myprofile/receivinglessons">receiving lessons</Dropdown.Item>
               <Dropdown.Item as={Link} to="/login" onClick={this.handleLogout}><i aria-hidden="true" className="sign out icon"></i>logout
             </Dropdown.Item>         
         </Dropdown.Menu>
        </Dropdown>
        : null}
    </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search: state.search
  }
}

const mapDispatchToProps = {
  logoutSuccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)