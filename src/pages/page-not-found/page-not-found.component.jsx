import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";

class PageNotFound extends Component {
  render() {
    return (
<Grid padded centered>
    <Grid.Column width={4}>
        <Segment.Group> 
            <Segment>
            <h1>Page Not Found!</h1>
            <p>Sorry the page could not be found.</p>
            </Segment>
        </Segment.Group>
    </Grid.Column>
</Grid>
    );
  }
}

export default PageNotFound;
