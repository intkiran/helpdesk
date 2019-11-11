import React from "react";
import { Link } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
  Jumbotron,
  Alert
} from "reactstrap";
/**
 *
 *
 * @class HomePage
 * @extends {React.Component}
 */
class Main extends React.Component {
  /**
   *
   *
   * @returns {Object} contains JSX code
   *
   * @memberof HomePage
   */
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
