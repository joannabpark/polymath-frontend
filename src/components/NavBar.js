import React from 'react'
import { Button, Input, Menu, Dropdown } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import { logoutSuccess } from '../actions/user'
import {connect} from 'react-redux' 
import { searchSkills } from '../actions/search'

class NavBar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = () => {
    this.props.logoutSuccess()
    localStorage.removeItem('app_token')
  }

  handleChange = (e) => {
    e.persist()
    this.props.searchSkills(e)
  }

  render() {
    const { activeItem } = this.state
  return (
    <Menu>
         {/* <Menu.Item
          name='icon'
          active={activeItem === 'icon'}
          ><i aria-hidden="true" className="clipboard list icon"></i>
        </Menu.Item> */}
       <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={Link} 
          to='/feed'
          ><i aria-hidden="true" className="home icon"></i>home
        </Menu.Item>
        <Menu.Item
           name='my profile'
           active={activeItem === 'my profile'}
           onClick={this.handleItemClick}
           as={Link}
           to={'/myprofile'}
            ><i aria-hidden="true" className="user icon"></i>my profile
        </Menu.Item>
        <Dropdown item text='my lessons'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/myprofile/providinglessons">providing lessons</Dropdown.Item>
            <Dropdown.Item as={Link} to="/myprofile/receivinglessons">receiving lessons</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
           name='inbox'
           active={activeItem === 'inbox'}
           onClick={this.handleItemClick}
           as={Link}
           to={'/inbox'}
            ><i aria-hidden="true" className="mail icon"></i>inbox
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input onChange={this.handleChange} icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item position='right'>
              {
                this.props.user.id
                ?
                <Link to='/login' className="ui button" onClick={this.handleLogout} >
                <i aria-hidden="true" className="sign out icon"></i>Logout
                </Link>
                : 
                <Button as={Link} to='/login'>Login</Button>    
              }
          </Menu.Item>
       </Menu.Menu>
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
  searchSkills
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)