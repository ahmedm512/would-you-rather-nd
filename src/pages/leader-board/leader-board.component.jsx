import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LeaderCard from '../../components/leader-card.component';

const mapStateToProps = (state) => {
    const users = state.user.users;
    const leaderData = Object.values(users)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3);
    return {
      leaderData
    };
  }
  

class LeaderBoard extends Component {
    render() {
        const {leaderData} = this.props;
        return (
            <Fragment>
            {
                leaderData.map((user, i) => 
                { 
                  return  <LeaderCard key={user.id}  user={user} i={i}/>
                })
            }
            </Fragment>
        );

    }
}

export default connect(mapStateToProps)(LeaderBoard);