import React, { Component, Fragment } from "react"; // basic react import for react component
import { connect } from "react-redux"; // used to connect Component to redux store
import { Link } from "react-router-dom"; // used to got to question page
import {
  Button,
  Container,
  Image,
  Label,
  Menu,
  Tab,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";  //importing neccessary Components from semantic ui library

class HomePage extends Component {
  // This function is implemented to build cards out of list of questions 
  //filter logic is used as the filter function to specify eaither the question is answered or not 
  buildQuestionList = (filter) => {
    const { questions, users } = this.props; // first we extract questions and users from props
    const questionCards = Object.keys(questions) // then make a new array called questionCards, transform object to array using object.keys function reference added to Readme
      .filter(filter) //then fillter each item in the array with kogic function will be mentioned at the call function
      .map((qid) => { //after filtering the array we map on every item and create a component For evary question
        const question = questions[qid]; // get question from questions Object refrence it by key 
        const user = users[question.author]; //same for user get author of question by referncing author key in question
        return (
          <Fragment key={qid} >
            <Segment.Group>
              <Header
                as="h5"
                textAlign="left"
                block
                attached="top"
                style={{ borderTop: "blue" }}
              >
                {user.name} asks:
              </Header>
              <Grid divided padded>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Image src={user.avatarURL} />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Fragment>
                      <Header as="h5" textAlign="left">
                        Would you rather
                      </Header>
                      <p style={{ textAlign: "center" }}>
                        {question.optionOne.text}
                        <br />
                        or
                        <br />
                        {question.optionTwo.text}
                      </p>
                      <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                        <Button
                          color={"green"}
                          size="tiny"
                          fluid
                          content="Show Question"
                        />
                      </Link>
                    </Fragment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment.Group>
          </Fragment>
        );
      });
// return an array containg a list of Components and the length of the total questions in the array
    return questionCards.length // if length is greater than zero it will return number and array else it returns 0 to indicate that there is no questions in this catgory
      ? [questionCards.length, <Container>{questionCards}</Container>]
      : [questionCards.length];
  };

  render() {
    const { questions, authUser, activeIndex } = this.props; //extract questions and authUser from props of redux store and activeIndex from Tap Component reference Semantic UI

    // destructure the values of return of function buildQuestionList 
    // the first value is the count of the list produced
    //the second value is the list of components
    const [
      unansweredQuestionsCount,
      unansweredQuestionsContent = "All questions have been answered.", //this a default value if the list doesnot exist reference added in Readme
    ] = this.buildQuestionList(
      (id) =>
        !questions[id].optionOne.votes.includes(authUser) &&  //in This function question is selected and check if the user id is include in eaither one of it's answeres
        !questions[id].optionTwo.votes.includes(authUser)  //if it is included it will return true therefore we get not(value) which is false so the final condition will lead to false so the question is answered
                                                            //in other words if the answer not included in both votes both will be false the the final condition will lead to true this means that this question will be included in the list
                                                            
    );
    //this is afunction that is passed to the filter function to filter questions into answered and Unanswered

    const [
      answeredQuestionsCount,
      answeredQuestionsContent = "There are no answered questions available.", //same as the calling of the function before the content will have a default value of no available questions
    ] = this.buildQuestionList(
      (id) =>
        questions[id].optionOne.votes.includes(authUser) ||  //in this function we check if the user Id is included in either one of the votes if it exist condition yeild to one that means that the question is anwered
        questions[id].optionTwo.votes.includes(authUser)
    );
//Referenc Tap Component in Semantic Ui 
//Tap component accepts an arrayy of panes to render each pan in the active tap
    const panes = [
      {
        menuItem: (
          <Menu.Item key="unanswered-questions">
            Unanswered Questions<Label color='blue' >{unansweredQuestionsCount}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{unansweredQuestionsContent}</Tab.Pane>,
      },
      {
        menuItem: (
          <Menu.Item key="answered-questions">
            Answered Questions<Label color='green'>{answeredQuestionsCount}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{answeredQuestionsContent}</Tab.Pane>,
      },
    ];

    return (
      <Grid padded="vertically" centered>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 550 }}>
            <Tab panes={panes} activeIndex={activeIndex} className="tab" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
// This Function is used to compare between questions and arrange them with the latest timestamp 
// referenc added in the Readme
const sortQuestionsByTimeStamp = (questions) => { //naming convintion so the function is explantory
  const questionsSorted = {};
  Object.keys(questions) //first convert object to array
    .map((key) => questions[key]) //then map on every item in array
    .sort((a, b) => b.timestamp - a.timestamp) // compare two items and return latest arrange array in desincing order
    .forEach((question) => { 
      questionsSorted[question.id] = question; // for each question add it to the object questionSorted
    });
  return questionsSorted;
};

const mapStateToProps = (state) => {
  return {
    questions: sortQuestionsByTimeStamp(state.question.questions), // using the sort questions by time function to return questions sorted by time stamp every time we get questions
    users: state.user.users,
    authUser: state.user.authUser,
  };
};

export default connect(mapStateToProps)(HomePage);
