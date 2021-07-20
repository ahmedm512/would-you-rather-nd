import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from "react-redux-loading-bar";
import { requestUsers } from './redux/user/user.actions';
import LoginPage from './pages/login/login.component';
import AddQuestion from './pages/add-question/add-question.component';

import Header from './components/header.component';
import { requestQuestions } from './redux/questions/question.actions';
import LeaderBoard from './pages/leader-board/leader-board.component';
import HomePage from './pages/homepage/homepage.component';
import QuestionDetails from './components/question-details.components';
import PageNotFound from './pages/page-not-found/page-not-found.component';


const mapStateToProps = state => {
  return {
    authUser: state.user.authUser,
    users: state.user.users,
    questions:state.question.questions,
    isPending: state.user.isPending,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestUsers: () => dispatch(requestUsers()),
    onRequestQuestions: () => dispatch(requestQuestions())
  }
}

class App extends Component {

    componentDidMount(){
       this.props.onRequestUsers();
       this.props.onRequestQuestions();
    }
    render() {
        return (    
            <Router>
            {this.props.authUser === '' ? (
                <Route
                  render={() => (
                      <LoginPage />
                  )}
                />
                
              )
               :(
                <Fragment>
                <LoadingBar updateTime={40} maxProgress={100} progressIncrease={5} style={{ zIndex: 1000 }}/>
                  <Header />
                    <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/add" component={AddQuestion} />
                    <Route path="/leaderboard" component={LeaderBoard} />
                    <Route path="/questions/:question_id" component={QuestionDetails} />
                    <Route path="/404" exact component={PageNotFound} />

                    </Switch>
                </Fragment>
              )}
            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);