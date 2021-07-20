import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Image,
  Segment,
  Label,
  Progress,
  Button,
  Form,
  Radio,
  Header,
  Grid,
  Icon,
  Container,
} from "semantic-ui-react";
import { handleAnswerQuestion } from "../redux/user/user.actions";

class QuestionDetails extends Component {
  state = {
    votedForOption: null,
    disabled: true,
  };

  // this functions is used to handle radio entry
  handleChange = (e, data) => {
    this.setState({
      votedForOption: data.value,
      disabled: false,
    });
  };

  // this function is used to handle submit in case question is not answered
  handleSubmit = () => {
    const qid = this.props.match.params.question_id;
    const answer = this.state.votedForOption;
    const { authUser, handleAnswerQuestion } = this.props;
    handleAnswerQuestion(authUser, qid, answer);
  };

  // If answered() is true this function is called to get question in Result preview
  questionResult = () => {
    const qid = this.props.match.params.question_id;
    const {authUser, questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author]; // get Author of question to get data about it in the view

    const option1Count = question.optionOne.votes.length; // represent total votes for option1
    const option2Count = question.optionTwo.votes.length; // represent total votes for option2
    const op1and2 = option1Count + option2Count; // represent total votes
    const userVote = users[authUser].answers[qid]; // get User vote to handel Label
console.log(userVote);
    //Wraping Question in Fragment to handle multiple objects
    // then wrap it in SegmentGroup to make the container and have thw options of coloring ther border
    //Used Grid to handle the layout of the question and divide it
    // Using Form to handle data
    return (
      <Fragment>
        <Grid padded="vertically" columns={1} centered>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 600 }}>
              <Segment.Group style={{ margin: `30px` }}>
                <Header
                  as="h5"
                  textAlign="left"
                  block
                  attached="top"
                  style={{ borderTop: `1px solid hex: '#d4d4d5'` }}
                >
                  {user.name} asks:
                </Header>
                <Grid divided padded>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Image src={user.avatarURL} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Header as="h3">
                        Results:
                        <Header.Subheader style={{ fontWeight: "bold" }}>
                          Would you rather
                        </Header.Subheader>
                      </Header>
                      <Segment
                        color="grey"
                        style={{ backgroundColor: "#f4f4f4" }}
                      >
                        {userVote === "optionOne" && (
                          <Label color="red" ribbon="right" className="vote">
                            <Icon
                              name="check circle outline"
                              size="big"
                              className="compact"
                            />
                            <div style={{ float: "right" }}>Your Vote</div>
                          </Label>
                        )}
                        <p style={{ fontWeight: "bold" }}>
                          {question.optionOne.text}
                        </p>
                        <Progress
                          percent={((option1Count / op1and2) * 100).toFixed(1)}
                          progress
                          color="grey"
                        >
                          {option1Count} out of {op1and2} votes
                        </Progress>
                      </Segment>
                      <Segment
                        color="blue"
                        style={{ backgroundColor: "#f4f4f4" }}
                      >
                        {userVote === "optionTwo" && (
                          <Label color="red" ribbon="right" className="vote">
                            <Icon
                              name="check circle outline"
                              size="big"
                              className="compact"
                            />
                            <div style={{ float: "right" }}>Your Vote</div>
                          </Label>
                        )}

                        <p style={{ fontWeight: "bold" }}>
                          {question.optionTwo.text}
                        </p>
                        <Progress
                          percent={((option2Count / op1and2) * 100).toFixed(1)}
                          progress
                          color="blue"
                        >
                          {option2Count} out of {op1and2} votes
                        </Progress>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  };
  // this function is called if loged user has not answer this question
  //To show question in Poll Preview
  questionAnswer = () => {
    const qid = this.props.match.params.question_id;
    const { questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    //Wraping Question in Fragment to handle multiple objects
    // then wrap it in SegmentGroup to make the container and have thw options of coloring ther border
    //Used Grid to handle the layout of the question and divide it
    // Using Form to handle data
    return (
      <Fragment>
        <Grid padded="vertically" columns={1} centered>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 600 }}>
              <Segment.Group style={{ margin: `30px` }}>
                <Header
                  as="h5"
                  textAlign="left"
                  block
                  attached="top"
                  style={{ borderTop: `1px solid hex: '#d4d4d5'` }}
                >
                  {user.name} asks:
                </Header>
                <Grid divided padded>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Image src={user.avatarURL} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header as="h4">Would you rather</Header>
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                          <Radio
                            label={question.optionOne.text}
                            name="radioGroupVote"
                            value="optionOne"
                            checked={this.state.votedForOption === "optionOne"}
                            onChange={this.handleChange}
                          />
                        </Form.Field>

                        <Form.Field>
                          <Radio
                            label={question.optionTwo.text}
                            name="radioGroupVote"
                            value="optionTwo"
                            checked={this.state.votedForOption === "optionTwo"}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Form>
                      <br />
                      <Button
                        color="green"
                        size="tiny"
                        fluid
                        positive
                        disabled={this.state.disabled}
                        content="Submit"
                        onClick={this.handleSubmit}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  };

  // Function To Check if user has chosen either the two options
  answerd() {
    const { authUser, questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(authUser) ||
      question.optionTwo.votes.includes(authUser)
    );
  }

  // Check if questions is now found show page not found page
  componentDidMount() {
    const { questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      this.props.history.push("/404");
    }
  }

  // Using answred function preiviously mentioned to select wither to render question as Result or as a new Poll
  // Wraping the output in container to handle it in the middle of the screen for a responsive UI
  render() {
    let result;
    if (this.answerd() === true) {
      result = this.questionResult();
    } else {
      result = this.questionAnswer();
    }
    return <Container >{result}</Container>;
  }
}

// Using mapStateToProps we are able to get data from redux store to props of component
const mapStateToProps = (state) => {
  return {
    authUser: state.user.authUser,
    questions: state.question.questions,
    users: state.user.users,
  };
};
// using mapDispatchToProps we are able to get actions as handlers in the component
const mapDispatchToProps = (dispatch) => {
  return {
    handleAnswerQuestion: (authUser, qid, answer) =>
      dispatch(handleAnswerQuestion(authUser, qid, answer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
