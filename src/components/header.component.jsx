import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Menu, Image, Button, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { setAuthUser } from '../redux/user/user.actions';

const mapStateToProps = state => {
  return {
    users: state.user.users,
    authUser: state.user.authUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (id) => dispatch(setAuthUser(id))
  }
}

class Header extends Component {

  logout = (event) => {
    event.preventDefault();
    this.props.setAuthUser('');
  };
    render() {
      const { authUser, users } = this.props;
        return (
        <Container className="header">
            <Menu minwidth={651} pointing secondary>
            <Menu.Item name="home" as={NavLink} to="/" exact />
            <Menu.Item name="new question" as={NavLink} to="/add" />
            <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
            <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                onClick={this.logout}
              />
            </Menu.Item>
          </Menu.Menu>
          </Menu>
    </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);