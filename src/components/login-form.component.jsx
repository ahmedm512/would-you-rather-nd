import React, { Component } from 'react';
import { Form, Grid, Header, Image, Segment} from 'semantic-ui-react';

import { setAuthUser } from '../redux/user/user.actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    users: Object.values(state.user.users),
    authUser: state.user.authUser,
    isPending: state.user.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (id) => dispatch(setAuthUser(id))
  }
}




class Login extends Component {
  constructor() {
    super()
    this.state = {
      optionValue: ''
    }
  }   

  onChange = (event, {value}) => {
    
    this.setState({optionValue: value});

  }

  onSubmit = (event) => {
   
    event.preventDefault();
    const {setAuthUser } = this.props;
    const authUser = this.state.optionValue;

    setAuthUser(authUser);
    
  }


  dropdownData = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };

    render() {
      const {isPending} = this.props;
      const {optionValue} = this.state;
    const disabled = optionValue === '' ? true : false;
        return (
      <Grid textAlign='center' padded style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column width={7}>  
        <Segment.Group>
          <Segment >
          <Header as="h4" block attached="top" textAlign="center">
              <Header.Content>Welcome to the Would You Rather App!</Header.Content>
              <Header.Subheader>Please choose a player to continue</Header.Subheader>
          </Header>
          </Segment>
          <Segment loading={isPending}>
          <Form onSubmit = {this.onSubmit}>
          <Image src="/images/3515103.jpg" size="huge" centered />
           <br/>
              <Form.Dropdown
                placeholder="Select a Friend"
                fluid
                selection
                scrolling
                options={this.dropdownData()}
                value={optionValue}
                onChange={this.onChange}
                required
              />
              <Form.Button content="Login" positive disabled={disabled} fluid />
          </Form>
          </Segment>
        </Segment.Group>
        </Grid.Column>
        </Grid>
        );
    }

    
}



export default connect(mapStateToProps,mapDispatchToProps)(Login);