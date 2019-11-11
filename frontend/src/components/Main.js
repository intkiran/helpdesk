import React from "react";
import { Jumbotron } from "reactstrap";
import { Container } from "react-bootstrap";

class Main extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Container></Container>
        This is Dashboard Component
      </Jumbotron>
    );
  }
}

export default Main;
