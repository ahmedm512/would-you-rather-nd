import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
    Divider,
    Grid,
    Header,
    Form,
    Segment
  } from 'semantic-ui-react'
import { handleSaveQuestion } from '../redux/questions/question.actions';


  const mapStateToProps = state => {
    return {
      isPending: state.question.isPending,
      authUser: state.user.authUser
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSubmit: (option1, option2, authUser) => dispatch(handleSaveQuestion(option1, option2, authUser))
    }
  }

class NewQuestion extends Component {
    state = {
        option1: '',
        option2: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        const { authUser, onSubmit } = this.props;
        const { option1, option2 } = this.state;
        new Promise((res, req) => {
            onSubmit(option1, option2, authUser);
             res('success');
        })
        .then(() => {
          this.setState({ option1: '', option2: '' });
          this.props.history.push('/');

        })
      }

    render() {
       
        const {option1, option2} = this.state;
        const disabled = option1 === '' || option2 === '';
        return (
    <Grid padded centered>
        <Grid.Column width={4}>
            <Segment.Group> 
            <Segment>
                <Header as="h2" textAlign="center">
                Create New Question
                </Header>
            </Segment>
            <Segment loading={this.props.isPending}>
                <Header as="h5" textAlign="left">
                Complete The Question:
                </Header>
                <Header as="h3" textAlign="left">
                Would You Rather ...
                </Header>
                <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id="option1"
                placeholder="Enter option one..."
                value={option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                placeholder="Enter option two..."
                value={option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button positive size="tiny" fluid disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
            </Segment>   
            </Segment.Group>
        </Grid.Column>
    </Grid>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewQuestion));