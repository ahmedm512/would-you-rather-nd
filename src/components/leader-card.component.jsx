import React from 'react';
import {
    Segment,
    Grid,
    Header,
    Image,
    Label,
    Divider
  } from 'semantic-ui-react';

const colors = ['yellow', 'grey', 'orange'];

const LeaderCard = (props) => {
    const {user, i } = props;
    return (
     <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>
      <Segment.Group >
      <Grid divided padded centered>
            <Label corner="left" icon="trophy" color={colors[i]} />
              <Grid.Row >
                <Grid.Column width={3} verticalAlign="middle">
                  <Image src={user.avatarURL} />
                </Grid.Column>
                <Grid.Column padded='true' width={8}>
                  <Header as="h3" textAlign="left">
                    {user.name}
                  </Header>
                  <Grid padded>
                    <Grid.Column width={12}>Answered questions</Grid.Column>
                    <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created questions</Grid.Column>
                    <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  <Segment.Group>
                    <Header as="h5" block attached="top" content="Score" />
                    <Segment>
                      <Label circular color="green" size="big">
                        {user.questionCount + user.answerCount}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
      </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    
         
    );
};

export default LeaderCard;