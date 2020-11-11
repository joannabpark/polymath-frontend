import React from 'react';
import { Grid, Message } from 'semantic-ui-react'

const ErrorPage = (props) => {

  return (
    <Grid>
    <Grid.Row centered>
      <Grid.Column width={6}>
      <br></br>
       <Message>
        <Message.Header style={{textAlign: "center", color: "hotpink"}}>This page does not exist</Message.Header>
      </Message>
    </Grid.Column>
    </Grid.Row>
  </Grid>
  );
};

export default ErrorPage;
